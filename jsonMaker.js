
const fs = require('fs');

const { crawler } = require('./crawler');



function write(path, name, data) {
    fs.writeFile(`${__dirname}/${path}${name}`, data, (error)=>{
        if(error) {
            console.log(error);
        } else {
            console.log('File written successfully\n');
        }
    })
}

// function main() {
    // Home();
// }
const contributors = [
    {
        name: 'Sahand',
        username: 'sahand-dev',
        image: 'https://avatars.githubusercontent.com/u/89129079?s=100&v=4',
    },
    {
        name: 'Erfan',
        username: 'erfanmola',
        image: 'https://avatars.githubusercontent.com/u/31157052?s=100&v=4',
    },
    {
        name: 'Maryam',
        username: 'maryamshm',
        image: 'https://avatars.githubusercontent.com/u/80065344?s=100&v=4',
    },
    {
        name: 'Mehran',
        username: 'Mehranalam',
        image: 'https://avatars.githubusercontent.com/u/77109284?s=100&v=4',
    },
    {
        name: 'MohammadReza',
        username: 'mhshahmoradi',
        image: 'https://avatars.githubusercontent.com/u/88337261?s=100&v=4',
    },
    {
        name: 'Hamid',
        username: 'hamidreza01',
        image: 'https://avatars.githubusercontent.com/u/97837767?s=100&v=4',
    },
    {
        name: 'Sahand',
        username: 'sahand-dev',
        image: 'https://avatars.githubusercontent.com/u/89129079?v=4',
    },
];
const Home = ()=>{
    const cheatsheets = crawler('cheatsheets');

    let categories = cheatsheets.map((object)=>{
        let data = object;
        delete data.subCategories;
        return data;
    });
    
    const dictionary = crawler('dictionary');
    const json = {categories: categories, dictionary: dictionary, contributors: contributors};
    
    const result = JSON.stringify(json);
    write('./', 'index.json', result);
}


// console.log(crawler("dictionary"));

(()=>{
    Home();
})();