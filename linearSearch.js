let arrayOfText = require('./index.js').textByLine;
const importTimer = require('./Timer.js');

function linearSearchForValue(array,value){
    let j = 0;
    while(array[j] !== value && j < array.length){
        j++;
    };
    if(array[j] === value){
        return `${value} found in list`;
    } else {
        return `${value} was not found in list`;
    }
};

function generateRandomSearch(array){
    let wordsToSearchFor = [];
    for(i=0;i<50000;i++){
        let randomNumber = Math.random() * 466552;
        let roundedRandomNumber = Math.round(randomNumber);
        wordsToSearchFor.push(array[roundedRandomNumber]);
    };
    return wordsToSearchFor;
};

function startSearch(array){
    let randomWords = generateRandomSearch(array);
    let results = [];
    let timer = new importTimer.timerClass();
    timer.setStart();
    for(i=0;i < randomWords.length;i++){
        let valueToCheck = randomWords[i];
        results.push(linearSearchForValue(array,valueToCheck));
    };
    timer.setEnd();
    console.log(timer.getStringReport());
};

startSearch(arrayOfText);
