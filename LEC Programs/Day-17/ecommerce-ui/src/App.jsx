import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { Dashboard } from "./components/Dashboard";
import { AddProduct } from "./components/AddProduct";
import { ToastContainer } from "react-toastify";
import { ProductsList } from "./components/ProductsList";
import { UpdateProductForm } from "./components/UpdateProductForm";

function App() {

  return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/add-product" element={<AddProduct/>}/>
        <Route path="/products-list" element={<ProductsList/>}/>
        <Route path="/edit-product/:id" element={<UpdateProductForm/>} />
      </Routes>
      <ToastContainer/>
    </BrowserRouter>
  )
}

export default App
