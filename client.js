const request = require("request");
const fs = require("fs");
const arguments = process.argv.slice(2, process.argv.length);

// this code takes in the URL and a local file path as command line arguments
// it should download the response from the server to the path given in as an argument
//

request(arguments[0], (error, response, body) => {
  fs.writeFile(arguments[1], body, (err) => {
    if (err) console.log(err);
    else {
      var stats = fs.statSync("index.html");
      console.log(stats.size);
      console.log(
        `Downloaded and saved ${stats.size} bytes to ${arguments[1]}`
      );
    }
  });
});
