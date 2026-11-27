import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaProductos from "../components/organisms/TablaProductos";
import Boton from "../components/atoms/Boton";
import { useProductos } from "../context/ProductContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import ModalConfirmacion from "../components/organisms/ModalConfirmacion";
import ModalFormularioProducto from "../components/organisms/ModalFormularioProducto";
import { Alert } from "react-bootstrap";
import ModalStockProducto from "../components/organisms/ModalStockProducto";

function AdminProductos() {
  useTituloPagina("Administración de Productos");

  const { usuario } = useSesion();
  const navigate = useNavigate();
  const { productos, cargando, error, crear, actualizar, actualizarStock, eliminar } = useProductos();

  const [mostrarModalForm, setMostrarModalForm] = useState(false); const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null)
  const [errorGlobal, setErrorGlobal] = useState("");

  const esAdmin = usuario?.rol === "Administrador";
  const [errorAccion, setErrorAccion] = useState("");
  const [productoStock, setProductoStock] = useState(null);

  if (!usuario) {
    return (
      <PlantillaAdmin>
        <div className="contenedor-restringido">
          <h4>Acceso Restringido</h4>
          <p>Debe iniciar sesión como administrador para acceder a esta pantalla.</p>
          <Boton
            className="btn-login"
            alHacerClick={() => navigate("/login")}
            texto="Ir al Login"
          />
        </div>
      </PlantillaAdmin>
    );
  }

  const handleAbrirCrear = () => {
    setProductoAEditar(null);
    setErrorGlobal("");
    setMostrarModalForm(true);
  };

  const handleAbrirEditar = (producto) => {
    setProductoAEditar(producto);
    setErrorGlobal("");
    setMostrarModalForm(true);
  };

  const handleCerrarModal = () => {
    setMostrarModalForm(false);
    setProductoAEditar(null);
    setErrorGlobal("");
  };

  const handleGuardar = async (datosProducto) => {
    try {
      if (productoAEditar) await actualizar(productoAEditar.id, datosProducto);
      else await crear(datosProducto);
      
      handleCerrarModal();
    } catch (e) {
      setErrorGlobal(e.message);
    }
  };

  const handleConfirmarEliminar = async () => {
    if(!productoAEliminar) return;
    try{
      await eliminar(productoAEliminar.id);
      setErrorAccion("");
    }catch(e){
      setErrorAccion(e.message);
    }
    setProductoAEliminar(null);
  };

    const handleCerrarStock = () => {
      setProductoStock(null);
      setErrorGlobal("");
  };

  const handleGuardarStock = async (stock) => {
    try {
      await actualizarStock(productoStock.id, stock);
      handleCerrarStock();
    } catch (e) {
      setErrorGlobal(e.message);
    }
  };

  const handleAbrirStock = (p) => {
    setErrorGlobal("");
    setProductoStock(p);
  };

  return (
    <PlantillaAdmin>
      <section className="encabezado-pagina">
        <h2>{esAdmin ? "Gestión de Productos" : "Gestión de Stock"}</h2>
        {esAdmin && (
          <Boton
            className="btn-crear-producto"
            alHacerClick={handleAbrirCrear}
            texto="+ Agregar Producto"
          />
        )}
      </section>

      {error && <Alert variant="danger">{error}</Alert>}
      {errorAccion && (
        <Alert variant="danger" dismissible onClose={() => setErrorAccion("")}>{errorAccion}</Alert>
      )}

      {cargando && productos.length === 0
        ? <p>Cargando productos...</p>
        : <TablaProductos
            productos={productos}
            soloStock={!esAdmin}
            onEditar={esAdmin ? handleAbrirEditar : handleAbrirStock}
            onEliminar={esAdmin ? (p) => setProductoAEliminar(p) : null}
        />}
        

      {esAdmin && (
        <ModalFormularioProducto
          show={mostrarModalForm} onHide={handleCerrarModal}
          productoAEditar={productoAEditar} onSubmit={handleGuardar}
          errorGlobal={errorGlobal}
        />
      )}

      <ModalStockProducto
        show={Boolean(productoStock)} producto={productoStock}
        onHide={handleCerrarStock} onGuardar={handleGuardarStock}
        errorGlobal={errorGlobal}
      />

      <ModalConfirmacion
        show={Boolean(productoAEliminar)}
        onHide={() => setProductoAEliminar(null)}
        onConfirmar={handleConfirmarEliminar}
        codigoProducto={productoAEliminar?.codigoProducto}
      />
    </PlantillaAdmin>
  );
}

export default AdminProductos;