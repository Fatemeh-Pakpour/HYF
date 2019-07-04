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

searchForGif.addEventListener('click', getImages);

function getImages(){
    giphyUl.innerHTML = '';

    let wordValue = searchWord.value;
    let numberValue = numberOfImages.value;
    let api = `http://api.giphy.com/v1/gifs/search?q=${wordValue}&api_key=${APIKEY}&limit=${numberValue}`

    fetch(api)
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data.data);

        let array = data.data;

        array.forEach(function(x){
            let li = document.createElement('li');
            let img = document.createElement('img');

            img.setAttribute('src', x.bitly_url);
            img.setAttribute('alt', x.title);

            li.appendChild(img);
            giphyUl.appendChild(li);
        })
    })
}