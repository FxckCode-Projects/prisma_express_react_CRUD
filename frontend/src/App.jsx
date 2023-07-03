import { Routes, Route } from "react-router"
import Dashboard from "./Pages/Dashboard"
import "./scss/main.scss"
import EditTasks from "./Pages/EditTasks"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}/>
      <Route path="/create/:id" element={<EditTasks />} />
    </Routes>
  )
}

export default App
