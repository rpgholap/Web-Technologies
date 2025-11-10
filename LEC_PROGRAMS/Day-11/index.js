import { createServer } from "http";
const server = createServer((request, response) => {
  response.write("Hello World");
  response.end();
});

server.listen(3000);
