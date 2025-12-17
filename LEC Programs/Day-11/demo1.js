const fs = require('fs');

fs.readFile("myfile.txt", (error, data)=>{
    if(error){
        console.log(error);
    }
    else{
        console.log(data.toString());
    }
});

console.log("after reading file");

/*
fs module → allows working with the file system in Node.js
fs.readFile() → reads the file asynchronously (non-blocking).
It takes the file name and a callback function with two parameters:
error → holds error info if file not found or unreadable.
data → contains the file content in binary form (Buffer).
.toString() → converts the binary data into readable text.
console.log("after reading file") runs immediately, before the file is finished reading — showing asynchronous behavior.
 */

// output:
// after reading file
// this is my text file