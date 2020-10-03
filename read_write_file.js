import fs from "fs";
import readline from "readline";
import Stream from "stream";

/* 
    Read from a 'fileName'
    Since readline interface does not provide error handling in 'on' event methods,
    we need to check the error handling from 'createReadStream' for file related events
*/
function readFromFile(fileName) {
  return new Promise((resolve, reject) => {
    // create a read stream
    const instream = fs.createReadStream(fileName);
    instream.on("error", () => {
      reject("File does not exist");
    });

    const outstream = new Stream();

    // readline interface for reading the file line-by-line
    const rl = readline.createInterface(instream, outstream);

    let customers = [];
    rl.on("line", (line) => {
      customers.push(JSON.parse(line));
    });

    rl.on("close", () => {
      resolve(customers);
    });
  });
}

/* 
    Write stream to 'fileName'
*/
function writeToFile(invitedCustomers, fileName) {
  return new Promise((resolve, reject) => {
    if (invitedCustomers.length === 0) {
      reject("There are no customers to write");
    }

    // create a write stream
    const writeStream = fs.createWriteStream(fileName);

    writeStream.on("error", () => {
      reject("File does not exist");
    });
    for (let i = 0; i < invitedCustomers.length; i++) {
      writeStream.write(`${JSON.stringify(invitedCustomers[i])} \n`);
    }

    resolve(`Written to ${fileName}`);
  });
}

// export the read and write file methods
export { readFromFile, writeToFile };
