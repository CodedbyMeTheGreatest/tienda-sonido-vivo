import { useNavigate } from "react-router-dom";
import Boton from "../atoms/Boton";

function TablaUsuarios(props) {
    const navigate = useNavigate();

    return (
        <div className="contenedor-tabla-admin">
            <table className="tabla-admin">
                <thead>
                    <tr>
                        <th>RUN</th>
                        <th>Nombres</th>
                        <th>Apellidos</th>
                        <th>Correo</th>
                        <th>Región</th>
                        <th>Comuna</th>
                        <th>Rol</th>
                        <th>Dirección</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {props.usuarios.map((u) => (
                        <tr key={u.run}>
                            <td>{u.run}</td>
                            <td>{u.nombres}</td>
                            <td>{u.apellidos}</td>
                            <td>{u.correo}</td>
                            <td>{u.region}</td>
                            <td>{u.comuna}</td>
                            <td>{u.rol}</td>
                            <td>{u.direccion}</td>
                            <td>
                                <Boton
                                    className="btn-enlace"
                                    texto="Editar"
                                    alHacerClick={() => navigate(`/admin/usuarios/editar/${u.run}`)}
                                />
                                <Boton
                                    className="btn-enlace"
                                    texto="Eliminar"
                                    alHacerClick={() => navigate(`/admin/usuarios/eliminar/${u.run}`)}
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default TablaUsuarios;