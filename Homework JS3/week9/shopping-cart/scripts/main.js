class Product {
    constructor(name, price, userID) {
        this.name = name;
        this.price = price;
        this.userID = userID;
    }

    //TODO: I would call the method getPriceByCurrency or getConvertedPrice
    convertCurrency(currency) {
        switch (currency) {
            case typesOfCurrency.USD:
                return this.price * 0.15;

            case typesOfCurrency.EURO:
                return this.price * 0.13;

            //TODO: default should throw an error when unsupported currency is used
            default:
                return this.price;
        }
    }
}

class ShoppingCart {
    constructor(products, currency) {
        this.products = products;
        this.curency = currency;
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
        return this.products.map(x => x.convertCurrency(this.curency))
            .reduce((acc, val) => acc + val, 0);
    }

    showTotal() {
        const totalPrice = document.createElement('li');
        const totalLabel = document.createElement('span');
        const totalAmount = document.createElement('span');

        totalLabel.innerHTML = `Total: `;

        for (let key in typesOfCurrency) {
            if (this.curency === typesOfCurrency[key]) {
                totalAmount.innerHTML = `${this.getTotal()}${key}`;
            }
        }

        totalPrice.appendChild(totalLabel);
        totalPrice.appendChild(totalAmount);
        listOfProducts.appendChild(totalPrice);
    }

    showLabelLine() {
        const self = this;

        const namesLine = document.createElement('li');
        const nameSection = document.createElement('span');

        //TODO: hardcoded text
        nameSection.innerHTML = `Name of product`;
        namesLine.appendChild(nameSection);

        for (let key in typesOfCurrency) {
            const singleCurrency = document.createElement('li');
            singleCurrency.innerHTML = key;
            currencyList.appendChild(singleCurrency);

            if (self.curency === typesOfCurrency[key]) {
                //TODO: hardcoded text
                priceLabel.innerHTML = `Price(${key})`;
            }

            singleCurrency.addEventListener('click', () => {
                priceSection.innerHTML = '';
                currencyList.innerHTML = '';
                currencyList.style.display = 'none';
                self.curency = typesOfCurrency[key];
                self.renderProducts();
            })
        }

        priceSection.appendChild(priceLabel);
        priceSection.appendChild(currencyList);
        namesLine.appendChild(priceSection);
        listOfProducts.appendChild(namesLine);
    }

    renderProducts() {
        listOfProducts.innerHTML = '';            
        this.showLabelLine();

        this.products.forEach(element => {
            const itemOfProducts = document.createElement('li');
            const nameOfItem = document.createElement('span');
            const priceOfItem = document.createElement('span');

            nameOfItem.innerHTML = changeFirstLetterToUpperCase(element.name);

            for (let key in typesOfCurrency) {
                if (this.curency === typesOfCurrency[key]) {
                    priceOfItem.innerHTML = `${element.convertCurrency(this.curency)}${key}`;
                }
            }

            itemOfProducts.appendChild(nameOfItem);
            itemOfProducts.appendChild(priceOfItem);
            listOfProducts.appendChild(itemOfProducts);
        })
        this.showTotal();
    }

    //TODO: the method name does not realy reflect what it does, should be smth like getDataForUser
    getUser() {
        return new Promise(resolve => {
            //TODO: user ID is hardcoded
            fetch('https://jsonplaceholder.typicode.com/users/1')
                .then(result => result.json())
                .then(data => {
                    const userName = document.createElement('h4');
                    userName.innerHTML = data.name;
                    listOfProducts.parentNode.insertBefore(userName, listOfProducts);
        
                    this.renderProducts();         
                })
        })
    }
}

(() => {
    const typesOfCurrency = { DKK: 1, EURO: 2, USD: 3 };

    const priceSection = document.createElement('div');
    const currencyList = document.createElement('ul');
    const priceLabel = document.createElement('span');

    currencyList.setAttribute('class', 'currency');

    const listOfProducts = document.getElementById('list_of_products');
    const search = document.getElementById('search');
    const searchLink = document.getElementById('search_link');
    const modalWindow = document.getElementById('modal_window');
    const modalInfo = document.getElementById('modal_info');

    priceLabel.addEventListener('click', () => currencyList.style.display = 'block');
    search.addEventListener('keyup', searchItem);
    searchLink.addEventListener('click', showModalInfo);
    //modalInfo.addEventListener('click', (event) => event.stopPropagation())
    modalWindow.addEventListener('click', (event) => hideModalInfo(event));


    

    function changeFirstLetterToUpperCase(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    const flatscreen = new Product('flat-screen', 5000);
    const router = new Product('router', 3000);
    const computer = new Product('computer', 8000);
    const memory = new Product('memory', 1000);
    const mouse = new Product('mouse', 500);

    const shoppingCart = new ShoppingCart([flatscreen], typesOfCurrency.DKK);
    shoppingCart.addProduct(router);
    shoppingCart.addProduct(computer);
    shoppingCart.addProduct(memory);
    shoppingCart.addProduct(mouse);

    //shoppingCart.removeProduct(computer);

    shoppingCart.getUser();        

    function searchItem() {
        const searchValue = search.value;

        //TODO: let's discuss this code
        for (let key in shoppingCart) {
            if (key === 'products') {
                shoppingCart[key].forEach(element => {
                    if (searchValue === '') {
                        searchLink.style.display = 'none';
                    }
                    else if (element.name.includes(searchValue)) {
                        searchLink.style.display = 'block';
                        searchLink.innerHTML = element.name;
                    }
                })
            }
        }
    }

    function showModalInfo() {
        searchLink.style.display = 'none';
        modalWindow.style.visibility = 'visible';
        modalInfo.style.display = 'block';
        for (let key in shoppingCart) {
            if (key === 'products') {
                shoppingCart[key].forEach(element => {
                    //TODO: never use innerHTML for working with data
                    if (element.name.includes(searchLink.innerHTML)) {
                        for (let key in typesOfCurrency) {
                            if (shoppingCart.curency === typesOfCurrency[key]) {
                                modalInfo.innerHTML = `${changeFirstLetterToUpperCase(element.name)}: 
                                ${element.convertCurrency(shoppingCart.curency)}${key}`;
                            }
                        }                        
                    }
                })
            }
        }
    }

    function hideModalInfo(event) {
        //TODO: it only works because modalInfo does not contain any child elements
        if (event.target !== modalInfo) {
            modalWindow.style.visibility = 'hidden';
            modalInfo.style.display = 'none';
        }
    }
})();