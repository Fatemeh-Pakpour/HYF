const typesOfCurrency = { DKK: 1, EURO: 2, USD: 3 };

class Product {
    constructor(name, price, userID) {
        this.name = name;
        this.price = price;
        this.userID = userID;
    }

    getConvertedPrice(currency) {
        switch (currency) {
            case typesOfCurrency.USD:
                return this.price * 0.15;

            case typesOfCurrency.EURO:
                return this.price * 0.13;

            case typesOfCurrency.DKK:
                return this.price;

            default:
                throw new Error('Unsupported currency');
        }
    }
}

class ShoppingCart {
    constructor(products, currency) {
        this.products = products;
        this.currency = currency;
    }

    addProduct(product) {
        this.products.push(product);
    }

    removeProduct(product) {
        this.products = this.products.filter(element => element !== product);
    }

    searchProduct(productName) {
        return this.products.filter(x => x.name === productName);
    }

    getTotal() {
        return this.products.map(x => x.getConvertedPrice(this.currency))
            .reduce((acc, val) => acc + val, 0);
    }

    showTotal() {
        const totalPrice = document.getElementById('total_price');

        for (let key in typesOfCurrency) {
            if (this.currency === typesOfCurrency[key]) {
                totalPrice.innerHTML = `${this.getTotal()}${key}`;
            }
        }
    }

    showLabelLine() {
        const self = this;
        const priceSection = document.getElementById('price_section');
        const chooseCurrency = document.getElementById('choose_currency');
        const currencyList = document.getElementById('currency_list');

        for (let key in typesOfCurrency) {
            const singleCurrency = document.createElement('li');
            singleCurrency.innerHTML = key;
            currencyList.appendChild(singleCurrency);

            if (self.currency === typesOfCurrency[key]) {
                chooseCurrency.innerHTML = `(${key})`;
            }

            singleCurrency.addEventListener('click', (event) => {
                event.stopPropagation();
                currencyList.innerHTML = '';
                currencyList.style.display = 'none';
                self.currency = typesOfCurrency[key];
                self.renderProducts();
            })
        }

        priceSection.addEventListener('click', (event) => {
            currencyList.style.display = 'block';
            event.stopPropagation();
        });

        document.addEventListener('click', () => currencyList.style.display = 'none');
    }

    renderProducts() {
        this.showLabelLine();
        this.showTotal();
        const listOfProducts = document.getElementById('list_of_products');
        const items = listOfProducts.querySelectorAll('ul#list_of_products > li');

        for (let i = 1; i < items.length - 1; i++) {
            listOfProducts.removeChild(items[i]);
        }

        this.products.forEach(element => {
            const itemOfProducts = document.createElement('li');
            const nameOfItem = document.createElement('span');
            const priceOfItem = document.createElement('span');

            nameOfItem.innerHTML = changeFirstLetterToUpperCase(element.name);

            for (let key in typesOfCurrency) {
                if (this.currency === typesOfCurrency[key]) {
                    priceOfItem.innerHTML = `${element.getConvertedPrice(this.currency)}${key}`;
                }
            }

            itemOfProducts.appendChild(nameOfItem);
            itemOfProducts.appendChild(priceOfItem);
            listOfProducts.insertBefore(itemOfProducts, listOfProducts.lastElementChild);
        })
    }

    getDataForUser() {
        return new Promise(resolve => {
            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(result => result.json())
                .then(data => {
                    const userName = document.getElementById('user_name');
                    userName.innerHTML = data.name;
                    this.renderProducts();
                })
        })
    }
}

function changeFirstLetterToUpperCase(string) {
    return string[0].toUpperCase() + string.slice(1);
}

(() => {
    const search = document.getElementById('search');
    const searchLink = document.getElementById('search_link');
    const modalWindow = document.getElementById('modal_window');
    const modalInfo = document.getElementById('modal_info');

    const flatscreen = new Product('flat-screen', 5000);
    const router = new Product('router', 3000);
    const computer = new Product('computer', 8000);
    const memory = new Product('memory', 1000);
    const mouse = new Product('mouse', 500);

    search.addEventListener('keyup', searchItem);
    searchLink.addEventListener('click', showModalInfo);
    //modalInfo.addEventListener('click', (event) => event.stopPropagation()) //another way to dealing with hideModalInfo
    modalWindow.addEventListener('click', (event) => hideModalInfo(event));

    const shoppingCart = new ShoppingCart([flatscreen], typesOfCurrency.DKK);
    shoppingCart.addProduct(router);
    shoppingCart.addProduct(computer);
    shoppingCart.addProduct(memory);
    shoppingCart.addProduct(mouse);

    //shoppingCart.removeProduct(computer);

    shoppingCart.getDataForUser();

    function searchItem() {
        const searchValue = search.value;
        searchLink.innerHTML = '';
        shoppingCart.products.forEach(element => {
            if (searchValue === '') {
                searchLink.style.display = 'none';
            }
            else if (element.name.includes(searchValue)) {
                searchLink.style.display = 'block';
                const item = document.createElement('li');
                item.innerHTML = element.name;
                searchLink.appendChild(item);

                item.addEventListener('click', () => showModalInfo(element.name));
            }
        })
    }

    function showModalInfo(value) {
        searchLink.style.display = 'none';
        modalWindow.style.visibility = 'visible';
        modalInfo.style.display = 'block';
        shoppingCart.products.forEach(element => {
            if (element.name.includes(value)) {
                for (let key in typesOfCurrency) {
                    if (shoppingCart.currency === typesOfCurrency[key]) {
                        modalInfo.innerHTML = `${changeFirstLetterToUpperCase(element.name)}: 
                                ${element.getConvertedPrice(shoppingCart.currency)}${key}`;
                    }
                }
            }
        })
    }

    function hideModalInfo(event) {
        if (event.target === modalWindow) {
            modalWindow.style.visibility = 'hidden';
            modalInfo.style.display = 'none';
        }
    }
})();