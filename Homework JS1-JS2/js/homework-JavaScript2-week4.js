//Find the shortest word

const danishWords = ['bil', 'plante', 'kaffe', 'bog', 'ø', 'planetarium'];

function findShortestWord(arr){

    let shortestWord = arr.sort(function(a, b){
        arr.forEach(function(x){
            x.length;
        });
        return a.length - b.length;
    })[0];
    
    console.log(shortestWord);
    return shortestWord;
}

findShortestWord(danishWords); // returns 'ø'
console.log(' ');





//Difference between median and average

const housePrices = [3000000, 3500000, 1300000, 40000000, 100000000, 8000000, 2100000];

function findAverage(arr){
    let average = arr.reduce((acc, val) => acc + val)/arr.length;
    return average;
}

function findMedian(arr){
    let sortedArray = [...arr];
    let median = sortedArray.sort((a, b) => a - b)[Math.floor(sortedArray.length/2)];
    return median;
}

function findAverageAndMedian(arr){
    
    let obj = {'Average value' : findAverage(arr), 'Median value': findMedian(arr)};
    return obj;
}

let averageAndMedian = findAverageAndMedian(housePrices);
console.log(averageAndMedian);

const body = document.body;
let span = document.createElement('span');
span.innerHTML = `For array : ${housePrices}`;

const list = document.createElement('ul');

for(let key in averageAndMedian){
    
    let li = document.createElement('li');

    let strong = document.createElement('strong');
    strong.innerHTML = `${key}: `;

    let span = document.createElement('span');
    span.innerHTML = `${averageAndMedian[key]}`;

    li.appendChild(strong);
    li.appendChild(span);
    list.appendChild(li);
}

let averageMedian = document.getElementById('averageMedian');

averageMedian.appendChild(list);
averageMedian.appendChild(span);
console.log(' ');





//Spirit animal name generator

let spiritAnimalNames = ['The Aggressive Alligator',	'The Agreeable Fish',	'The Brave Pig',
    'The Calm Dragonfly',	'The Delightful Owl',	'The Eager Wasp',
    'The Silly Eagle', 'The Happy Panda', 'The Helpless Whale',
    'The Little Elephant',	'The Large Panther', 'The Fat Wolf'];

let randomAnimal = spiritAnimalNames[Math.floor(Math.random() * spiritAnimalNames.length)];

function getName(event, checked){

    checked = !checked;
    
    let spiritAnimal = document.getElementById('spiritAnimal');

    let textIn = spiritAnimal.querySelector('input[type="text"]');
    let textInVal = spiritAnimal.querySelector('input[type="text"]').value;

    let p = spiritAnimal.querySelector('p');

    let submit = spiritAnimal.querySelector('input[type="submit"]');

    function showText(){
        if(textInVal.trim() === ''){
            p.style.display = 'block';
            p.innerHTML = `Say your name first...`;
        }
        else{
            p.style.display = 'block';
            p.innerHTML = `${textInVal} - ${spiritAnimalNames[Math.floor(Math.random() * spiritAnimalNames.length)]}`;
        }
    }

    function hideText(){
        p.style.display = 'none';
    }

    function chooseEvent(func){
        if(event === 'submit'){
            submit.addEventListener('click', func);
        }
        else if(event === 'hover'){
            textIn.addEventListener('mouseover', func);
        }
        else if(event === 'enter'){
            textIn.addEventListener('keypress', e => {
                if (e.keyCode === 13){
                    func();
                }
            });
        }
    }
    if(checked){
        chooseEvent(showText);
    }
    else{
        chooseEvent(hideText);
    }
}









//hyfBay - get the okay'est products here


