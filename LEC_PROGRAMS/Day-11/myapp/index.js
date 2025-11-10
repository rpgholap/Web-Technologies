import {createServer} from 'http';

const server = createServer((request,response)=>{
    response.write("new response from server");
    response.end();
});

server.listen(5000);