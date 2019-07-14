//Exercise 1

const apiExercise1 = 'https://yesno.wtf/api';
function getYesOrNo(api){
    fetch(api)
        .then(response => response.json())
        .then(data => {
            console.log(data.answer);
        })
}

getYesOrNo(apiExercise1);

let batteryIsCharging = false;
navigator.getBattery().then(function(battery) {
    batteryIsCharging = battery.charging;
    console.log('Battery is charging');
  
    battery.addEventListener('chargingchange', function() {
      batteryIsCharging = battery.charging;
      console.log('Battery is NOT charging');
    });
  });

//Exercise 2

let x = false;

new Promise((resolve, reject) => {
    setTimeout(function(){
        resolve('Hello world. (Very original...)');
    }, 2000)

    if(!x){
        reject('Error happened')
    }
})
.then(msg => {
    console.log(msg);
})
.catch(msg => console.log(msg));

//Exercise 3
function returnPromise(successMessage, errorMessage, shouldReject){
    return new Promise((resolve, reject) => {

        if(shouldReject){
            setTimeout(function(){
                reject(errorMessage);
            }, 1000);
        }
        else{
            setTimeout(function(){
                resolve(successMessage);            
            }, 1000);
        }
    })
}

let getMessage = returnPromise('Succeed!', 'Not succeed!', false).then(msg => console.log(msg)).catch(msg => console.log(msg));


let apiExercise4_5 = 'https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json';
//Exercise 4

navigator.getBattery()
    .then(function(battery) {
        return new Promise((resolve, reject) => {

            if(battery.level > 0.8){
                setTimeout(() => {
                    console.log(battery.level * 100 + '%');
                    resolve(battery.level);
                }, 3000);
            }
            else{
                reject('Battery level is not enough');
            }
        })
    })
    .then(function() {
        return fetch(apiExercise4_5);
    })    
    .then(response => response.json())
    .then(data => {
        console.log('Show films');
        data.forEach(x => console.log(x));
    })
    .catch(msg => console.log(msg));


//Exercise 5 - the same as exercise 4. 
//Uncomment, when exercise 4 is commented

// let getBatteryLevel5 = navigator.getBattery()
// .then(function(battery) {
//     console.log(battery.level * 100 + '%');
//     return battery.level
// });
// let fetchMovies = fetch(apiExercise4_5)
//         .then(response => response.json())
//         .then(data => {
//             console.log('Show films');
//             data.forEach(x => console.log(x));
//             return data;
//         })
        
// Promise.all([getBatteryLevel5, fetchMovies]).then(function(val){
//     console.log(val);
// })

