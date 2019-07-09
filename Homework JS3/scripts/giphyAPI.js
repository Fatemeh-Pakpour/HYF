// Create a site where a user can search for any word. When searching a word the application will 
// find a gif using the searched word using the giphy api: https://developers.giphy.com/docs/ Here 
// is how it is going to work: The user can write some text indicating the gif he is looking for, 
// click a button and then a gif will be found (using the searched word) and the gif will be d
// isplayed to the user.
// Add an input element, where the user can specify how many gif results the user wants.
// 1. create HTML title, input('searched-word'), (input('number-og-images')), button
// 2. find elements in js from HTML
// 3. add addEventListener
// 4. fetch data from API
// 5. create list with data from API


//API key EEebOweHLlUU4AxbA0R74cWTL1TeelCx
const APIKEY = 'EEebOweHLlUU4AxbA0R74cWTL1TeelCx';

let giphy = document.getElementById('giphy');
let searchWord = document.getElementById('search-word');
let numberOfImages = document.getElementById('number-of-images');
let searchForGif = document.getElementById('search-for-gif');
let giphyUl = document.createElement('ul');
giphy.appendChild(giphyUl);

searchForGif.addEventListener('click', getImages);
searchWord.addEventListener('click', () => searchWord.value = '');
numberOfImages.addEventListener('click', () => numberOfImages.value = '');

function getImages(){

    giphyUl.innerHTML = '';

    let wordValue = searchWord.value || 'smile';
    let numberValue = numberOfImages.value || 10;

    let api = `http://api.giphy.com/v1/gifs/search?q=${wordValue}&api_key=${APIKEY}&limit=${numberValue}`

    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {

        let array = data.data;

        array.forEach(function(x){
            let li = document.createElement('li');
            let img = document.createElement('img');


            let obj1 = x.images;

            for(let key1 in obj1){
                if(key1 === 'original'){
                    img.setAttribute('src', obj1[key1].url);
                }
            }
            
            img.setAttribute('alt', x.title);

            li.appendChild(img);
            giphyUl.appendChild(li);
        })
    })
}