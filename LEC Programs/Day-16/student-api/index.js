import express from 'express';
import {connectDb} from './src/configs/DbConfig.js';
import {getAllStudents, registerStudent, updateStudent} from './src/controllers/StudentController.js';
import { adminLogin, registerAdmin } from './src/controllers/AdminController.js';
import { verifyToken } from './src/middlewares/VerifyToken.js';
import cors from 'cors'


const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (request, response) => {
    response.send({ message: "Welcome to STUDENT APIs" });
});

// app.get("/students", verifyToken, getAllStudents);
// app.post("/students", verifyToken, registerStudent);
// app.put("/students/:roll", verifyToken, updateStudent);
// app.post("/admins",verifyToken, registerAdmin);
app.get("/students", getAllStudents);
app.post("/students", registerStudent);
app.put("/students/:roll", updateStudent);
app.post("/admins", registerAdmin);
app.post("/admins/login",adminLogin);

app.listen(7800, () => {
    connectDb();
});