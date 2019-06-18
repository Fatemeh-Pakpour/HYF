//Item array removal

const names = ['Peter', 'Ahmad', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala'];
const nameToRemove = 'Ahmad';

names.splice(names.indexOf(nameToRemove), 1);

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']
console.log(' ');





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
console.log(' ');





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
console.log(' ');





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

function addSong(song, array){

    function push(item){
        let existingItem = array.find(function(x){
            return item.songId === x.songId;
        });

        if(typeof(existingItem) === 'undefined'){
            array.push(item);
        }
    }

    if(Array.isArray(song)){
        song.forEach(function(x){
            push(x);
        })
    }
    else{
        push(song);
    }
};

function getSongByTitle(songTitle){

    let arrFromString = songTitle.split(' ');

    let exactSong = songDatabase.filter(function(i) {

        let result = true;

        arrFromString.forEach(function(x){
            result = result && i.title.search(x) !== -1 && i.title.length >= songTitle.length;
        })

        return result;
    })

    return exactSong;
}

function addSongToMyPlaylist(title){
  addSong(getSongByTitle(title), myPlaylist);
}


addSong({
  songId: 5,
  title: 'Oh baby',
  artist: 'Britney Spears',
}, songDatabase);

addSong({
  songId: 6,
  title: 'Reckoning',
  artist: 'The Within Temptation',
}, songDatabase);

addSong({
  songId: 7,
  title: 'Reckoning',
  artist: 'The W T',
}, songDatabase);


const searchedSong = getSongByTitle('When is enough too little?');
console.log(searchedSong); // returns [{ songId: 4, title: 'When is enough too little', artist: 'The spies girls'}]

const searchedSong2 = getSongByTitle('When is enough too');
console.log(searchedSong2); // returns [{ songId: 4, title: 'When is enough too little', artist: 'The spies girls'}]

const searchedSong22 = getSongByTitle('When bla enough too');
console.log(searchedSong22); // returns []

const searchedSong3 = getSongByTitle('When enough to little?');
console.log(searchedSong3); // returns [{artist: "The spies girls", songId: 4, title: "When is enough too little?"}]

const searchedSong4 = getSongByTitle('Oh baby');
console.log(searchedSong4); // returns [{artist: "Britney Spears", songId: 5, title: "Oh baby"}]

const searchedSong5 = getSongByTitle('Oh baby baby');
console.log(searchedSong5); // returns []

const searchedSong6 = getSongByTitle('baby');
console.log(searchedSong6); // returns [{songId: 1, title: "My baby", artist: "Soggy socks"},
                            // {songId: 5, title: "Oh baby", artist: "Britney Spears"}

addSongToMyPlaylist('3 nails in wood');
addSongToMyPlaylist('baby');
addSongToMyPlaylist('Reckoning');
console.log(myPlaylist); 
//[0: {songId: 2, title: "3 nails in wood", artist: "The carpenters"}
// 1: {songId: 1, title: "My baby", artist: "Soggy socks"}
// 2: {songId: 5, title: "Oh baby", artist: "Britney Spears"}
// 3: {songId: 6, title: "Reckoning", artist: "The Within Temptation"}
// 4: {songId: 7, title: "Reckoning", artist: "The W T"}]
console.log(' '); 





//NOnoN0nOYes (Note taking app)

let notes = [];

Array.prototype.findElement = function(id){//add method to Array. Returns first element with that id(existing element).
    return this.find(function(x){
        return id === x.id;
    });
}

function addNotes(id, content, arr){
    if(typeof(arr.findElement(id)) === 'undefined'){
        arr.push({"id": id, "content": content});
    }
    else{
        console.log('Choose another id');
    }
}

function deleteNote(id, arr){
    arr = arr.splice(arr.indexOf(arr.findElement(id)), 1);
}

function editNote(id, newContent, arr){
    arr.findElement(id).content = newContent;
}

function getNoteFromId(id, arr){

    if(isNaN(id) || (typeof(id) === 'string')){
        console.log('Error. Id should be a number.');
        return;
    }

    let note = arr.findElement(id);

    console.log(note);
    return note;
}

function getAllNotes(arr){
    console.log(arr);
    return arr;
}

function logOutNotesFormatted(arr){
    arr.forEach(function(x){
        console.log(`The note with id: ${x.id}, has the following note text: "${x.content}"`);
    })
}



addNotes(1, 'butter', notes);
addNotes(1, 'bread', notes); //'Choose another id'
addNotes(2, 'cheese', notes);
addNotes(3, 'tomato', notes);
addNotes(4, 'beer', notes);
addNotes(5, 'apple', notes);

getNoteFromId(2, notes);
getNoteFromId('2', notes);//Error. Id should be a number.
getNoteFromId('fdgfd', notes);//Error. Id should be a number.

logOutNotesFormatted(notes);

deleteNote(3, notes);

editNote(2, "fox", notes);
logOutNotesFormatted(notes);

getAllNotes(notes);

/*From codePen
insert your code here:
let notes = [];

Array.prototype.findElement = function(id){//add method to Array. Returns first element with that id(existing element).
  return this.find(function(x){
    return id === x.id;
  });
}

function addNote(id, content, arr){
  if(typeof(arr.findElement(id)) === 'undefined'){
    arr.push({"id": id, "content": content});
  }
  else{
    console.log('Choose another id');
  }
}

function getNotes(arr){
  return arr;
}

function logOutNotesFormatted(arr){
  console.log(arr);
  arr.forEach(function(x){
    console.log(`The note with id: ${x.id}, has the following note text: "${x.content}"`);
  })
}

 
// This you dont need to worry about yet!
const textarea = document.querySelector('textarea');
const ul = document.querySelector('ul');
let noteId = 0;
document.querySelector('button.add-note').addEventListener('click', () => {
    addNote(noteId, textarea.value, notes);
    noteId++;
    textarea.value = '';
    
    notes = getNotes(notes);
    // clear the ul
    ul.innerHTML = '';
    notes.forEach(note => {
        const li = document.createElement("li");
        li.innerHTML = note.content;
        ul.appendChild(li);
    });
});

document.querySelector('button.log-out').addEventListener('click', function(){logOutNotesFormatted(notes)});

*/
console.log(' ');





//CactusIO-interactive (Smart phone usage app) optional
let activities = [];
const usageLimit = 200;
let today = new Date();

function addActivity(date, activity, duration, arr){

    if(isNaN(duration) || typeof(duration) !== 'number'){
        console.log('Error.Duration should be a number.');
    }
    
    arr.push({'date': date || today.toLocaleDateString("en-US"), 'activity': activity, 'duration': duration});
}

function showStatus(arr, date){

    let statusString;
    let durationArray;

    if(date){

        let filteredArrayByOneDay = arr.filter((x) => x.date === date);
        durationArray = Array.from(filteredArrayByOneDay, x => x.duration);
    }
    else{
        durationArray = Array.from(arr, x => x.duration);
    }
    
    if(arr.length === 0){
        console.log('Add some activities before calling showStatus');
    }
    else{

        let amountOfUsage = durationArray.reduce((acc, val) => acc + val);
        if(amountOfUsage > usageLimit){
            console.log('You have reached your limit, no more smartphoning for you!');
        }
        else{
            statusString = `You have added ${durationArray.length} activities. They amount to ${amountOfUsage} min. of usage`;

            console.log(statusString);

            return statusString;
        }
    }
}

function calcMostTimeForOneApp(arr, date){

    let filteredArrayByOneDay;

    if(date){
        filteredArrayByOneDay = arr.filter(x => x.date === date);
    }

    let array = filteredArrayByOneDay || arr;  
 
  // let arr1 = array.map(function(item){//picks activity names ["Youtube", "Skype", "Youtube", "Google Chrome"]
  //   return item.activity;
  // });

  // let arr2 = new Set(arr1);// chooses unique values {"Youtube", "Skype", "Google Chrome"}

  // let uniqueValues = Array.from(arr2);//convert to an array ["Youtube", "Skype", "Google Chrome"]

    let uniqueValues = Array.from(new Set(array.map(function(item){
        return item.activity;
    })))

    let actDurArray = [];

    uniqueValues.forEach(function(x){
        actDurArray.push({'activity': x, 'duration': 0})
    })

    array.forEach(function(x){
        actDurArray.forEach(function(y){
            if(y.activity === x.activity){
                y.duration = y.duration + x.duration;
            }
        })
    })

    let sortedArrayByDuration = actDurArray.sort(function(a, b){
        return b.duration - a.duration;
    })

    let appName = sortedArrayByDuration[0].activity;
    let appTime = sortedArrayByDuration[0].duration;

    if(date){
        console.log(`${date}: Most time (${appTime} minutes) spended for ${appName} application.`);
    }
    else{
        console.log(`All the time: Most time (${appTime} minutes) spended for ${appName} application.`);
    }
    return appName;
}

addActivity('6/18/2019', 'Youtube', 30, activities);
addActivity('6/18/2019', 'Skype', 70, activities);
addActivity('23/7-18', 'Youtube', 60, activities);
addActivity('6/18/2019', 'Google Chrome', 50, activities);
addActivity(null, 'Google Chrome', 10, activities);
showStatus(activities);

calcMostTimeForOneApp(activities);
calcMostTimeForOneApp(activities, '6/18/2019');
















