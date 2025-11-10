import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layouts/Layout";
import { Home } from "./components/Pages/Home";
import { About } from "./components/Pages/About";
import { Contact } from "./components/Pages/Contact";
import { Dashboard } from "./components/Pages/Dashboard";
import { Parts } from "./components/Pages/Parts";
import { Login } from "./components/Pages/Login";
import { Register } from "./components/Pages/Registration";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login page - no navbar/footer */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />

        {/* All other pages wrapped inside Layout */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="parts" element={<Parts />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;