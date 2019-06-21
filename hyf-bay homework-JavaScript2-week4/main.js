console.log('Script loaded');

//Render test product names
function renderProducts(arr){
    let productsList = document.querySelector('section.products ul');

    arr.forEach(x => {
        let productsListli = document.createElement('li');
        let productsElement = document.createElement('ul');

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

        productsListli.appendChild(productsElement);
        productsList.appendChild(productsListli);
    })
}

const products = getAvailableProducts();

renderProducts(products);