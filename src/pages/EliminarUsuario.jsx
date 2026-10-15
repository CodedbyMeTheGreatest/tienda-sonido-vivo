import { useNavigate, useParams } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import Boton from "../components/atoms/Boton";
import { useUsuarios } from "../context/UsuarioContext";

function EliminarUsuario() {
    const { run } = useParams(); 
    const navigate = useNavigate();
    const { usuarios, eliminar } = useUsuarios();

    const usuario = usuarios.find((u) => u.run === run);

    function alConfirmar(e) {
        e.preventDefault();
        eliminar(run);
        navigate("/admin/usuarios");
    }

    function alCancelar() {
        navigate("/admin/usuarios");
    }

    if (!usuario) {
        return (
            <PlantillaAdmin>
                <div className="listado-admin">
                    <h2>Usuario no encontrado</h2>
                    <p>No existe ningún usuario con el RUN {run}.</p>
                    <Boton className="btn-enlace" texto="Volver al listado" alHacerClick={alCancelar} />
                </div>
            </PlantillaAdmin>
        );
    }

    return (
        <PlantillaAdmin>
            <div className="listado-admin">
                <h2>Eliminar Usuario</h2>
                <form className="admin-form" onSubmit={alConfirmar}>
                    <p>¿Seguro que quieres eliminar a este usuario? Esta acción no se puede deshacer.</p>

                    <div className="admin-section">
                        <p><strong>RUN:</strong> {usuario.run}</p>
                        <p><strong>Nombre:</strong> {usuario.nombres} {usuario.apellidos}</p>
                        <p><strong>Correo:</strong> {usuario.correo}</p>
                        <p><strong>Rol:</strong> {usuario.rol}</p>
                    </div>

                    <Boton tipo="submit" texto="Eliminar Usuario" />
                    <Boton tipo="button" texto="Cancelar" alHacerClick={alCancelar} />
                </form>
            </div>
        </PlantillaAdmin>
    );
}

export default EliminarUsuario;