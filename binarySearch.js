let arrayOfText = require('./index.js').textByLine;

function binarySearchForValue(array,value){
    let start = 0;
    let end = array.length - 1;
    let middleIndex = Math.floor((start + end) / 2);

    while(start < end && array[middleIndex] !== value){
        if(value > array[middleIndex]){
            start = middleIndex + 1;
        } else {
            end = middleIndex - 1;
        };
        middleIndex = Math.floor((start + end) / 2);
    };
    if(array[middleIndex] === value){
        return `${value} has been found`;
    } else if(array[middleIndex] !== value){
        return `${value} has not been found`;
    };
};

function generateRandomSearch(array){
    let wordsToSearchFor = [];
    for(i=0;i<10;i++){
        let randomNumber = Math.random() * 466552;
        let roundedRandomNumber = Math.round(randomNumber);
        wordsToSearchFor.push(array[roundedRandomNumber]);
    };
    return wordsToSearchFor;
};

function startSearch(array){
    let randomWords = generateRandomSearch(array);
    let results = [];
    for(i=0;i < randomWords.length;i++){
        let valueToCheck = randomWords[i];
        results.push(binarySearchForValue(array,valueToCheck));
        console.log(results[i]);
    };
};

startSearch(arrayOfText.sort());