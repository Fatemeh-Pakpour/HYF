(() => {
    const emojiiApi = 'https://raw.githubusercontent.com/amio/emoji.json/master/emoji.json';
    const renderedEmoji = document.getElementById('renderedEmoji');
    const categoriesEmoji = document.getElementById('categoriesEmoji');
    const searchString = document.getElementById('searchString');
    const textArea = document.getElementById('textArea');
    const favouriteEmojis = document.getElementById('favouriteEmojis');
    let listOfFavouriteEmoji = JSON.parse(localStorage.getItem('emoji')) || [];
    let currentCategory = '';

    function fetchEmojiiList(api) {
        fetch(api)
            .then(response => response.json())
            .then(listOfEmoji => {
                renderListOfEmoji(listOfEmoji);
                renderCategories(listOfEmoji);
                searchString.addEventListener('keyup', () => {
                    renderListOfEmoji(listOfEmoji);
                });
            })
    }

    fetchEmojiiList(emojiiApi);

    function renderFavouriteEmojii(arr) {
        favouriteEmojis.innerHTML = '';
        arr.forEach(favouriteEmoji => {
            const liFavouriteEmoji = document.createElement('li');
            liFavouriteEmoji.innerHTML = favouriteEmoji;
            favouriteEmojis.appendChild(liFavouriteEmoji);

            liFavouriteEmoji.addEventListener('click', () => {
                addEmojiToTheString(favouriteEmoji);
            })
        })
    }

    function renderCategories(arr) {
        const categories = Array.from(new Set(arr.map(emoji => {
            return emoji.category.split('(')[0];
        })));

        const domCategories = [];

        function resetClass(){
            domCategories.forEach(domElement => {
                if(currentCategory === domElement.dataset.category){
                    domElement.setAttribute('class', 'categories-active');
                }
                else{
                    domElement.classList.remove('categories-active');                    
                }
            });            
        }
        
        ['', ...categories].forEach(category => {
            const liCategory = document.createElement('li');
            liCategory.innerHTML = category || 'All';
            liCategory.dataset.category = category;
            categoriesEmoji.appendChild(liCategory);
            domCategories.push(liCategory);

            liCategory.addEventListener('click', () => {                
                currentCategory = category;
                resetClass();  
                renderListOfEmoji(arr);
            });
        });
        resetClass();        
    }

    function addEmojiToTheString(emojiImage) {
        textArea.value += emojiImage;
        writeToClipboard(emojiImage);
    }

    function renderListOfEmoji(arr) {
        renderedEmoji.innerHTML = '';
        favouriteEmojis.innerHTML = '';

        const valueForSearch = searchString.value;
        let searchList = arr.filter(emoji => {
            if (valueForSearch !== ''
                && !emoji.name.toLowerCase().includes(valueForSearch.toLowerCase())) {
                return false;
            }
            if (!emoji.category.includes(currentCategory)) {
                return false;
            }
            return true;
        });

        renderFavouriteEmojii(listOfFavouriteEmoji);

        let innerArray = searchList || arr;
        innerArray.forEach(emoji => {

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

            spanFavourite.addEventListener('click', (event) => {
                event.stopPropagation();                
                

                if(listOfFavouriteEmoji.includes(emoji.char)){
                    listOfFavouriteEmoji.splice(listOfFavouriteEmoji.indexOf(emoji.char), 1);
                }
                if (listOfFavouriteEmoji.length > 20) {
                    listOfFavouriteEmoji.pop();
                }

                listOfFavouriteEmoji.splice(0, 0, emoji.char);
                let arrayToStore = JSON.stringify(listOfFavouriteEmoji);
                localStorage.setItem('emoji', arrayToStore);

                renderFavouriteEmojii(listOfFavouriteEmoji);
            });

            li.addEventListener('click', () => {
                addEmojiToTheString(emoji.char);
            })

            renderedEmoji.appendChild(li);
        });
    }

})();



//Work later on these tasks
//li.innerHTML = `<span></span><span></span><span></span>`
//display:none to li element instead rerender every time

