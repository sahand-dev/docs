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
    const rawData = read(origin).sort((a, b) => fs.statSync(origin + '/' + a.name).ctime.getTime() - fs.statSync(origin + '/' + b.name).ctime.getTime());

    if (prop === "cheatsheets") {

      // Listing Categories
      rawData.filter((item) => item.isDirectory())
        .forEach((category, index) => {
          const fromPath = path.join(origin, category.name);
          const domainPath = path.join(domain, pathOnDomain, category.name);
          dirTree.push({ id: index + 1, name: category.name, address: domainPath, path: path.join('content', 'cheatsheets', category.name) });

          const rawData = read(fromPath).sort((a, b) => fs.statSync(fromPath + '/' + a.name).ctime.getTime() - fs.statSync(fromPath + '/' + b.name).ctime.getTime());

          // Listing subCategories
          rawData.filter((item) => item.isDirectory())
            .forEach((subCategory, subIndex) => {
              const fromPath = path.join(origin, category.name, subCategory.name);
              const domainPath = path.join(domain, pathOnDomain, category.name, subCategory.name);
              if (!dirTree[index].subCategories) dirTree[index].subCategories = [];
              dirTree[index].subCategories.push({ id: subIndex + 1, name: subCategory.name, address: domainPath, path: path.join('content', 'cheatsheets', category.name, subCategory.name) });


              // Listing Markdown files
              const rawData = read(fromPath).sort((a, b) => fs.statSync(fromPath + '/' + a.name).ctime.getTime() - fs.statSync(fromPath + '/' + b.name).ctime.getTime());

              rawData.filter((item) => item.isDirectory())
                .forEach((folder, folderIndex) => {
                  const fromPath = path.join(origin, category.name, subCategory.name, folder.name);
                  const rawData = read(fromPath).sort((a, b) => fs.statSync(fromPath + '/' + a.name).ctime.getTime() - fs.statSync(fromPath + '/' + b.name).ctime.getTime());
                  if(!dirTree[index].subCategories[subIndex].cheats) dirTree[index].subCategories[subIndex].cheats = [];
                  rawData.filter((item)=> item.isFile() && item.name.match(/\.md/g))
                    .forEach((file)=>{
                      const domainPath = path.join(domain, pathOnDomain, category.name, subCategory.name, folder.name, file.name);
                      dirTree[index].subCategories[subIndex].cheats.push({name: file.name, address: domainPath})
                    });


                  rawData.filter((item)=> item.isFile() && item.name.match(/details.json/g))
                    .forEach((file)=>{
                      const data = JSON.parse(readFile(fromPath + '/' + file.name));
                      // console.log(dirTree[index].subCategories[subIndex].cheats[folderIndex]);
                      dirTree[index].subCategories[subIndex].cheats[folderIndex] = {
                        ...dirTree[index].subCategories[subIndex].cheats[folderIndex],
                        label: data.label,
                        description: data.description,
                        icon: data.icon
                      };
                    });
                });


              // Persian name for subCategories
              rawData.filter((item) => item.isFile() && item.name.match(/details.json/g))
                .forEach((file) => {
                  const data = JSON.parse(readFile(fromPath + '/' + file.name));
                  dirTree[index].subCategories[subIndex] = {
                    ...dirTree[index].subCategories[subIndex],
                    label: data.label,
                  };
                });
              // rawData.filter((item) => item.isFile() && item.name.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i))
              //   .forEach((file) => {
              //     const domainPath = path.join(domain, pathOnDomain, category.name, subCategory.name, file.name);
              //     dirTree[index].subCategories[subIndex] = {
              //       ...dirTree[index].subCategories[subIndex],
              //       header_background: domainPath,
              //     };
              //   });
            });



          // Persian name and icon for category cards
          rawData.filter((item) => item.isFile() && item.name.match(/details.json/g))
            .forEach((file) => {
              const data = JSON.parse(readFile(fromPath + '/' + file.name));
              dirTree[index] = {
                ...dirTree[index],
                label: data.label,
                description: data.description,
                // icon: data.icon
                icon: "<svg width=\"44\" height=\"44\" viewBox=\"0 0 44 44\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n<path d=\"M22 34.8333L34.8333 22L40.3333 27.5L27.5 40.3333L22 34.8333Z\" stroke=\"#FF7777\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M32.9998 23.8333L30.2498 10.0833L3.6665 3.66663L10.0832 30.25L23.8332 33L32.9998 23.8333Z\" stroke=\"#FF7777\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M3.6665 3.66663L17.5742 17.5743\" stroke=\"#FF7777\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n<path d=\"M20.1667 23.8333C22.1917 23.8333 23.8333 22.1917 23.8333 20.1667C23.8333 18.1416 22.1917 16.5 20.1667 16.5C18.1416 16.5 16.5 18.1416 16.5 20.1667C16.5 22.1917 18.1416 23.8333 20.1667 23.8333Z\" stroke=\"#FF7777\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"/>\n</svg>\n",
              }
            });

          // Cheatsheets page header background
          // rawData.filter((item) => item.isFile() && item.name.match(/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i))
          //   .forEach((file) => {
          //     const domainPath = path.join(domain, pathOnDomain, category.name, file.name);
          //     dirTree[index] = {
          //       ...dirTree[index],
          //       header_background: domainPath,
          //     }
          //   });


        });



    } else if (prop === 'dictionary') {
      const data = read(origin);

      // Listing dictionary markdown files
      data.filter((item) => item.isFile() && item.name.match(/\.md/g))
        .forEach((file, index) => {
          let domainPath = domain + path.join(pathOnDomain, file.name);
          const fromPath = path.join(__dirname, 'content', 'dictionary', file.name);
          dirTree.push({ id: index + 1, name: file.name, address: domainPath.replaceAll('\\', '/'), path: fromPath });
        });
    }
  })();
  return dirTree;
}

module.exports = {
  crawler
}