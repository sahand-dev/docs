const fs = require('fs');
const path = require('path');

function crawler(prop) {
  const origin = __dirname + '/content/' + prop;
  // const domain = 'https://cheatsheet.developix.ir/API/content'
  const domain = 'https://sahand-dev.github.io/docs/';
  const pathOnDomain = 'content/' + prop;

  const read = (path) => {
    return fs.readdirSync(path, { withFileTypes: true });
  }
  const readFile = (path) => {
    return fs.readFileSync(path, { encoding: 'utf-8' });
  }

  let dirTree = [];
  (() => {
    const rawData = read(origin);

    if (prop === "cheatsheets") {

      // Listing Categories
      rawData.filter((item) => item.isDirectory())
        .forEach((category, index) => {
          const fromPath = path.join(origin, category.name);
          const domainPath = path.join(domain, pathOnDomain, category.name);
          dirTree.push({ id: index + 1, name: category.name, address: domainPath, path: path.join('content', 'cheatsheets', category.name) });

          const rawData = read(fromPath);



          // Listing subCategories
          rawData.filter((item) => item.isDirectory())
            .forEach((subCategory, subIndex) => {
              const fromPath = path.join(origin, category.name, subCategory.name);
              const domainPath = path.join(domain, pathOnDomain, category.name, subCategory.name);
              if (!dirTree[index].subCategories) dirTree[index].subCategories = [];
              dirTree[index].subCategories.push({ id: subIndex + 1, name: subCategory.name, address: domainPath, path: path.join('content', 'cheatsheets', category.name, subCategory.name) });


              // Listing Markdown files
              const rawData = read(fromPath);
              rawData.filter((item) => item.isFile() && item.name.match(/\.md/g))
                .forEach((file) => {
                  if (!dirTree[index].subCategories[subIndex].cheats) dirTree[index].subCategories[subIndex].cheats = [];
                  dirTree[index].subCategories[subIndex].cheats.push(file.name);
                });


              // Persian name for subCategories
              rawData.filter((item) => item.isFile() && item.name.match(/details.json/g))
                .forEach((file) => {
                  const data = JSON.parse(readFile(fromPath + '/' + file.name));
                  dirTree[index].subCategories[subIndex] = {
                    ...dirTree[index].subCategories[subIndex],
                    lebel: data.label,
                  };
                  

                })
            });



          // Persian name and icon for category cards
          rawData.filter((item) => item.isFile() && item.name.match(/details.json/g))
            .forEach((file) => {
              const data = JSON.parse(readFile(fromPath + '/' + file.name));
              dirTree[index] = {
                ...dirTree[index],
                lebel: data.label,
                description: data.description,
                // icon: data.icon
              }
            });


        });



    } else if (prop === 'dictionary') {
      const data = read(origin);

      // Listing sictionary markdown files
      data.filter((item) => item.isFile() && item.name.match(/\.md/g))
        .forEach((file, index) => {
          let domainPath = domain + path.join(pathOnDomain, file.name);
          dirTree.push({ id: index + 1, name: file.name, path: domainPath.replaceAll('\\', '/') });
        });
    }
  })();
  
  return dirTree;
}

module.exports = {
  crawler
}