//Item array removal

const names = ['Peter', 'Ahmad', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala'];
const nameToRemove = 'Ahmad';

names.splice(names.indexOf(nameToRemove), 1);

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']




//When will we be there??

const travelInformation = {
    speed: 50,
    destinationDistance: 432,
  };  

function findTravelTime(speed, distance){
    let time = distance/speed;
    if(Math.floor(time) === time){
        return `${Math.floor(time)} hours`;
    }
    else{
        return `${Math.floor(time)} hours and ${Math.floor((time % 1)*60)} minutes`;
    }
}

const travelTime = findTravelTime(travelInformation.speed, travelInformation.destinationDistance);
console.log(travelTime); // 8 hours and 38 minutes




//Series duration of my life

const seriesDurations = [
    {
      title: 'The Big Bang Theory',
      days: 4,
      hours: 6,
      minutes: 18,  
    },
    {
      title: 'Desperate Housewifes',
      days: 7,
      hours: 12,
      minutes: 0,
    },
    {
      title: 'Friends',
      days: 3,
      hours: 14,
      minutes: 32,
    },
    {
      title: 'Everybody Hates Chris',
      days: 1,
      hours: 8,
      minutes: 16,
    }
  ];

function calculateDaysOfLife(age){
    return age * 365 * 12 * 30;
}

function calculateTimeForOneSeries(arr){
    let newArr = [];

    arr.forEach(function(i){
        let daysForOneSeries = i.days + i.hours / 24  + i.minutes / 24 / 60 ;
        let percentage = (daysForOneSeries * 100 / calculateDaysOfLife(80)).toFixed(5);
        newArr.push(+percentage);
        console.log(`'${i.title}' took ${percentage} of my life.`);
    });

    let fullPercentage = newArr.reduce((acc, v) => acc + +v);
    console.log(`In total that is ${fullPercentage} of my life.`);
} 

calculateTimeForOneSeries(seriesDurations);




//My favorite songs
const songDatabase = [{
    songId: 1,
    title: 'My baby',
    artist: 'Soggy socks',
  },
  {
    songId: 2,
    title: '3 nails in wood',
    artist: 'The carpenters',
  },
  {
    songId: 3,
    title: 'Blacker than black',
    artist: 'Instant coffee',
  },
  {
    songId: 4,
    title: 'When is enough too little?',
    artist: 'The spies girls',
  },
];

const myPlaylist = [];

function addSongToDatabase(song){  
  songDatabase.push(song);
};

addSongToDatabase({
  songId: 5,
  title: 'Oh baby',
  artist: 'Britney Spears',
});

addSongToDatabase({
  songId: 6,
  title: 'Reckoning',
  artist: 'The Within Temptation',
});

console.log(songDatabase);//DELETE

function getSongByTitle(songTitle){
  let exactSong;

  songDatabase.forEach(function(i) {
    if(songTitle === i.title){      
      exactSong = i;
    }
  })  

  return exactSong;
}

const searchedSong = getSongByTitle('When is enough too little?');
console.log(searchedSong); // returns { songId: 4, title: 'When is enough too little', artist: 'The spies girls'}

const searchedSong2 = getSongByTitle('When is enough too');
console.log(searchedSong2); // returns undefined

const searchedSong3 = getSongByTitle('Oh baby');
console.log(searchedSong3); // returns {artist: "Britney Spears", songId: 5, title: "Oh baby"}

const searchedSong4 = getSongByTitle('Oh baby baby');
console.log(searchedSong4); // returns undefined

const searchedSong5 = getSongByTitle('When enough to little?');
console.log(searchedSong5); // returns undefined