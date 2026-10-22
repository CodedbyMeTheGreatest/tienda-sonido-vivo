import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login'
import Catalogo from "./pages/Catalogo";
import Blog from "./pages/Blog";
import Inicio from "./pages/Inicio";
import { CarritoProvider } from "./context/CarritoContext";
import { ProductosProvider } from "./context/ProductContext";
import DetalleBlog from "./pages/DetalleBlog";
import Carrito from "./pages/Carrito";
import Producto from "./pages/Producto";
import Registro from "./pages/Registro";
import { UsuariosProvider } from "./context/UsuarioContext";
import { SesionProvider } from "./context/SesionContext";
import Checkout from "./pages/Checkout";
import CompraExitosa from "./pages/CompraExitosa";
import CompraFallida from "./pages/CompraFallida";
import MisPedidos from "./pages/MisPedidos";
import { PedidosProvider } from "./context/PedidoContext";
import InicioAdmin from "./pages/InicioAdmin"
import AdminProductos from "./pages/AdminProductos"
import AdminUsuarios from "./pages/AdminUsuarios"

function App() {
  return (
    <PedidosProvider>
      <SesionProvider>
        <UsuariosProvider>
          <ProductosProvider>
            <CarritoProvider>
              <BrowserRouter basename={import.meta.env.BASE_URL}>
                <Routes>
                  <Route path="/" element={<Inicio />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/registro" element={<Registro />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/blog" element={<Blog />} />
                  <Route path="/blog/:id" element={<DetalleBlog />} />
                  <Route path="/catalogo" element={<Catalogo />} />
                  <Route path="/categoria/:nombre" element={<Catalogo />} />
                  <Route path="/buscar/:texto" element={<Catalogo />} />
                  <Route path="/producto/:codigo" element={<Producto />}></Route>
                  <Route path="/carrito" element={<Carrito />} />
                  <Route path="/compra-exitosa/:id" element={<CompraExitosa />} />
                  <Route path="/compra-fallida" element={<CompraFallida />} />
                  <Route path="/mis-pedidos" element={<MisPedidos />} />
                  <Route path="/admin/" element={<InicioAdmin />} />
                  <Route path="/admin/productos" element={<AdminProductos />}></Route>
                  <Route path="/admin/usuarios" element={<AdminUsuarios />}></Route>
                </Routes>
              </BrowserRouter>
            </CarritoProvider>
          </ProductosProvider>
        </UsuariosProvider>
      </SesionProvider>
    </PedidosProvider>
  );
}

export default App
