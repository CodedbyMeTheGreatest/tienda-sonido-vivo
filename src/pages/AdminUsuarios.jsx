import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaUsuarios from "../components/organisms/TablaUsuarios";
import ModalFormularioUsuario from "../components/organisms/ModalFormularioUsuario";
import ModalConfirmacionUsuario from "../components/organisms/ModalConfirmacionUsuario";
import Boton from "../components/atoms/Boton";
import { useUsuarios } from "../context/UsuarioContext";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

function AdminUsuarios() {
    useTituloPagina("Administración de Usuarios");

    const { usuario } = useSesion();
    const navigate = useNavigate();
    const { usuarios, crear, actualizar, eliminar } = useUsuarios();

    const [mostrarModalForm, setMostrarModalForm] = useState(false);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    const [errorGlobal, setErrorGlobal] = useState("");

  
    if (!usuario || usuario.rol !== "Administrador") {
        return (
            <PlantillaAdmin>
                <div className="contenedor-restringido">
                    <h4>Acceso Restringido</h4>
                    <p>Debe iniciar sesión como administrador para acceder a esta pantalla.</p>
                    <Boton className="btn-login" alHacerClick={() => navigate("/login")} texto="Ir al Login" />
                </div>
            </PlantillaAdmin>
        );
    }

    const handleAbrirCrear = () => {
        setUsuarioAEditar(null);
        setErrorGlobal("");
        setMostrarModalForm(true);
    };

    const handleAbrirEditar = (u) => {
        setUsuarioAEditar(u);
        setErrorGlobal("");
        setMostrarModalForm(true);
    };

    const handleCerrarModal = () => {
        setMostrarModalForm(false);
        setUsuarioAEditar(null);
        setErrorGlobal("");
    };

    const handleGuardar = (datosUsuario) => {
        try {
            if (usuarioAEditar) {
                actualizar(usuarioAEditar.run, datosUsuario);
            } else {
                crear(datosUsuario); 
            }
            handleCerrarModal();
        } catch (e) {
            setErrorGlobal(e.message || "Error al procesar la solicitud.");
        }
    };

    const handleConfirmarEliminar = () => {
        if (usuarioAEliminar) {
            eliminar(usuarioAEliminar.run);
            setUsuarioAEliminar(null);
        }
    };

    return (
        <PlantillaAdmin>
            <section className="encabezado-pagina">
                <h2>Gestión de Usuarios</h2>
                <Boton className="btn-crear-producto" alHacerClick={handleAbrirCrear} texto="+ Agregar Usuario" />
            </section>

            <TablaUsuarios
                usuarios={usuarios}
                onEditar={handleAbrirEditar}
                onEliminar={(u) => setUsuarioAEliminar(u)}
            />

            <ModalFormularioUsuario
                show={mostrarModalForm}
                onHide={handleCerrarModal}
                usuarioAEditar={usuarioAEditar}
                onSubmit={handleGuardar}
                errorGlobal={errorGlobal}
            />

            <ModalConfirmacionUsuario
                show={Boolean(usuarioAEliminar)}
                onHide={() => setUsuarioAEliminar(null)}
                onConfirmar={handleConfirmarEliminar}
                usuario={usuarioAEliminar}
            />
        </PlantillaAdmin>
    );
}

export default AdminUsuarios;