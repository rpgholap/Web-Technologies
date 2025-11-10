import express from 'express';

const app = express();

app.use(express.json()); // if a middleware has to be executed for every request

app.get("/",(request,response)=>{
    response.send({message:'Welcome to app'})
});

app.post("/sum",(request,response)=>{
    console.log(request.body);
    const n1 = request.body.a;
    const n2 = request.body.b;
    const n3 = n1 + n2;
    response.status(200).send({sum:n3});
});

app.post("/factorial",(request,response)=>{
    console.log(request.body.num);
    response.send({message:"hello"});
});

app.listen(4500);