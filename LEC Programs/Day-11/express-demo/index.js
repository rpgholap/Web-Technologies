import express from 'express';

const app = express(); // create an express application and this will act as a server

app.get("/", (request, response) => {
    response.send("hello welcome to home");
});

app.get("/login", (request, response) => {
    response.send("this is login response");
});

// /sum/3/5
app.post("/sum", (request, response) => {
    const data = request.body;
    console.log(data)
    response.send("hello")
});

app.get("/factorial/:num", (request, response) => {
    try {
        const value = parseInt(request.params.num);
        if (value <= 0) {
            response.status(400).send({ message: 'Invalid value given' })
        }
        else {
            var f = 1;
            for (var i = 1; i <= value; i++) {
                f = f * i;
            }
            response.status(200).send({ factorial: f });
        }
    } catch (error) {
        response.status(500).send({ message: 'Something went wrong' })
    }


});


app.listen(5500);