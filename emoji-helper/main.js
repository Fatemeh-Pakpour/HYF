const emojiiApi = 'https://raw.githubusercontent.com/amio/emoji.json/master/emoji.json';
let listOfEmoji;
const renderEmoji = document.getElementById('renderEmoji');
const categoriesEmoji = document.getElementById('categoriesEmoji');
const searchString = document.getElementById('searchString');
const textArea = document.getElementById('textArea');
const favouriteEmojis = document.getElementById('favouriteEmojis');
let listOfFavouriteEmoji = JSON.parse(localStorage.getItem('emoji')) || [];

function fetchEmojiiList(api) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            listOfEmoji = data;
            renderListOfEmoji(listOfEmoji);
            renderCategories(listOfEmoji);
        })
}

fetchEmojiiList(emojiiApi);

searchString.addEventListener('keyup', () => {
    const valueForSearch = searchString.value;
    let searchList = listOfEmoji.filter(element => {
        return element.name.toLowerCase().includes(valueForSearch.toLowerCase());
    })
    renderListOfEmoji(searchList);
});

function renderFavouriteEmojii(arr){
    favouriteEmojis.innerHTML = '';
    arr.forEach(favouriteEmoji => {
        const itemFavouriteEmoji = document.createElement('li');
        itemFavouriteEmoji.innerHTML = favouriteEmoji;
        favouriteEmojis.appendChild(itemFavouriteEmoji);

        itemFavouriteEmoji.addEventListener('click', () => {
            textArea.value += favouriteEmoji;
            writeToClipboard(favouriteEmoji)
        })
    })
}

function renderCategories(arr){
    const categories = Array.from(new Set(arr.map(emoji => {
        return emoji.category.split('(')[0];
    })))

    const liAllCategories = document.createElement('li');
    liAllCategories.innerHTML = 'All';
    categoriesEmoji.appendChild(liAllCategories);

    categories.forEach(category => {
        
        const liCategory = document.createElement('li');
        liCategory.innerHTML = category;
        categoriesEmoji.appendChild(liCategory);

        liAllCategories.addEventListener('click', () => {
            renderListOfEmoji(arr);
        });

        liCategory.addEventListener('click', () => {
            let filterByCategoryArray = arr.filter(emoji => {
                return emoji.category.includes(category);
            })
            renderListOfEmoji(filterByCategoryArray);
        });
    })
}

function renderListOfEmoji(arr) {
    renderEmoji.innerHTML = ''; 
    favouriteEmojis.innerHTML = '';
    renderFavouriteEmojii(listOfFavouriteEmoji);
    arr.forEach(emoji => {
        
        const li = document.createElement('li');
        const spanImage = document.createElement('span');
        const spanName = document.createElement('span');
        const spanFavourite = document.createElement('span');
        spanImage.setAttribute('class', 'span-image');
        spanName.setAttribute('class', 'span-name');
        spanFavourite.setAttribute('class', 'favourite');
        spanImage.innerHTML = emoji.char;
        spanName.innerHTML = emoji.name;
        spanFavourite.innerHTML = `&#9733`;
        li.appendChild(spanImage);
        li.appendChild(spanName);
        li.appendChild(spanFavourite);

        spanFavourite.addEventListener('click', (e) => {   
            e.stopPropagation();
            listOfFavouriteEmoji.push(emoji.char);
            listOfFavouriteEmoji = Array.from(new Set(listOfFavouriteEmoji));
            if(listOfFavouriteEmoji.length > 20){
                listOfFavouriteEmoji.splice(0, 1);
            }

            let arrayToStore = JSON.stringify(listOfFavouriteEmoji);
            localStorage.setItem('emoji', arrayToStore);

            renderFavouriteEmojii(listOfFavouriteEmoji);
        });

        li.addEventListener('click', () => {
            textArea.value += emoji.char;
            writeToClipboard(emoji.char)
        });

        renderEmoji.appendChild(li);
    });
}







