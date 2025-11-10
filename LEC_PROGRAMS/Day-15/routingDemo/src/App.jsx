import { BrowserRouter} from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { AppRouter } from "./components/AppRouter"
function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <AppRouter/>
      </div>
    </BrowserRouter>
  )
}

export default App
