//Flight booking fullname function

function getFullname (firstname, surname, useFormalName){
    if (useFormalName){
        return `Lord ${firstname || ''} ${surname || ''}`;
    }
    return `${firstname} ${surname}`;
}

fullname1 = getFullname ('Benjamin', 'Hughes', true);
fullname2 = getFullname ('Olha', 'Afanasieva', false);

console.log(fullname1);
console.log(fullname2);



//Event application

days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
];

function getEventWeekday(numberOfDay){
    let fullDate = new Date();
    let todayDay = fullDate.getDay();
    let eventDay = numberOfDay + todayDay;

    if(eventDay > 7){
        eventDay = eventDay % 7;
    }

    console.log(days[eventDay]);
    days[eventDay];
}

getEventWeekday(8);



//Weather wear

function chooseTheClothes(temperature){
    let str = '';
    if(temperature <= 0){
        str = 'warm jacket, warm hat and warm boots';
    }else if(temperature <= 13){
        str = 'jacket and boots';
    }else if(temperature <= 20){
        str = 'light jacket and sneakers';
    }else{
        str = 't-shirt, shorts and slippers'
    }

    console.log(str);
    return str;
}

chooseTheClothes(-2);
chooseTheClothes(0);
chooseTheClothes(5);
chooseTheClothes(13);
chooseTheClothes(19);
chooseTheClothes(22);



//Student manager

const class07Students = [];
function addStudentToClass(studentName) {
    
    if(studentName === 'Queen'){
        class07Students.push(studentName);
    }
    else if(class07Students.indexOf(studentName) !== -1){
        console.log(`Student ${studentName} is already in the class`)
    }
    else if((class07Students.length < 6) && studentName !== ''){
        class07Students.push(studentName);
    }
    else{
        console.log("Cannot add more students to class 07");
    }
}

function getNumberOfStudents() {
    console.log(class07Students);
    console.log(class07Students.length);
    return class07Students.length;
}

addStudentToClass('John');
addStudentToClass('Maria');
addStudentToClass('Alex');
addStudentToClass('Maria');
addStudentToClass('');
addStudentToClass('Alex');
addStudentToClass('Artik');
addStudentToClass('Olha');
addStudentToClass('Anna');
addStudentToClass('Katrin');
addStudentToClass('Peter');
addStudentToClass('Maria');
addStudentToClass('Queen');

getNumberOfStudents();



//Candy helper

let boughtCandyPrices =[];
let candys = {
    'Sweet': 0.5,
    'Chocolate': 0.7,
    'Toffee': 1.1,
    'Chewing-gum': 0.03
}

//Using If Else/ Switch statements
function addCandy(candyType, weight){
    let price = 0;

    // if (candyType === 'Sweet'){
    //     price = 0.5;
    // } else if(candyType === 'Chocolate'){
    //         price = 0.7;
    // } else if(candyType === 'Toffee'){
    //     price = 1.1;
    // } else if(candyType === 'Chewing-gum'){
    //     price = 0.03;
    // }

    switch (candyType){
        case 'Sweet': 
            price = 0.5;
            break;
        case 'Chocolate': 
            price = 0.7;
            break;
        case 'Toffee': 
            price = 1.1;
            break;    
        default: 
            price = 0.03;
    }
    

    boughtCandyPrices.push(price * weight);
}

//// ANOTHER SOLUTION - Using object candyTypes
// function addCandy(candyType, weight){
//     boughtCandyPrices.push(candys[candyType] * weight);
// }

addCandy('Sweet', 20);
addCandy('Chocolate', 10);
addCandy('Toffee', 20);
addCandy('Chewing-gum', 100);
console.log(boughtCandyPrices);

let amountToSpend = Math.random() * 100;
console.log(amountToSpend);

function canBuyMoreCandy(){
    let addedAmount = 0;
    for(let i = 0; i < boughtCandyPrices.length; i++){
        addedAmount += boughtCandyPrices[i];
    }

    ////using reduce
    //let addedAmount = boughtCandyPrices.reduce((total, value) => total + value);

    if (addedAmount > amountToSpend){
        console.log('Enough candy for you!');
        return false;
    }
    console.log('You can buy more, so please do!');
}

canBuyMoreCandy();