import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaUsuarios from "../components/organisms/TablaUsuarios";
import { useUsuarios } from "../context/UsuarioContext";

function ListadoUsuarios() {
    const { usuarios } = useUsuarios();

    return (
        <PlantillaAdmin>
            <div className="listado-admin">
                <h2>Listado de Usuarios</h2>
                <TablaUsuarios usuarios={usuarios} />
            </div>
        </PlantillaAdmin>
    );
}

export default ListadoUsuarios;