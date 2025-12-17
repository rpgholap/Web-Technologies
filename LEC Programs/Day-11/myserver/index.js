import {createServer} from 'http';

const server = createServer((request,response)=>{
    response.write("hello world");
    response.end();
});

server.listen(4800);