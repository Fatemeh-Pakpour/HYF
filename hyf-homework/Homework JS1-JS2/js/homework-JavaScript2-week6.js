//Warmup
//1
window.addEventListener('load', function(){
    setTimeout(function(){console.log('Called after 2.5 seconds')}, 2500);
})

//2
function logOut(delay, stringToLog){
    setTimeout(function(){
        console.log(stringToLog)
    }, delay)
};
logOut(200, 'a');
logOut(800, 'b');
logOut(2000, 'c');

//3
let logOutButton = document.getElementById('logOutButton');
logOutButton.addEventListener('click', () => {logOut(3500, '3.5 seconds after button is clicked')});

//4
let funcOne = function(){
    console.log('Earth');
}
let funcTwo = function(){
    console.log('Saturn');
}
let funcThree = function(planetLogFunction){
    planetLogFunction();
}
funcThree(funcOne);
funcThree(funcTwo);

//5
let logLocation = document.getElementById('logLocation');
logLocation.addEventListener('click', watchLocation);

function watchLocation(){
    navigator.geolocation.watchPosition(function(position) {
    console.log(position.coords.latitude, position.coords.longitude);
  });
}

//7
function runAfterDelay(delay, callback){
    setTimeout(function(){
        callback();
    }, delay)
}

runAfterDelay(3000, function(){console.log('3000')});
runAfterDelay(4000, watchLocation);

//8
window.addEventListener('dblclick', ()=> {console.log('double click!')})

//9
function logFunnyJoke(){
    console.log('Hahaha');
};
function logBadJoke(){
    console.log('Buaaah');
};

function jokeCreator(shouldTellFunnyJoke){
    if(shouldTellFunnyJoke){
        logFunnyJoke();
    }
    else{
        logBadJoke();
    }
};

jokeCreator(true);
jokeCreator(false);


//Function as a variable
function createArray(){
    let arr = [];
    for(let i = 0; i < 3; i++){
        arr.push(
            function(){
                console.log( (i + 1) * 10);
            }
        )
    }

    arr.forEach(x => x());
}

createArray();

// Create a function as a const and try creating a function normally.
function f1(){
    console.log('Function declaration');
}

let f2 = function (){
    console.log('Function expression');
}

f1();
f2();


//Create an object
function createObject(){
    let obj = {};
    obj.funcKey = function(){
        console.log('Object was created')
    };
    return obj;
}

let calledFunction = createObject();
calledFunction.funcKey();