const fs = require('fs');
const text = fs.readFileSync("./words.txt").toString('utf-8');

let textByLine = text.split("\n");

exports.textByLine = textByLine;