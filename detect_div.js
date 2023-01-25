const fs = require('fs');
const path = require('path');

// const searchFolder = "/Users/edwin/work_risedle/risedle-from-git-hub/web/app";
// console.log("process.argv",process.argv[2])
const searchFolder = process.argv[2]
if (searchFolder == null){
    console.log("input param - folder target")
    console.log("ex: node detect_div.js /data")
    return
}
const regex = new RegExp(/<[^>]+><\/[^>]+>/g);


searchFiles(searchFolder);

function searchFiles(folder) {
    fs.readdir(folder, (err, files) => {
        if (err) {
            console.log(err);
            return;
        }
        files.forEach(file => {
            let filePath = path.join(folder, file);
            fs.lstat(filePath, (err, stats) => {
                if (err) {
                    console.log(err);
                    return;
                }
                if (stats.isDirectory()) {
                    searchFiles(filePath);
                } else {
                    fs.readFile(filePath, 'utf8', (err, data) => {
                        if (err) {
                            console.log(err);
                            return;
                        }
                        let matches = data.match(regex);
                        if (matches) {
                            console.log(`Matches in file: ${filePath}`, matches.length);
                            matches.forEach(match => {
                                // console.log(match);
                                // console.log(`Matches in file: ${filePath} - 1`);
                            });
                        }
                    });
                }
            });
        });
    });
}
// console.log("process.argv 0",process.argv[0])
// console.log("process.argv 1",process.argv[1])
// console.log("process.argv",process.argv[2])