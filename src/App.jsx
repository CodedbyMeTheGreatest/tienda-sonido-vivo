import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import Catalogo from "./pages/Catalogo";
import Inicio from "./pages/Inicio";
import { CarritoProvider } from "./context/CarritoContext";
import { ProductosProvider } from "./context/ProductContext";
import Carrito from "./pages/Carrito";
import Producto from "./pages/Producto";
import Registro from "./pages/Registro";
import { UsuariosProvider } from "./context/UsuarioContext";
import { SesionProvider } from "./context/SesionContext";

function App() {
  return (
    <SesionProvider>
      <UsuariosProvider>
        <ProductosProvider>
          <CarritoProvider>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/catalogo" element={<Catalogo />} />
                <Route path="/carrito" element={<Carrito />} />
                <Route path="/producto/:codigo" element={<Producto />}></Route>
                <Route path="/registro" element={<Registro />} />
              </Routes>
            </BrowserRouter>
          </CarritoProvider>
        </ProductosProvider>
      </UsuariosProvider>
    </SesionProvider>
  );
}

export default App
