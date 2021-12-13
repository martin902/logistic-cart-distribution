

const express = require("express");
const app = express();
app.use(express.static(__dirname));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/kalk.html");
});


const testFolder = __dirname;
// const testFolder = '/home/martin/Documents/project/build226/public/kalk';
const fs = require('fs');
console.log("__dirname", __dirname);
fs.readdir(testFolder, (err, files) => {
  files.forEach(file => {
    console.log(file);
  });
});

app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});


// const fs = require('fs')

// const folderName = '/'

// try {
//   if (!fs.existsSync(folderName)) {
//     fs.mkdirSync(folderName)
//   }
// } catch (err) {
//   console.error(err)
// }
