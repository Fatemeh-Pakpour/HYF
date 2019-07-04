// getWeatherData();

let weather = document.getElementById('weather');
let city = weather.querySelector('input');
let getWeather = document.getElementById('get-weather');
let getWeatherForYourCity = document.getElementById('get-weather-for-your-city');
let ul = document.createElement('ul');

city.addEventListener('click', function(){//clear input field
    city.value = '';
});
window.addEventListener('load', getWeatherData); //pull location from local storage
getWeather.addEventListener('click', getWeatherData); //show weather on specific city
getWeatherForYourCity.addEventListener('click', getWeatherData); //show weather by location
weather.appendChild(ul); //add weather information

let watchLocation = new Promise(function(resolve, reject){ //searching for the location

    let x = [];

    navigator.geolocation.watchPosition(function(position) {

        x[0] = (position.coords.latitude)
        x[1] = (position.coords.longitude);
        
        let arrayToStoreInLocalStorage = JSON.stringify(x);

        localStorage.setItem('key', arrayToStoreInLocalStorage);
        resolve(x);
    });
})

function getWeatherData(e){ //form data to show weather information

    ul.innerHTML = '';
    let api;

    if(e.target === document){ //if event fires on the document

        let arrayOfValueFromLocalStorage = JSON.parse(localStorage.getItem('key')) || [];

        if (arrayOfValueFromLocalStorage.length === 0){ //if nothing in local storage
            findLocation();
        }
        else { // if there is data in local storage
            let lat = arrayOfValueFromLocalStorage[0].toFixed(2);
            let lon = arrayOfValueFromLocalStorage[1].toFixed(2);
    
            api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01a6493c3e5e1b74368f9faa44dcdcd3`;
    
            fetchApi();
        }
    }

    else if(e.target === getWeather){//if event fires on the 'get a weather information' Button
        let cityName = city.value.toLowerCase();
        api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=01a6493c3e5e1b74368f9faa44dcdcd3`;
        if(city.value === ''){
            alert('Enter city!!!');
        }
        else{
            fetchApi();
        }
    }
    else if(e.target === getWeatherForYourCity){//if event fires on the 'Choose your City' Button
        findLocation();
    }


    function findLocation(){ //finds location
        watchLocation
        .then((array) => {
            let lat = array[0].toFixed(2);
            let lon = array[1].toFixed(2);
            api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01a6493c3e5e1b74368f9faa44dcdcd3`;
            fetchApi();
        }) 
    }

    //get information from API
    function fetchApi(){
    fetch(api)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            else{                
                return Promise.reject('Did you choose RIGHT city name?')
            }
        })
        .then(data => {

            for(let key in data){
                
                if(key === 'name'){ //get name og the city
                    let li = document.createElement('li');
                    let h3 = document.createElement('h3');

                    h3.innerHTML = `Weather in ${data[key]}`;

                    li.appendChild(h3);
                    ul.insertBefore(li, ul.firstChild);
                }
                else if(key === 'main'){//get tepmperature and humidity

                    let li = document.createElement('li');

                    for (let key2 in data[key]){

                        if(key2 === 'temp'){
                            li.innerHTML = `Temperature: ${(data[key][key2] - 273.15).toFixed(1)}&#8451.`;
                        }
                        if(key2 === 'humidity'){
                            li.innerHTML += ` Humidity: ${data[key][key2]}%`;
                        }
                    }

                    ul.appendChild(li);
                }
                else if(key === 'weather'){ //get sky condition and icons for that

                    let li = document.createElement('li');

                    data[key].forEach(function(x){

                        for (let key2 in x){

                            if(key2 === 'icon'){
                                
                                let img = document.createElement('img');
                                img.setAttribute('src', `http://openweathermap.org/img/w/${x[key2]}.png`);
                                li.appendChild(img);
                                ul.appendChild(li);
                            }

                            else if(key2 === 'description'){

                                li.innerHTML = x[key2].slice(0,1).toUpperCase() + x[key2].slice(1);
                                ul.appendChild(li);
                            }
                        }
                    })
                    
                }
                else if(key === 'wind'){ //get wind speed

                    let li = document.createElement('li');
                    
                    for (let key2 in data[key]){

                        if(key2 === 'speed'){
                            li.innerHTML = `Wind Speed: ${data[key][key2]}`;
                        }
                    }
                    ul.appendChild(li);
                }
                else if(key === 'sys'){ //get sunrise and sunset

                    let li = document.createElement('li');

                    for (let key2 in data[key]){

                        let date = new Date(data[key][key2] * 1000);
                        let localTime = date.toLocaleTimeString();

                        if(key2 === 'sunrise'){
                            li.innerHTML = `Sunrise: ${localTime}.`;
                        }
                        else if(key2 === 'sunset'){
                            li.innerHTML += ` Sunset: ${localTime}`;
                        }
                    }
                    ul.appendChild(li);
                }
            }
            
        })
        .catch(error => alert(`There is an error. ${error}`));
    }
}
