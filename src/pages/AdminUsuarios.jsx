import { useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaUsuarios from "../components/organisms/TablaUsuarios";
import ModalFormularioUsuario from "../components/organisms/ModalFormularioUsuario";
import ModalConfirmacionUsuario from "../components/organisms/ModalConfirmacionUsuario";
import Boton from "../components/atoms/Boton";
import { useUsuarios } from "../context/UsuarioContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { useEffect } from "react";
import { Alert } from "react-bootstrap";

function AdminUsuarios() {
    useTituloPagina("Administración de Usuarios");

    const { usuarios, cargando, error, recargar, actualizar, desactivar, activar, crear } = useUsuarios()
    useEffect(() => {recargar()}, [recargar]);

    const [mostrarModalForm, setMostrarModalForm] = useState(false);
    const [usuarioAEditar, setUsuarioAEditar] = useState(null);
    const [usuarioAEliminar, setUsuarioAEliminar] = useState(null);
    const [errorGlobal, setErrorGlobal] = useState("");
    const [errorAccion, setErrorAccion] = useState("");


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

    const handleGuardar = async (datosUsuario) => {
        try {
            if(usuarioAEditar) await actualizar(usuarioAEditar.id, datosUsuario)
            else await crear(datosUsuario)
            handleCerrarModal();
        }catch(e){
            setErrorGlobal(e.message);
        }
    }

    const handleConfirmarEliminar = async () => {
        if (!usuarioAEliminar) return
        try{
            await desactivar(usuarioAEliminar.id)
            setErrorAccion("");
        }catch(e){
            setErrorAccion(e.message);
        }
        setUsuarioAEliminar(null);
    };

    const handleActivar = async (u) => {
        try {
            await activar(u.id)
            setErrorAccion("");
        } catch (e) {
            setErrorAccion(e.message);
        }
    };

    return (
        <PlantillaAdmin>
            <section className="encabezado-pagina">
                <h2>Gestión de Usuarios</h2>
                <Boton className="btn-crear-producto" alHacerClick={handleAbrirCrear} texto="+ Agregar Usuario" />
            </section>

            {error && <Alert variant="danger">{error}</Alert>}
            {errorAccion && (
                <Alert variant="danger" dismissible onClose={() => setErrorAccion("")}>{errorAccion}</Alert>
            )}

            {cargando && usuarios.length === 0
                ? <p>Cargando usuarios...</p>
                : <TablaUsuarios 
                usuarios={usuarios} 
                onEditar={handleAbrirEditar} 
                onEliminar={(u) => setUsuarioAEliminar(u)}
                onActivar={handleActivar} />}

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