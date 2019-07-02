let arrayOfText = require('./index.js').textByLine;

function binarySearchForValue(array,value){
    while(array.length > 1){
        let middleIndex = Math.round(array.length / 2);
        let middleIndexValue;
        let checkFirstLetter = checkIfFirstLetterIsCapitalized(value);
        let reducedArray;

        console.log(`VALUE TO LOOK FOR: ` + value)
        console.log(`MIDDLE VALUE: ` + array[middleIndex])

        if(checkFirstLetter == true){
            middleIndexValue = capitalizeFirstLetter(array[middleIndex]);
        } else {
            middleIndexValue = decapitalizeFirstLetter(array[middleIndex]);
        };

        if(middleIndexValue === value){
            return `${value} found at index ${middleIndex}`;
        } else if(value > middleIndexValue){
            console.log(`${value} is greater than ${middleIndexValue}`)
            reducedArray = array.splice(middleIndex,array.length);
            binarySearchForValue(reducedArray,value);
        } else if(value < middleIndexValue){
            console.log(`${value} is less than ${middleIndexValue}`)
            reducedArray = array.splice(0,middleIndex);
            binarySearchForValue(reducedArray,value);
        };
    };
};
function generateRandomSearch(array){
    let wordsToSearchFor = [];
    for(i=0;i<1;i++){
        let randomNumber = Math.random() * 466552;
        let roundedRandomNumber = Math.round(randomNumber);
        wordsToSearchFor.push(array[roundedRandomNumber]);
    };
    return wordsToSearchFor;
};

function checkIfFirstLetterIsCapitalized(stringToCheck){
    let check = /[A-Z]/.test(stringToCheck);
    return check == true ? true : false;
};

function capitalizeFirstLetter(stringToCapitalize){
    return stringToCapitalize.charAt(0).toUpperCase() + stringToCapitalize.slice(1);
};
function decapitalizeFirstLetter(stringToDecapitalize){
    return stringToDecapitalize.charAt(0).toLowerCase() + stringToDecapitalize.slice(1);
};

function startSearch(array){
    let randomWords = generateRandomSearch(array);
    return binarySearchForValue(array,randomWords);
};

startSearch(arrayOfText);