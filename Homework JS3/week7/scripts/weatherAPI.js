//Weather app
//API key is 01a6493c3e5e1b74368f9faa44dcdcd3

(() => {
    let typedCity = document.getElementById('typed-city');
    let buttonGetWeatherForChosenCity = document.getElementById('get-weather');
    let buttonGetWeatherForYourCity = document.getElementById('get-weather-for-your-city');
    let weatherDetailsContainer = document.getElementById('weather-details-container');

    window.addEventListener('load', showWeatherWithPreviousLocation);
    buttonGetWeatherForChosenCity.addEventListener('click', showWeatherForChosenCity);
    typedCity.addEventListener('keydown', (event) => {
        if(event.keyCode == 13){
            showWeatherForChosenCity();
        }        
    });
    buttonGetWeatherForYourCity.addEventListener('click', showWeatherForYourLocation);

    function watchLocation() {
        return new Promise(function (resolve) {
            navigator.geolocation.getCurrentPosition(function (position) {
                let geoArray = [];
                geoArray[0] = position.coords.latitude;
                geoArray[1] = position.coords.longitude;

                resolve(geoArray);
            });
        });
    }

    function showWeatherForChosenCity() {
        let cityName = typedCity.value.toLowerCase();
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=01a6493c3e5e1b74368f9faa44dcdcd3`;

        if (typedCity.value === '') {
            alert('Enter city!!!');
        }
        else {
            fetchApi(api);
        }
    }

    function showWeatherForYourLocation() {
        watchLocation()
            .then((array) => {
                let lat = array[0].toFixed(2);
                let lon = array[1].toFixed(2);
                let api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=01a6493c3e5e1b74368f9faa44dcdcd3`;
                fetchApi(api);
            })
    }

    function showWeatherWithPreviousLocation() {
        let cityFromLocalStorage = JSON.parse(localStorage.getItem('city'));

        if (cityFromLocalStorage) {
            let api = `https://api.openweathermap.org/data/2.5/weather?q=${cityFromLocalStorage}&appid=01a6493c3e5e1b74368f9faa44dcdcd3`;
            fetchApi(api);
        }
    }

    function fetchApi(api) {
        weatherDetailsContainer.innerHTML = '';

        fetch(api)
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                else {
                    return Promise.reject('Did you choose RIGHT city name?')
                }
            })
            .then(data => {
                for (let key in data) {
                    if (key === 'name') { //get name og the city
                        let nameOfTheCity = document.createElement('li');
                        nameOfTheCity.innerHTML = `Weather in ${data[key]}`;
                        weatherDetailsContainer.insertBefore(nameOfTheCity, weatherDetailsContainer.firstChild);
                    }
                    else if (key === 'main') {//get tepmperature and humidity
                        let temperatureAndHumidity = document.createElement('li');

                        for (let key2 in data[key]) {
                            if (key2 === 'temp') {
                                temperatureAndHumidity.innerHTML = `Temperature: ${(data[key][key2] - 273.15).toFixed(1)}&#8451.`;
                            }
                            if (key2 === 'humidity') {
                                temperatureAndHumidity.innerHTML += ` Humidity: ${data[key][key2]}%`;
                            }
                        }
                        weatherDetailsContainer.appendChild(temperatureAndHumidity);
                    }
                    else if (key === 'weather') { //get sky condition and icons for that
                        let skyCondition = document.createElement('li');

                        data[key].forEach(function (x) {
                            for (let key2 in x) {
                                if (key2 === 'icon') {
                                    let skyConditionIcon = document.createElement('img');
                                    skyConditionIcon.setAttribute('src', `http://openweathermap.org/img/w/${x[key2]}.png`);
                                    skyCondition.appendChild(skyConditionIcon);
                                    weatherDetailsContainer.appendChild(skyCondition);
                                }
                                else if (key2 === 'description') {
                                    skyCondition.innerHTML = x[key2].slice(0, 1).toUpperCase() + x[key2].slice(1);
                                    weatherDetailsContainer.appendChild(skyCondition);
                                }
                            }
                        })
                    }
                    else if (key === 'wind') { //get wind speed
                        let windCondition = document.createElement('li');

                        for (let key2 in data[key]) {
                            if (key2 === 'speed') {
                                windCondition.innerHTML = `Wind Speed: ${data[key][key2]}`;
                            }
                        }
                        weatherDetailsContainer.appendChild(windCondition);
                    }
                    else if (key === 'sys') { //get sunrise and sunset
                        let sunriseAndSunset = document.createElement('li');

                        for (let key2 in data[key]) {
                            let date = new Date(data[key][key2] * 1000);
                            let localTime = date.toLocaleTimeString();

                            if (key2 === 'sunrise') {
                                sunriseAndSunset.innerHTML = `Sunrise: ${localTime}.`;
                            }
                            else if (key2 === 'sunset') {
                                sunriseAndSunset.innerHTML += ` Sunset: ${localTime}`;
                            }
                        }
                        weatherDetailsContainer.appendChild(sunriseAndSunset);
                    }
                }
                let arrayToStoreInLocalStorage = JSON.stringify(data.name);
                localStorage.setItem('city', arrayToStoreInLocalStorage);
            })
            .catch(error => alert(`There is an error. ${error}`));
    }
})();