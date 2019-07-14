//Classwork
//Give an example of an api (preferably one with an accesstoken, showing that part aswell)

//Meal ordering website
const mealJSON = { "orders" : [
                    {
                    "name": "potato free",
                    "id": 1,
                    "price": "3$",
                    "listOfDrinks": ["red wine", "beer", "water"],
                    "extras" : ["cheese", "green plant", "chili peber"]
                    },
                    {
                    "name": "smashed potato",
                    "id": 2,
                    "price": "5$",
                    "listOfDrinks": ["white wine", "lager beer", "tea"],
                    "extras" : ["cheese", "green plant", "chili peber"]
                    }
                    ]
                }

//Astronauts in space

fetch('http://api.open-notify.org/astros.json')
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        displayAstronauts(data.people);
    });

    // function fetchJson(url){ //method
    //     return new Promise(function(resolve){
    //         fetch(url)
    //             .then(response => {
    //                 return response.json();
    //             })
    //             .then(yesOrNoData => {
    //                 resolve(yesOrNoData);
    //             });
    //     });
    // }

    //fetchJson('http://api.open-notify.org/astros.json').then(r => console.log(r));

function displayAstronauts(arr){
    let arrayOfAstronauts = arr;

    let astronauts = document.getElementById('astronauts');
    
    let ul = document.createElement('ul');
    let firstLi = document.createElement('li');

    firstLi.innerHTML = `There are ${arrayOfAstronauts.length} astronauts in space, they are:`
    ul.appendChild(firstLi);

    arrayOfAstronauts.forEach(function(x){
        let li = document.createElement('li');
        li.innerHTML = x.name;
        ul.appendChild(li);
    });
    
    astronauts.appendChild(ul);
}

//Dog fan website
let randomImg;
let showedBreedName;
let dogs = document.getElementById('dogs');

function showDogs(){
    //function showDogs(count){
    //if(count > 0){
    //     setTimeout(() => showDogs(count - 1), 2000);
    //}
    //showDogs(10);

    getRandomBreeds().then(function(breedName){
        console.log(breedName);
        let api = `https://dog.ceo/api/breed/${breedName}/images/random`;
        console.log(api);
    
        fetch(api)
            .then(response => {
                return response.json();
            })
            .then(data => {                
        
                if(!randomImg){
                    randomImg = document.createElement('img');            
                    dogs.appendChild(randomImg);
                } 
                if(!showedBreedName){
                    showedBreedName = document.createElement('h3');
                    dogs.appendChild(showedBreedName);
                }

                randomImg.setAttribute('src', data.message);
                randomImg.setAttribute('alt', 'dog');                
                showedBreedName.innerHTML = breedName.slice(0,1).toUpperCase() + breedName.slice(1);
            });
    
            setTimeout(() => showDogs(), 2000);
    });
}


function getRandomBreeds(){  

    let y = new Promise(function(resolve, reject){

        let x;
        
        fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => {
            return response.json();
        })
        .then(data => {
            let breeds = data.message;
            
            let keys = Object.keys(breeds);
            x = keys[ keys.length * Math.random() << 0];
    
            // if(breeds[x].length !== 0){
            //     let arr = breeds[x];
            //     x += '-' + arr[Math.floor(Math.random()*arr.length)];
            // }
    
            resolve(x);    
        });
    });

    return y;
}

showDogs();