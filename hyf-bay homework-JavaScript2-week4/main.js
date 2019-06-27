let products = getAvailableProducts();
renderProducts(products);
console.log(products);

let searchByName = document.getElementById('search');
searchByName.addEventListener("keyup", () => renderProducts(searchForProductByName()));

let searchByCountry = document.getElementById("country");
searchByCountry.addEventListener('change', () => renderProducts(searchForProductByCountry()));

let sortBy = document.getElementById("sort");
sortBy.addEventListener('change', () => renderProducts(sortByPriceOrName()));

//Render test product names
function renderProducts(arr){

    let productsList = document.querySelector('section.products ul');
    //productsList.innerHTML = '';

    let child = productsList.lastElementChild;
    while(child){
        productsList.removeChild(child);
        child = productsList.lastElementChild;
    }

    arr.forEach(x => {
        let productsListli = document.createElement('li');
        let productsElement = document.createElement('ul');

        let button = document.createElement('button');
        button.innerHTML = 'Add';
        button.className = 'add-button';
        button.addEventListener('click', () => addToBasket(x));
        
        for(let key in x){

            let existArray = x[key];
            let productsElementli = document.createElement('li');

            if(key === 'id'){
                productsElementli.innerHTML = `${x[key]}`;
            }
            else if(Array.isArray(existArray)){
                let arrayList = document.createElement('ul');

                let arrayListFirstLi = document.createElement('li');

                arrayListFirstLi.innerHTML = `${key}: `;
                arrayList.appendChild(arrayListFirstLi);

                existArray.forEach(y => {

                    let arrayListLi = document.createElement('li');
                    
                    arrayListLi.innerHTML = y;
                    arrayList.appendChild(arrayListLi);
                })
                
                
                productsElementli.appendChild(arrayList);
            }
            else{
                productsElementli.innerHTML = `${key} : ${x[key]}`;  
            }
            
            productsElement.appendChild(productsElementli);
            
        }

        productsListli.appendChild(button);
        productsListli.appendChild(productsElement);
        productsList.appendChild(productsListli);
    })

    
}

//Searching for products
function searchForProductByName(){
    
    let product = products.filter(function(x){
        return x.name.toLowerCase().includes(search.value.toLowerCase());
    })

    return product;
}

//Showing products that ships to country
function searchForProductByCountry(){

    let countryWithBigFirstLetter = searchByCountry.value[0].toUpperCase() + searchByCountry.value.slice(1)
    console.log(countryWithBigFirstLetter);

    let product = products.filter(function(x){
        return x.shipsTo.includes(countryWithBigFirstLetter);
    })

    console.log(product);
    return product;

}

//Sort by price or name
function sortByPriceOrName(){
    // console.log(sortBy.value);  
    if(sortBy.value === 'cheap'){
        products.sort((a, b) => a.price - b.price);
    }
    else if(sortBy.value === 'expensive'){
        products.sort((a, b) => b.price - a.price);
    }
    else{
        products.sort(function(a, b) 
        {
            if(a.name < b.name){
                return -1;
            }
            else if(a.name > b.name){
                return 1;
            }
            return 0;
        });
    } 

    return products;
}

let pricesArray = [];

//Shopping cart - optional
function addToBasket(passedObj){

    let totalPrice = document.getElementById('totalPrice');
    
    pricesArray.push(passedObj.price);
    let totalNumber = pricesArray.reduce((acc,val) => acc + val, 0);

    totalPrice.innerHTML = totalNumber;

    let obj = {name: passedObj.name, price: passedObj.price};
    let basketsList = document.querySelector('section.cart ul');
    let basketUlLi = document.createElement('li');

    for(let key in obj){
        
        let basketUlLiDiv = document.createElement('div');
        
        basketUlLiDiv.innerHTML = obj[key];
        basketUlLiDiv.classList.add(key)

        basketUlLi.append(basketUlLiDiv);
    }
    
    basketsList.append(basketUlLi);
}



//Price analytics
function callbackExample(text){
    console.log(text);
}

sendPricesToServer(pricesArray, () => callbackExample('Data sent'));