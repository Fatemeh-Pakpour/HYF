function translateOneByOne(boxNumber, target){
    return new Promise(resolve => {
        moveElement(document.querySelector(`li:nth-child(${boxNumber})`), {x: target.x, y: target.y})
        .then(() => {
            console.log(`Element ${boxNumber} has been moved`);
            resolve();
        });
    });
}

translateOneByOne(1, {x: 20, y: 300})
    .then(() => translateOneByOne(2, {x: 400, y: 300}))
    .then(() => translateOneByOne(3, {x: 400, y: 20}))


function translateAllAtOnce(){
    Promise.all([translateOneByOne(1, {x: 20, y: 300}), translateOneByOne(2, {x: 400, y: 300}), translateOneByOne(3, {x: 400, y: 20})])
    .then(() => { 
        console.log('all'); 
    });
}

//translateAllAtOnce();