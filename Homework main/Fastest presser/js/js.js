let setSeconds = document.getElementById('set_seconds');
let startButton = document.getElementById('start_button');
let firstPlayer = document.getElementById('first_player');
let secondPlayer = document.getElementById('second_player');
let firstCounter = document.getElementById('first_counter');
let secondCounter = document.getElementById('second_counter');
let countdown = document.getElementById('countdown');


window.addEventListener('keydown', pressKey);
startButton.addEventListener('click', startGame);

let bool = false;
let counterS = null;
let counterL = null;
 
let amountOfTheGameTime;


function pressKey(e){
    if(bool && e.keyCode === 83){
        counterS++;
    }
    else if(bool && e.keyCode === 76){
        counterL++;
    }

    firstCounter.innerHTML = counterS;
    secondCounter.innerHTML = counterL;        
}

function startGame(){
    amountOfTheGameTime = Number(setSeconds.value + '000');

    let timeNow = setSeconds.value;
    countdown.innerHTML = timeNow; 
    --timeNow;

    let interval;
    interval = window.setInterval(function(){
        countdown.innerHTML = timeNow;
        --timeNow;     
    }, 1000);


    if(amountOfTheGameTime === 0){
        alert('You did not set time');
    }
    else{
        bool = true;

        counterS = 0;
        counterL = 0;

        firstPlayer.querySelector('.won-message').innerHTML = "";
        secondPlayer.querySelector('.won-message').innerHTML = "";

        firstCounter.innerHTML = counterS;
        secondCounter.innerHTML = counterL;
        
        

        setTimeout(function() {
            bool = false;
            console.log('Game finished');
            clearInterval(interval);
            
            if(counterS > counterL){
                firstPlayer.querySelector('.won-message').innerHTML = 'First player won';
            }
            else if(counterS < counterL) {
                secondPlayer.querySelector('.won-message').innerHTML = 'Second player won';
            }
            else if(counterS === 0 && counterL === 0) {
                alert(`Nobody was playing`);
            }
            else{
                let string = 'Friendship won'
                firstPlayer.querySelector('.won-message').innerHTML = string;
                secondPlayer.querySelector('.won-message').innerHTML = string;
            }


        }, amountOfTheGameTime);
    }
}


