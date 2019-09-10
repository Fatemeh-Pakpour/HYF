//Homework JS3/2
(() => {
    //Movies exercise
    fetch('https://gist.githubusercontent.com/pankaj28843/08f397fcea7c760a99206bcb0ae8d0a4/raw/02d8bc9ec9a73e463b13c44df77a87255def5ab9/movies.json')
        .then(response => response.json())
        .then(data => {
            let arrayOfBadMovies = data.filter(x => x.rating < 5);
            let arrayOfBadMoviesSince2000 = arrayOfBadMovies.filter(x => x.year >= 2000);
            let arrayOfTitlesOfBadMoviesSince2000 = arrayOfBadMoviesSince2000.map(x => x.title);
            console.log(arrayOfTitlesOfBadMoviesSince2000);
        })




    // Promise that resolves after set time
    function resolveAfterSetTime(resolveAfter) {
        return new Promise(resolve => {
            setTimeout(resolve, resolveAfter * 1000);
        })
    }
    resolveAfterSetTime(2)
        .then(function () {
            console.log('I am called asynchronously');
        });




    // Rewrite time
    function setTimeoutPromise(time) {
        return new Promise(resolve => {
            setTimeout(resolve, time);
        })
    }
    setTimeoutPromise(3000)
        .then(() => {
            console.log('Called after 3 seconds');
        });




    function getCurrentLocation() {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
        })
    }
    getCurrentLocation()
        .then((position) => {
            console.log(position);
        })
        .catch((error) => {
            console.log(error);
        });




    // Fetching and waiting
    fetch('http://api.open-notify.org/astros.json')
        .then(response => response.json())
        .then(data => {
            setTimeout(function () {
                console.log(`People in space: ${data.number}`);
            }, 5000)
        })
})();