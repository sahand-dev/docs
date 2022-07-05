
const fs = require('fs');
const { crawler } = require('./crawler');






function write(path, name, data) {
    fs.writeFile(`${__dirname}/${path}${name}`, data, (error) => {
        if (error) {
            console.log('\nThe operation encountered an error:')
            console.log(error.message.replace('ENOENT: ', '') + '\n');
        } else {
            console.log(`File "${name}" written successfully on ${path}\n`);
        }
    })
}
function readFile(path) {
    return fs.readFileSync(path, {encoding: 'utf-8'});
}

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
const colors = [
    {
        firstColor: '#6c2cf5',
        secondColor: '#d550e6'
    },
    {
        firstColor: '#fde31d',
        secondColor: '#b43a65'
    },
    {
        firstColor: '#8000ff',
        secondColor: '#e100ff'
    },
    {
        firstColor: '#6c2cf5',
        secondColor: '#d550e6'
    },
    {
        firstColor: '#6c2cf5',
        secondColor: '#d550e6'
    },
    {
        firstColor: '#6c2cf5',
        secondColor: '#d550e6'
    },
]
const main = () => {
    const gradientGenerator = (firstColor, secondColor, degree = 180) =>{
        const gardient = `background: linear-gradient(${degree}deg, ${firstColor} 0%, ${secondColor} 50%, ${secondColor} 100%);`;
        return gardient;
    }



    // categories page content 
    (() => {
        const rawCheatsheets = crawler('cheatsheets');
        rawCheatsheets.forEach((category, index) => { 
            delete category.subCategories;
            category.gardient = gradientGenerator(colors[index].firstColor, colors[index].secondColor);
        });

        write('./content/cheatsheets/', 'index.json', JSON.stringify(rawCheatsheets));
    })();

    // cheatsheets page content 
    (() => {
        const rawCheatsheets = crawler('cheatsheets');
        rawCheatsheets.forEach((category) => {
            delete category.icon;
            write(category.path + '/', 'index.json', JSON.stringify(category));
        });
    })();



    // (() => {
    //     const rawDictionary = crawler('dictionary');
    //     rawDictionary.forEach((data)=>{
    //         console.log(data.path);
    //         console.log(readFile(data.path));
    //     })
    //     write('./content/dictionary/', 'index.json', JSON.stringify(rawDictionary));
    // })();

    (() => {
        const rawDictionary = crawler('dictionary');
        const rawCheatsheets = crawler('cheatsheets');
        rawCheatsheets.forEach((category) => delete category.subCategories);
        write('./content/', 'index.json', JSON.stringify({cheatsheets: rawCheatsheets, dictionary:rawDictionary}));
    })();
}


// Home page content
const Home = () => {
    const rawCheatsheets = crawler('cheatsheets');
    const rawDictionary = crawler('dictionary');

    let categories = rawCheatsheets.filter((item, index) => index < 6).map((object) => {
        let data = object;
        delete data.subCategories;
        return data
    });
    const dictionary = rawDictionary.filter((item, index) => index < 6);

    const json = { categories: categories, dictionary: dictionary, contributors: contributors };
    write('./', 'index.json', JSON.stringify(json));
}


(() => {
    Home();
    main();
})();
