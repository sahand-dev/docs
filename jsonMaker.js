
const fs = require('fs');

const { crawler } = require('./crawler');


const cheatsheets = JSON.stringify(crawler('cheatsheets')); 

fs.writeFile(__dirname + '/index.json', cheatsheets, (error)=>{
    if(error) {
        console.error(error);
    } else {
        console.log('File written successfully\n');
    }
})

// console.log(crawler("dictionary"));