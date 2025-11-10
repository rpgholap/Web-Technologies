import { Route, Routes, useLocation } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { Dashboard } from "./components/Dashboard";
import { AddProduct } from "./components/AddProduct";
import { ToastContainer } from "react-toastify";
import { ProductsList } from "./components/ProductsList";
import { UpdateProductForm } from "./components/UpdateProductForm";
import { Login } from "./components/Login";
import { PrivateRoute } from "./components/PrivateRoute";

function App() {

  const location = useLocation();

  return (
    <div>
      {location.pathname !== "/" ? <Navigationbar /> : null}
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProduct />} />
          <Route path="/products-list" element={<ProductsList />} />
          <Route path="/edit-product/:id" element={<UpdateProductForm />} />
        </Route>

      </Routes>
      <ToastContainer />
    </div>

  )
}

export default App
