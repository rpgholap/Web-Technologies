import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigationbar } from "./components/Navigationbar";
import { Dashboard } from "./components/Dashboard";
import { RegisterStudent } from "./components/RegisterStudent";
import { StudentsList } from "./components/StudentsList";

function App() {

  return (
    <BrowserRouter>
      <Navigationbar/>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/register-student" element={<RegisterStudent/>} />
        <Route path="/students-list" element={<StudentsList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
