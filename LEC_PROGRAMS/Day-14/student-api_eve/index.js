import express from 'express';
import {connectDb} from './src/configs/DbConfig.js';
import {registerStudent, updateStudent} from './src/controllers/StudentController.js';
import { adminLogin, registerAdmin } from './src/controllers/AdminController.js';

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
    response.send({ message: "Welcome to STUDENT APIs" });
});

app.post("/students", registerStudent);
app.put("/students/:roll",updateStudent);
app.post("/admins",registerAdmin);
app.post("/admins/login",adminLogin);

app.listen(7800, () => {
    connectDb();
});