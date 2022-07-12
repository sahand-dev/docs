
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
    });
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

const subCategoryColors = [
    {
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
    {
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
    {
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
    {
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
    {
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
    {
        firstColor: '#EBC2FF',
        secondColor: '#D37AFF'
    },
]
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

const gradientGenerator = (firstColor, secondColor, degree = 180) =>{
    return `background-image: linear-gradient(${degree}deg, ${secondColor} 0%, ${firstColor} 50%, ${secondColor} 100%);`;
}
const boxShadowGenerator = (color)=>{
    return `box-shadow: 0px 4px 8px ${color};`
}

const main = () => {



    // categories page content 
    (() => {
        const rawCheatsheets = crawler('cheatsheets');
        let counter = -1;
        rawCheatsheets.forEach((category, index) => { 
            if(counter >= 5) counter = -1;
            counter++;
            delete category.subCategories;
            delete category.path;
            category.color = colors[counter].secondColor;
            category.gradient = gradientGenerator(colors[counter].firstColor, colors[counter].secondColor);
            category.shadow = boxShadowGenerator(colors[counter].firstColor);
        });

        write('./content/cheatsheets/', 'index.json', JSON.stringify(rawCheatsheets));
    })();

    // cheatsheets page content 
    (() => {
        const rawCheatsheets = crawler('cheatsheets');
        let counter = -1;
        rawCheatsheets.forEach((category, index) => {
            if(counter >= 5) counter = -1;
            counter++;
            delete category.icon;
            let subCounter = -1;
            category.subCategories.forEach((subCategories)=>{
                if(subCounter >= 5) subCounter = -1;
                subCounter++;
                subCategories.header_background = gradientGenerator(subCategoryColors[subCounter].firstColor, subCategoryColors[subCounter].secondColor);
            });
            category.header_background = gradientGenerator(colors[counter].firstColor, colors[counter].secondColor);
            write(category.path + '/', 'index.json', JSON.stringify(category));
        });

    })();



    (() => {
        const rawDictionary = crawler('dictionary');
        rawDictionary.forEach((data)=>{
            delete data.path;
        });

        write('./content/dictionary/', 'index.json', JSON.stringify(rawDictionary));
    })();
}


// Home page content
const Home = () => {
    const rawCheatsheets = crawler('cheatsheets');
    const rawDictionary = crawler('dictionary');

    let categories = rawCheatsheets.filter((_, index) => index < 6).map((object, index) => {
        let data = object;
        object.gradient = gradientGenerator(colors[index].firstColor, colors[index].secondColor);
        object.shadow = boxShadowGenerator(colors[index].firstColor);
        delete data.subCategories;
        object.color = colors[index].secondColor;

        
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
