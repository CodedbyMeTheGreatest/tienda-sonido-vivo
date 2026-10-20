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

function AdminProductos() {
  useTituloPagina("Administración de Productos");

  const { usuario } = useSesion();
  const navigate = useNavigate();
  const { productos, crear, actualizar, eliminar } = useProductos();

  const [mostrarModalForm, setMostrarModalForm] = useState(false); const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null)
  const [errorGlobal, setErrorGlobal] = useState("");

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

  const handleGuardar = (datosProducto) => {
    try {
      if (productoAEditar) {
        actualizar(productoAEditar.codigo, datosProducto);
      } else {
        crear(datosProducto);
      }
      handleCerrarModal();
    } catch (e) {
      setErrorGlobal(e.message || "Error al procesar la solicitud.");
    }
  };

  const handleConfirmarEliminar = () => {
    if (productoAEliminar) {
      eliminar(productoAEliminar);
      setProductoAEliminar(null)
    }
  };

  return (
    <PlantillaAdmin>
      <section className="encabezado-pagina">
        <h2>Gestión de Productos</h2>
        <Boton
          className="btn-crear-producto"
          alHacerClick={handleAbrirCrear}
          texto="+ Agregar Producto"
        />
      </section>
      
      <TablaProductos
        productos={productos}
        onEditar={handleAbrirEditar}
        onEliminar={(codigo) => setProductoAEliminar(codigo)}
      />

      <ModalFormularioProducto
        show={mostrarModalForm}
        onHide={handleCerrarModal}
        productoAEditar={productoAEditar}
        onSubmit={handleGuardar}
        errorGlobal={errorGlobal}
      />

      <ModalConfirmacion
        show={Boolean(productoAEliminar)}
        onHide={() => setProductoAEliminar(null)}
        onConfirmar={handleConfirmarEliminar}
        codigoProducto={productoAEliminar}
      />
    </PlantillaAdmin>
  );
}

export default AdminProductos;