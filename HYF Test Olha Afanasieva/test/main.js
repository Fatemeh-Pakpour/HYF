//1. Programming Basics

function printNumbers(a, b) {
    for (let i = a; i <= b; i++) {

        if (i % 30 === 0) {            
            console.log("This is divisible by 30");
            if (i % 10 === 0) {
                console.log("Jackpot!");
            }
        }
        else if (i % 10 === 0) {
            console.log("This is divisible by 10");
        }
        else {
            console.log(i);
        }
    }
}

printNumbers(100, 200);




// 2. DOM manipulation

const changeBackgroundColorButton = document.createElement('button');
changeBackgroundColorButton.innerHTML = 'Change background color';
document.body.appendChild(changeBackgroundColorButton);

changeBackgroundColorButton.addEventListener('click', () => {
    document.body.style.backgroundColor = getRandomColor();
})

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}




// 3. Async API calls
const apiTask3 = 'https://reqres.in/api/users';

function showUsersName(api) {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            const listOfUsers = data.data;
            listOfUsers.forEach(item => {
                const users = document.getElementById('users');
                const li = document.createElement('li');
                li.innerHTML = `${item.first_name} ${item.last_name}`;
                users.appendChild(li);
            })
        })
}

showUsersName(apiTask3);