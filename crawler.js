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

  let dirTree = [];
  (() => {
    const rawData = read(origin);

    if (prop == "cheatsheets") {
      rawData.forEach((category, i) => {
        let fromPath = path.join(origin, category.name);
        let domainPath = domain + path.join(pathOnDomain, category.name);
        if (category.isDirectory()) {
          dirTree.push({ category: category.name, path: domainPath.replaceAll('\\', '/') });
          const data = read(fromPath);
          data.forEach((subCategory, subIndex) => {
            fromPath = path.join(origin, category.name, subCategory.name);
            domainPath = domain + path.join(pathOnDomain, category.name, subCategory.name);
            if (subCategory.isDirectory()) {
              const objectHandler = {
                name: subCategory.name,
                path: domainPath.replaceAll('\\', '/'),
              }

              if (!dirTree[i].subCategories) dirTree[i].subCategories = [];
              dirTree[i].subCategories.push(objectHandler);

              const data = read(fromPath);
              data.forEach((file) => {
                domainPath = domain + path.join(pathOnDomain, category.name, subCategory.name, file.name);
                if (file.isFile && file.name.match(/\.md/g)) {
                  const objectHandler = {
                    name: file.name,
                    path: domainPath.replaceAll('\\', '/'),
                  }
                  if (!dirTree[i].subCategories[subIndex].cheats) dirTree[i].subCategories[subIndex].cheats = [];
                  dirTree[i].subCategories[subIndex].cheats.push(objectHandler);
                }
              })

            }
          })
        }

      })
    } else {
      const data = read(origin);
      data.forEach((file)=>{
        let fromPath = path.join(origin, file.name);
        if (file.isFile() && file.name.match(/\.md/g)) {
          let domainPath = domain + path.join(pathOnDomain, file.name);
          dirTree.push({ name: file.name, path: domainPath.replaceAll('\\', '/') });
        }
      })
    }
  })();

  return dirTree;
}
// crawler('cheatsheets');
module.exports = {
  crawler
}