import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import Catalogo from "./pages/Catalogo";
import PlantillaPublica from "./components/templates/PlantillaPublica";


function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route element={<PlantillaPublica cantidadCarrito={0}/>}>
            <Route path="/login" element={<Login />} />
            <Route path="/catalogo" element={<Catalogo />} />
          </Route>
        </Routes>
      </BrowserRouter>
  );
}

export default App
