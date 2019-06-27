// Doubling of odd number
let numbers = [1, 2, 3, 4];
let newNumbers = [];

newNumbers = numbers.filter(x => x % 2 !== 0 )
            .map(x => x * 2);

console.log("The doubled numbers are", newNumbers); // [2, 6]
console.log(' ');





//Working with movies
//1 movies with a short title
function findOneWordTitles(arr){
    return arr.filter(function(x){
        return x.title.split(' ').length === 1;
    })
}

let oneWordTitles = findOneWordTitles(movies);
console.log(`Short movie titles with one word:`);
console.log(oneWordTitles);
console.log(' ');

function findShortTitles(arr){
    return arr.filter(function(x){
        return x.title.length <= 1;
    })
}

let shortTitles = findShortTitles(movies);
console.log(`Short movie titles with one letter:`);
console.log(shortTitles);
console.log(' ');

//2 long movie titles
function findLongTitles(arr){
    return arr.filter(function(x){
        return x.title.length >= 50;
    })
}

let longTitles = findLongTitles(movies);
console.log(`Long movie titles`);
console.log(longTitles);
console.log(' ');


//3 number of movies made between 1980-1989
function countMoviesOnSpecialPeriod(arr){
    let numberOfMovies = arr.filter(function(x){
        return (x.year >= '1980' && x.year <= '1989');
    })
    return numberOfMovies.length;
}

let numberOfMovies1980_1989 = countMoviesOnSpecialPeriod(movies);
console.log(`Number of movies made between 1980-1989: ${numberOfMovies1980_1989}`);
console.log(' ');

//4 extra key - tag. Good (>= 7), Average (>= 4 and < 7), Bad (< 4)
function addExtraTag(arr){
    
    let changedArr = arr.map(function(x){
        let tagValue;
        if(x.rating >= 7){
            tagValue = 'Good';
        }
        else if(x.rating >= 5 ){
            tagValue = 'Average';
        }
        else {
            tagValue = 'Bad';
        }

        return { ...x, tag: tagValue};
    })

    return changedArr;
}

let tagMovies = addExtraTag(movies);
console.log(`Array of movies with new property - tag:`);
console.log(tagMovies);
console.log(' ');

// 5 movies rated higher than 6, only the rating of the movies
function findRating(arr) {
    return arr.filter(x => x.rating > 6)
        .map(x => x.rating);
}

let ratingMoreThan6 = findRating(movies);
console.log(`Array of movies with rating more than 6:`);
console.log(ratingMoreThan6);
console.log(' ');

// 6 total number of movies containing any of following keywords: Surfer, Alien or Benjamin
let words = ['Surfer', 'Alien', 'Benjamin'];
function calcNumberOfMoviesWithSpecialWords(arr, arrayOfWords){

    let tempArr = [];

    arrayOfWords.forEach(function(x){
        tempArr.push(arr.filter(function(y){
            return y.title.toLowerCase().includes(x.toLowerCase());
        }))
    });

    let arrayOfMoviesWithSpecialWords = [].concat.apply([], tempArr);//merged array

    return arrayOfMoviesWithSpecialWords.length;
    
}

let numberOfMoviesWithWords = calcNumberOfMoviesWithSpecialWords(movies, words);
console.log(`Number of movies with words Surfer, Alien or Benjamin: ${numberOfMoviesWithWords}`);
console.log(' ');

//7 word in the title is duplicated
function findDuplicateWordInTitle(arr){

    let arrayOfDuplicateWordInTitle = arr.filter(function(x) {
        let separatedTitleOnWords = x.title.split(' ');
        let arrayOfWordsWithLetters = separatedTitleOnWords.filter(function(x) {

            let matches = /[^a-zA-Z]+/;

            if(matches.exec(x)){
                return false;
            }
            else{
                return true;
            }
        });

        if(arrayOfWordsWithLetters.length !== [... new Set(arrayOfWordsWithLetters)].length){
            return true;
        }
    })
    return arrayOfDuplicateWordInTitle;
}

let duplicateWordInTitle = findDuplicateWordInTitle(movies);
console.log(`Array of duplicated words in titles:`);
console.log(duplicateWordInTitle);
console.log(' ');


//Working with single string
// let bla = 'Star Wars: & Clone Wars';
// let blaArr = bla.split(' ');
// console.log(blaArr);// ["Star", "Wars:", "&", "Clone", "Wars"]

// function makeStringIncludesOnlyLettersOrNumbers(string) {
//     let matches = /[a-zA-Z0-9]+/.exec(string);
//     let word = matches[0];
//     return word;
// }

// let fgfg = blaArr.filter(function(x, i, array) {
//     let matches = /[^a-zA-Z0-9]+/;
//     if(x.length === 1 && matches.exec(x)){
//         return false;
//     }
//     else{return true;}
// });
// console.log(fgfg);

// let kg = fgfg.map(function(x) {
//     return makeStringIncludesOnlyLettersOrNumbers(x);
// });
// console.log(kg);//["Star", "Wars", "The", "Clone", "Wars"]

// let g = [... new Set(kg)];
// console.log(g);

// if(kg.length !== g.length){
//     console.log(bla);
// }

//mostly duplicated words
function findMostlyDuplicatedWords(arr){
    let arrayOfTitles = arr.map(x => x.title.toLowerCase());
    //console.log(arrayOfTitles);

    let splitedArrayOfTitles = arrayOfTitles.map(x => x.trim().split(' '));
    //console.log(splitedArrayOfTitles);

    let mergedArrayOfTitles = splitedArrayOfTitles.flat();
    //console.log(mergedArrayOfTitles);

    let arrayOfWordsWithLetters = mergedArrayOfTitles.map(function(x) {

        let matches = /[^a-zA-Z0-9]+/;
        let matches2 = /[a-zA-Z0-9]+/;

        if(matches.exec(x)){
            return x.replace(x, matches2.exec(x))
        }
        else{
            return x;
        }
    });
    //console.log(arrayOfWordsWithLetters);

    arrayOfWordsWithLetters.sort();
    //console.log(arrayOfWordsWithLetters);

    let current = null;
    let cnt = 0;
    let sortedArrayByAmountOfDuplicateWords = [];

    arrayOfWordsWithLetters.forEach(function(x){
        if (x != current) {
            if (cnt > 0) {
                sortedArrayByAmountOfDuplicateWords.push({word : current, amount : cnt});
            }
            current = x;
            cnt = 1;
        } else {
            cnt++;
        }
    })

    sortedArrayByAmountOfDuplicateWords = sortedArrayByAmountOfDuplicateWords.sort(function(a, b){
        return b.amount - a.amount;
    })

    console.log('What I need', sortedArrayByAmountOfDuplicateWords);

    let x = sortedArrayByAmountOfDuplicateWords.slice(0, 50);
    return x;
}

let mostlyDuplicatedWords = findMostlyDuplicatedWords(movies);
console.log(`Array of mostly duplicated words:`);
console.log(mostlyDuplicatedWords);
console.log(' ');


//average rating of all the movies
function findAverageRating(arr){
    let ratingArray = arr.map(x => x.rating);

    let averageRating = Math.round((ratingArray.reduce((acc, val) => acc + val)/ratingArray.length) * 10)/10;

    return averageRating;
}

let averageRatingOfMovies = findAverageRating(movies);
console.log(`Average rating of all the movies: ${averageRatingOfMovies}`);
console.log(' ');


//Count the total number of Good, Average and Bad movies

function countTotalNumberOfTag(arr){
    let tagArray = arr.map(x => x.tag);

    let uniqueValues = [... new Set(tagArray)];

    let bla = [];

    uniqueValues.forEach(x => {
        let innerArray = tagArray.filter((y) => {
            return x === y
        })

        bla.push(`{${x} : ${innerArray.length}}`);
    })
    
    return bla;

}

let totalNumberOfTag = countTotalNumberOfTag(tagMovies);
console.log(`The total number of Good , Average and Bad movies (Not reduce method)`);
console.log(totalNumberOfTag);
console.log(' ');

function countTotalNumberOfTag2(arr){

    let finalArray = arr.reduce(function(acc, value, i, curArr){

        let tag = value.tag;

        if(acc[tag] === undefined){
            acc[tag] = 1;
        }
        else{
            acc[tag]++;
        }

        return acc;
    }, {});

    return finalArray;
}

let totalNumberOfTag2 = countTotalNumberOfTag2(tagMovies);
console.log(`The total number of Good - ${totalNumberOfTag2.Good}, Average - ${totalNumberOfTag2.Average} and Bad - ${totalNumberOfTag2.Bad} movies. (Reduce method)`);
console.log(totalNumberOfTag2);