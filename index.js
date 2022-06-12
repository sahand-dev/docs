var fs = require('fs');
var path = require('path');
// In newer Node.js versions where process is already global this isn't necessary.
var process = require("process");

var moveFrom = __dirname + '/content/cheatsheets/web/html/tags';
// var moveTo = "/home/mike/dev/node/sonar/tome"

// Loop through all the files in the temp directory
fs.readdir(moveFrom, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }

//   files.forEach(function (file) {

    console.log(files);

    // Make one pass and make the file complete
    // var fromPath = path.join(moveFrom, file);
    // var toPath = path.join(moveTo, file);

    // fs.stat(fromPath, function (error, stat) {
    //   if (error) {
    //     console.error("Error stating file.", error);
    //     return;
    //   }

    //   if (stat.isFile())
    //     console.log("'%s' is a file.", fromPath);
    //     // console.log('f');
    //   else if (stat.isDirectory()){
    //     console.log(file);
    //     // console.log('dir');
    //     files.forEach((file)=>{
    //         var fromPath = path.join(moveFrom, file);
    //         console.log(fromPath);
    //         fs.stat(fromPath, function (error, stat) {
    //             if (error) {
    //               console.error("Error stating file.", error);
    //               return;
    //             }
          
    //             if (stat.isFile())
    //               console.log(file);
    //               // console.log('f');
    //             else if (stat.isDirectory()){
    //               console.log(file);
    //               // console.log('dir');
    //             }
                  
    //           });
            
    //     })
    //   }
        
    // });
//   });
});
