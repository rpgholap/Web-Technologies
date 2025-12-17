import express from 'express';
import { connectDb } from './src/configs/DbConfig.js';
import { addProduct, deleteProductById, getAllProducts, getProductById, updateProduct } from './src/controllers/ProductController.js';
import { customerLogin, registerCustomer } from './src/controllers/CustomerController.js';
import { adminLogin, registerAdmin } from './src/controllers/AdminController.js';
import cors from 'cors';
import { verifyToken } from './src/middlewares/VerifyToken.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get("/products",verifyToken, getAllProducts);
app.get("/products/:id", verifyToken, getProductById);
app.post("/products",verifyToken, addProduct);
app.delete("/products/:id", verifyToken, deleteProductById);
app.put("/products/:id",verifyToken, updateProduct);

app.post("/customers", registerCustomer);
app.post("/customers/login", customerLogin);

app.post("/admins", verifyToken, registerAdmin);
app.post("/admins/login", adminLogin);


app.listen(7655,()=>{
    connectDb();
})