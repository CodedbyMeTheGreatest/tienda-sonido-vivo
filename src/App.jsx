import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import Catalogo from "./pages/Catalogo";
import Inicio from "./pages/Inicio";
import { CarritoProvider } from "./context/CarritoContext";
import Carrito from "./pages/Carrito";

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/login" element={<Login />} />
          <Route path="/catalogo" element={<Catalogo />} />
          <Route path="/carrito" element={<Carrito />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App
