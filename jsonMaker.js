
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
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
    {
        firstColor: '#FFDDBD',
        secondColor: '#FFAA5B'
    },
    {
        firstColor: '#C0D9FF',
        secondColor: '#5096FF'
    },
    {
        firstColor: '#FFC0C0',
        secondColor: '#FF7474'
    },
    {
        firstColor: '#F9CEFF',
        secondColor: '#E963FD'
    },
    {
        firstColor: '#80FAE3',
        secondColor: '#12BFA0'
    },
];


const main = () => {
    const gradientGenerator = (firstColor, secondColor, degree = 180) =>{
        const gradient = `background: linear-gradient(${degree}deg, ${secondColor} 0%, ${firstColor} 50%, ${secondColor} 100%);`;
        return gradient;
    }



    // categories page content 
    (() => {
        const rawCheatsheets = crawler('cheatsheets');
        rawCheatsheets.forEach((category, index) => { 
            delete category.subCategories;
            // category.gradient = gradientGenerator(colors[index].firstColor, colors[index].secondColor);
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



    (() => {
        const rawDictionary = crawler('dictionary');
        rawDictionary.forEach((data)=>{
            delete data.path;
        })
        write('./content/dictionary/', 'index.json', JSON.stringify(rawDictionary));
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
    write('./content/', 'index.json', JSON.stringify(json));

}


(() => {
    Home();
    main();
})();
