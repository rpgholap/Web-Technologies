import express from 'express';
import { connectDb } from './src/configs/DbConfig.js';
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from './src/controllers/ProductController.js';
import { customerLogin, registerCustomer } from './src/controllers/CustomerController.js';
import { adminLogin, registerAdmin } from './src/controllers/AdminController.js';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products",getAllProducts);
app.get("/products/:id", getProductById);
app.post("/products",addProduct);
app.delete("/products/:id", deleteProductById);
app.put("/products/:id", updateProduct);

app.post("/customers", registerCustomer);
app.post("/customers/login", customerLogin);

app.post("/admins", registerAdmin);
app.post("/admins/login", adminLogin);


app.listen(7655,()=>{
    connectDb();
})