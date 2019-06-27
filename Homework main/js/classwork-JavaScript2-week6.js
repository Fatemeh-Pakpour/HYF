//https://github.com/HackYourFuture-CPH/JavaScript/blob/master/JavaScript2/Week6/lesson-plan.md#calling-a-function-within-a-function
//Click counter
let buttonAdd = document.getElementById('buttonAdd');
let buttonAddMore = document.getElementById('buttonAddMore');
let counter = document.getElementById('counter');

buttonAdd.addEventListener('click', addOne);
buttonAddMore.addEventListener('click', addOne);

let count = 0;
function addOne(){    
    counter.innerHTML = count++;
}

//Delay clicker
let showLater = document.getElementById('showLater');
showLater.addEventListener('click', function() { setTimeout(function(){
    showLater.nextElementSibling.innerHTML = 'This text was delayed by 3 seconds';
}, 3000)});

//Page onload
let callbackFunction = function(){
    console.log('DOM fully loaded and parsed');
}
window.addEventListener('DOMContentLoaded', callbackFunction);

//Mouse position
let xPosition = document.getElementById('xPosition');
let yPosition = document.getElementById('yPosition');


document.addEventListener('click', getXYPositions);

let arr = [];

function getXYPositions(){
    let x = window.event.clientX;
    let y = window.event.clientY;

    xPosition.innerHTML = x;
    yPosition.innerHTML = y;

    arr.push({x: x, y: y});
}

function findAverageXYPositions() {

    let obj = arr.reduce(function(acc, val){

        console.log(val);

        for (let key in val){
            if(acc[key] === undefined){
                acc[key] = val[key]
            }
            else{
                acc[key] += val[key];
            }
        }
        return acc;
    }, {});

    for(let key in obj){
        obj[key] = Math.round(obj[key]/arr.length);
    }


    arr.sort((a, b) => b.x - a.x);
    let medianX = arr[Math.floor(arr.length/2)].x;

    arr.sort((a, b) => b.y - a.y);
    let medianY = arr[Math.floor(arr.length/2)].y;

    console.log(`The median position of is x: ${medianX}, y: ${medianY}`);
    console.log(`The average position of is x: ${obj.x}, y: ${obj.y}`);
    return obj;
}

setTimeout(findAverageXYPositions , 5000);