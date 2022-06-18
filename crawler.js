const fs = require('fs');
const path = require('path');


function crawler(prop) {
  const origin = __dirname + '/content/' + prop;
  // const domain = 'https://cheatsheet.developix.ir/API/content'
  const domain = 'https://sahand-dev.github.io/docs/content/'

  const read = (path) => {
    return fs.readdirSync(path, { withFileTypes: true });
  }

  let dirTree = [];
  (() => {
    const rawData = read(origin);
  
    rawData.forEach((category, i) => {
      let fromPath = path.join(origin, category.name);
      let domainPath = path.join(domain, category.name);
      if (prop == "cheatsheets") {
        if (category.isDirectory()) {
          dirTree.push({ category: category.name, path: domainPath });
          const data = read(fromPath);
          data.forEach((subCategory, subIndex) => {
            fromPath = path.join(origin, category.name, subCategory.name);
            domainPath = path.join(domain, category.name, subCategory.name);
            if (subCategory.isDirectory()) {
              const objectHandler = {
                name: subCategory.name,
                path: domainPath,
              }

              if (!dirTree[i].subCategories) dirTree[i].subCategories = [];
              dirTree[i].subCategories.push(objectHandler);

              const data = read(fromPath);
              data.forEach((file) => {

                if (file.isFile && file.name.match(/\.md/g)) {
                  const objectHandler = {
                    name: file.name,
                    path: domainPath,
                  }
                  if (!dirTree[i].subCategories[subIndex].cheats) dirTree[i].subCategories[subIndex].cheats = [];
                  dirTree[i].subCategories[subIndex].cheats.push(objectHandler);
                }
              })

            }
          })
        }

      } else {
        const files = category; //Because it's supposed to take the file, not the category
        if (files.isFile() && files.name.match(/\.md/g)) {
          dirTree.push({ name: category.name, path: fromPath });
        }
      }
    })
  })();

  return dirTree;
}
// crawler('cheatsheets');
module.exports = {
  crawler
}