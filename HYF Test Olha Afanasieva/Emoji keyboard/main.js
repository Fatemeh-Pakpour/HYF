const emojiiApi = 'https://raw.githubusercontent.com/amio/emoji.json/master/emoji.json';
let listOfEmojiis;
const renderEmojiis = document.getElementById('renderEmojiis');
const searchString = document.getElementById('searchString');

function fetchEmojiiList(api) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            listOfEmojiis = data;
            console.log(listOfEmojiis);
            renderListOfEmojiis(data);
        })
}

fetchEmojiiList(emojiiApi);

searchString.addEventListener('keyup', () => {
    const valueForSearch = searchString.value;
    console.log(valueForSearch, listOfEmojiis);
    let searchList = listOfEmojiis.filter(element => {
        return element.name.toLowerCase().includes(valueForSearch.toLowerCase());
    })
    renderListOfEmojiis(searchList);
});


function renderListOfEmojiis(arr) {
    renderEmojiis.innerHTML = '';

    arr.forEach(emoji => {
        const li = document.createElement('li');
        li.innerHTML = emoji.char;
        
        li.addEventListener('click', () => {writeToClipboardOnPermission(emoji.char)});
        renderEmojiis.appendChild(li);
    });
}