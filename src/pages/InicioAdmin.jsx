import { useNavigate } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";

function InicioAdmin() {
    const navigate = useNavigate();

    return (
        <PlantillaAdmin>
            <div className="admin-main">
                <div className="admin-header">
                    <h1>Panel de Administración</h1>
                </div>

                <div className="admin-content">
                    <div className="admin-mitad-superior">
                        <div className="admin-section">
                            <h2>Gestión de Usuarios</h2>
                            <div className="admin-actions">
                                <Boton className="btn-enlace" texto="Listado de Usuarios" alHacerClick={() => navigate("/admin/usuarios")} />
                                <Boton className="btn-enlace" texto="Agregar Usuario" alHacerClick={() => navigate("/admin/usuarios/nuevo")} />
                                <Boton className="btn-enlace" texto="Editar Usuario" alHacerClick={() => navigate("/admin/usuarios/editar")} />
                                <Boton className="btn-enlace" texto="Eliminar Usuario" alHacerClick={() => navigate("/admin/usuarios/eliminar")} />
                            </div>
                        </div>
                    </div>

                    <div className="admin-mitad-inferior">
                        <div className="admin-section">
                            <div className="admin-actions">
                             <Boton className="btn-enlace" texto="Gestión de Productos" alHacerClick={() => navigate("/admin/productos")} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="admin-footer">
                    <p>Panel interno — Sonido Vivo</p>
                </div>
            </div>
        </PlantillaAdmin>
    );
}

export default InicioAdmin;