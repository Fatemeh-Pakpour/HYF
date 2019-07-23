(() => {
    const listOfProducts = document.getElementById('list_of_products');

    const price = document.createElement('div');
    const price1 = document.createElement('div');
    const price2 = document.createElement('div');
    const price3 = document.createElement('div');

    const search = document.getElementById('search');
    const searchLink = document.getElementById('search_link');
    const modalWindow = document.getElementById('modal_window');
    const modalInfo = document.getElementById('modal_info');

    class Product {
        constructor(name, price) {
            this.name = name;
            this.price = price;
        }

        convertCurrency(currency) {
            if (currency === 'euro') {
                this.price = this.price * 0.15;
            }
            else if (currency === 'usd') {
                this.price = this.price * 0.13;
            }
            else {
                this.price = this.price;
            }
        }
    }

    class ShoppingCart {
        constructor(products) {
            this.products = products;
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
            return this.products.map(x => x.price)
                .reduce((acc, val) => acc + val, 0);
        }

        renderProducts() {
            listOfProducts.innerHTML = '';

            const productsArray = this.products; //????????????????????            
            const namesLine = document.createElement('li');
            const name = document.createElement('span');
            const priceRender = document.createElement('div');

            showNamesLine();
            showProducts();

            function showNamesLine() {
                price1.setAttribute('class', 'currency-1');
                price2.setAttribute('class', 'currency-2');
                price3.setAttribute('class', 'currency-3');

                name.innerHTML = `Name of product`;
                price1.innerHTML = `DKK`;
                price2.innerHTML = `EURO`;
                price3.innerHTML = `USD`;
                priceRender.innerHTML = `Price(${price1.innerHTML})`;

                price.appendChild(price1);
                price.appendChild(price2);
                price.appendChild(price3);
                price.appendChild(priceRender);

                namesLine.appendChild(name);
                namesLine.appendChild(price);
                listOfProducts.appendChild(namesLine);
            }

            function showProducts() {
                productsArray.forEach(element => {
                    const itemOfProducts = document.createElement('li');
                    const nameOfItem = document.createElement('span');
                    const priceOfItem = document.createElement('span');

                    nameOfItem.innerHTML = changeFirstLetterToUpperCase(element.name);
                    priceOfItem.innerHTML = `${element.price}dkk`;

                    itemOfProducts.appendChild(nameOfItem);
                    itemOfProducts.appendChild(priceOfItem);
                    listOfProducts.appendChild(itemOfProducts);

                    price.addEventListener('click', () => {
                        price1.style.display = 'block';
                        price2.style.display = 'block';
                        price3.style.display = 'block';

                        price.addEventListener('click', (event) => {
                            if (event.target === price1) {
                                priceRender.innerHTML = `Price(${price1.innerHTML})`;
                                priceOfItem.innerHTML = `${element.price}dkk`;
                                hideCurrency();
                            }
                            else if (event.target === price2) {
                                priceRender.innerHTML = `Price(${price2.innerHTML})`;
                                priceOfItem.innerHTML = `${element.price * 0.13}eur`;
                                hideCurrency();
                            }
                            else if (event.target === price3) {
                                priceRender.innerHTML = `Price(${price3.innerHTML})`;
                                priceOfItem.innerHTML = `${element.price * 0.15}usd`;
                                hideCurrency();
                            }
                        })

                        function hideCurrency() {
                            price1.style.display = 'none';
                            price2.style.display = 'none';
                            price3.style.display = 'none';
                        }
                    });
                });
            }
        }

        getUser() {
            return new Promise(resolve => {
                fetch('https://jsonplaceholder.typicode.com/users/1')
                    .then(result => result.json())
                    .then(data => resolve(data));
            })
        }
    }

    function changeFirstLetterToUpperCase(string) {
        return string[0].toUpperCase() + string.slice(1);
    }

    const flatscreen = new Product('flat-screen', 5000);
    const router = new Product('router', 3000);
    const computer = new Product('computer', 8000);
    const memory = new Product('memory', 1000);
    const mouse = new Product('mouse', 500);

    const shoppingCart = new ShoppingCart([flatscreen]);
    shoppingCart.addProduct(router);
    shoppingCart.addProduct(computer);
    shoppingCart.addProduct(memory);
    shoppingCart.addProduct(mouse);

    //shoppingCart.removeProduct(computer);

    shoppingCart.getUser()
        .then(data => {
            const userName = document.createElement('li');
            const totalPrice = document.createElement('li');
            const totalName = document.createElement('span');
            const totalAmount = document.createElement('span');

            userName.innerHTML = data.name;
            totalName.innerHTML = `Total: `;
            totalAmount.innerHTML = `${shoppingCart.getTotal()}dkk`;

            price.addEventListener('click', (event) => {
                if (event.target === price1) {
                    totalAmount.innerHTML = `${shoppingCart.getTotal()}dkk`;
                }
                else if (event.target === price2) {
                    totalAmount.innerHTML = `${shoppingCart.getTotal() * 0.13}eur`;
                }
                else if (event.target === price3) {
                    totalAmount.innerHTML = `${shoppingCart.getTotal() * 0.15}usd`;
                }
            })

            totalPrice.appendChild(totalName);
            totalPrice.appendChild(totalAmount);

            shoppingCart.renderProducts();

            listOfProducts.insertBefore(userName, listOfProducts.firstChild);
            listOfProducts.appendChild(totalPrice);
        })

    search.addEventListener('keyup', searchItem);
    searchLink.addEventListener('click', showModalInfo);
    //modalInfo.addEventListener('click', (event) => event.stopPropagation())
    modalWindow.addEventListener('click', (event) => hideModalInfo(event));

    function searchItem() {
        const searchValue = search.value;

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
                    if (element.name.includes(searchLink.innerHTML)) {
                        modalInfo.innerHTML = `${changeFirstLetterToUpperCase(element.name)}: ${element.price}$`;
                    }
                })
            }
        }
    }

    function hideModalInfo(event) {
        if (event.target !== modalInfo) {
            modalWindow.style.visibility = 'hidden';
            modalInfo.style.display = 'none';
        }
    }
})();