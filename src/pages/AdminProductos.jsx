import { useState } from "react";
import { Modal, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaProductos from "../components/organisms/TablaProductos";
import FormularioProducto from "../components/organisms/FormularioProducto";
import Boton from "../components/atoms/Boton";
import { useProductos } from "../context/ProductContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

function AdminProductos() {
  useTituloPagina("Administración de Productos");

  const { usuario } = useSesion();
  const navigate = useNavigate();
  const { productos, crear, actualizar, eliminar } = useProductos();

  const [mostrarModal, setMostrarModal] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [errorGlobal, setErrorGlobal] = useState("");

  if (!usuario) {
    return (
      <PlantillaAdmin>
        <div className="">
          <Alert variant="danger" className="">
            <h4>Acceso Restringido</h4>
            <p>Debe iniciar sesión como administrador para acceder a esta pantalla.</p>
            <Boton
              className="btn btn-primary"
              alHacerClick={() => navigate("/login")}
              texto="Ir al Login"
            />
          </Alert>
        </div>
      </PlantillaAdmin>
    );
  }

  const handleAbrirCrear = () => {
    setProductoAEditar(null);
    setErrorGlobal("");
    setMostrarModal(true);
  };

  const handleAbrirEditar = (producto) => {
    setProductoAEditar(producto);
    setErrorGlobal("");
    setMostrarModal(true);
  };

  const handleCerrarModal = () => {
    setMostrarModal(false);
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
    } catch (err) {
      setErrorGlobal(err.message || "Error al procesar la solicitud.");
    }
  };

  const handleEliminar = (codigo) => {
    if (window.confirm(`¿Confirma eliminar el producto con código ${codigo}?`)) {
      eliminar(codigo);
    }
  };

  return (
    <PlantillaAdmin>
      <div className="">
        <h2>Gestión de Productos</h2>
        <Boton
          className="btn btn-success"
          alHacerClick={handleAbrirCrear}
          texto="+ Agregar Producto"
        />
      </div>

      <TablaProductos
        productos={productos}
        onEditar={handleAbrirEditar}
        onEliminar={handleEliminar}
      />

      <Modal show={mostrarModal} onHide={handleCerrarModal} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {productoAEditar ? "Editar Producto" : "Nuevo Producto"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="">
          {errorGlobal && (
            <Alert variant="danger" className="">
              {errorGlobal}
            </Alert>
          )}
          <FormularioProducto
            productoAEditar={productoAEditar}
            onSubmit={handleGuardar}
            onCancelar={handleCerrarModal}
          />
        </Modal.Body>
      </Modal>
    </PlantillaAdmin>
  );
}

export default AdminProductos;