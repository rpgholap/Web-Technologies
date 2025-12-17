import express from 'express';
import {connectDb} from './src/configs/DbConfig.js';
import {registerStudent} from './src/controllers/StudentController.js';

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
    response.send({ message: "Welcome to STUDENT APIs" });
});

app.post("/students", registerStudent);

app.listen(7800, () => {
    connectDb();
});