// fs is Node.js’s built-in file system module.
const fs = require("fs");

fs.writeFile("myfile.txt", "this is my text file", () => {
  console.log("write operation completed");
}); // async

console.log("after writing into file");

/*
fs.writeFile() is an asynchronous method that writes data to a file.
"myfile.txt" → filename to create or overwrite.
"this is my text file" → content to write.
Callback → runs after writing completes.
console.log("after writing into file") executes before the file operation completes, showing the asynchronous nature of Node.js.
*/

// output:
// after writing into file
// write operation completed

const fs = require("fs");

fs.writeFileSync("myfile.txt", "this is my text file");
console.log("write operation completed"); // Executes only after the file is written
console.log("after writing into file");

/*
fs.writeFileSync() is the synchronous version of fs.writeFile().
It blocks the execution of further code until the file writing is fully complete.
This means the code runs in order, not asynchronously.

*/

/*
Method	Type --> Behavior --> Code Flow
fs.writeFile()	 --> Asynchronous	 --> Non-blocking	 --> Next code runs immediately
fs.writeFileSync()	 --> Synchronous	 --> Blocking	 --> Waits until task completes

*/
