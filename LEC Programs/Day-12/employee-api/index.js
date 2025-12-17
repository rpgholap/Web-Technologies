import express from 'express';
import { createConnection } from 'mysql2/promise';

const app = express();

let conn;
async function connectDb() {
    try {
        conn = await createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            port: 3306,
            database: 'mydb'
        });
        console.log("DB connection created");
    } catch (error) {
        console.log("Error in db connection");
        console.log(error);
    }
}

app.get("/", (request, response) => {
    response.send({ message: 'Welcome to employee crud' });
});
//CRUD: Create/Insert Read Update Delete

app.get('/employees', async (request, response) => {
    try {
        const [rows] = await conn.query("SELECT * FROM employee");
        console.log(rows);
        response.status(200).send(rows);
    } catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});

app.get("/employees/:id", async (request, response) => {
    try {
        const [rows] = await conn.query("SELECT * FROM employee WHERE id=" + request.params.id);
        console.log(rows);
        if (rows.length === 0) {
            response.status(404).send({ message: 'Employee not found with given id ' + request.params.id });
        }
        else {
            response.status(200).send(rows[0]);
        }

    } catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});


app.delete("/employees/:id", async (request, response) => {
    try {
        const [deleteResult] = await conn.query("DELETE FROM employee WHERE id="+request.params.id);
        console.log(deleteResult.affectedRows);
        if(deleteResult.affectedRows === 0){
            response.status(404).send({ message: 'Employee not found with given id ' + request.params.id });
        }
        else{
          response.status(200).send({message:"Employee deleted"});  
        }
        response.status(200).send("hello");
    } catch (error) {
        response.status(500).send({ message: "Something went wrong" });
    }
});

app.listen(5700, () => {
    connectDb();
});