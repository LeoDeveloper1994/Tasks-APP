import './App.css'
import { HashRouter, Routes, Route } from "react-router-dom";
import ProtectedRoutes from './pages/auth/ProtectedRoutes';
import { Dashboard, Login } from "./pages";

function App() {

  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route element={<ProtectedRoutes />}>
          <Route path='/dashboard' element={<Dashboard />}/>
        </Route>
      </Routes>
    </HashRouter>
  )
}

export default App