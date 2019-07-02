let arrayOfText = require('./index.js').textByLine;

function linearSearchForValue(array,value){
    for(j = 0; j < value.length; j++){
        for(i = 0; i < array.length; i++){
            if(array[i] === value[j]){
                console.log(`${array[i]} found in list at index ${i}`);
            };
        };
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
    return linearSearchForValue(array,randomWords);
};

startSearch(arrayOfText);
