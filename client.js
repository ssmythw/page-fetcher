const request = require("request");
const fs = require("fs");
var readline = require("readline");
const arguments = process.argv.slice(2, process.argv.length);
const validURL =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// this code takes in the URL and a local file path as command line arguments
// it should download the response from the server to the path given in as an argument
//

if (!validURL.test(arguments[0])) {
  console.log("Invalid URL, please specify a valid URL");
  process.exit();
}

const writeFile = (filePath, fileContent) => {
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) console.log(err);
    else {
      var stats = fs.statSync("index.html");
      console.log(
        `Downloaded and saved ${stats.size} bytes to ${arguments[1]}`
      );
    }
  });
};

request(arguments[0], (error, response, body) => {
  if (fs.existsSync("index.html")) {
    rl.question(
      "That file already exists, please specify a path/name for the file: ",
      (path) => {
        writeFile(path, body);
        process.exit();
      }
    );
  } else {
    writeFile(arguments[1], body);
    process.exit();
  }
});
