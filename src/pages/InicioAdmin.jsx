import { useNavigate } from "react-router-dom";
import Boton from "../components/atoms/Boton";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import { useTituloPagina } from "../hooks/useTituloPagina";

function InicioAdmin() {
    const navigate = useNavigate();

    useTituloPagina('Panel de Administración')

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
                                <Boton className="btn-enlace" texto="Gestionar usuarios" alHacerClick={() => navigate("/admin/usuarios")} />
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