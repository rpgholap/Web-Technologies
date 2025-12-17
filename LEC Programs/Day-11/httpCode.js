const http = require("http");

const server = http.createServer((request, response) => {
  response.write("Hello World");
  response.end();
});

server.listen(3000);

/*
http module → built-in Node.js module used to create web servers.
http.createServer() → creates an HTTP server that handles incoming requests.
(request, response) → callback function runs every time a client (like a browser) sends a request.
response.write("Hello World") → sends data to the browser.
response.end() → ends the response (must be called to complete it).
server.listen(4500) → starts the server on port 4500.
*/



// // npm init
