import { getConnectionObject } from "../configs/DbConfig.js";

export async function registerStudent(request, response){
    try {
        const connection = getConnectionObject();
        const data = request.body;
        const qry = `INSERT INTO student VALUES(${data.roll},'${data.name}','${data.phone}',${data.marks})`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Student registered'});
        }
        else{
            response.status(500).send({message:'Student registration failed'});
        }
    } catch (error) {
        console.log(error);
        if(error.errno === 1062){
            response.status(400).send({message:'Student with this roll no. already exists'});
        }
        else{
            response.status(500).send({message:'Something went wrong'});
        }
    }
}

export async function updateStudent(request, response){
try {
        const connection = getConnectionObject();
        const {name,phone,marks} = request.body;
        const qry = `UPDATE student SET name='${name}', phone='${phone}', marks=${marks} WHERE roll=${request.params.roll}`;
        const [resultSet] = await connection.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Student Updated'});
        }
        else{
            response.status(500).send({message:'Student update operation failed'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}

export async function getAllStudents(request, response){
    try {
        console.log("admin-id in controller", request.loggedInAdminId);
        const connection = getConnectionObject();
        const qry = `SELECT * FROM student`;
        const [rows] = await connection.query(qry);
        response.status(200).send(rows);
    } catch (error) {
        console.log(error);
        response.status(500).send({message:'Something went wrong'});
    }
}