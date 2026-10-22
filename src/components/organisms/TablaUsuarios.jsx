import { useNavigate } from "react-router-dom";
import Table from "react-bootstrap/Table";
import Boton from "../atoms/Boton";

function TablaUsuarios(props) {
    const navigate = useNavigate();

    return (
        <section className="contenedor-tabla-admin">
            <Table className="tabla-admin">
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
                                <div className="acciones-tabla">

                                    <Boton
                                        className="btn-editar"
                                        texto="Editar"
                                        alHacerClick={() => navigate(`/admin/usuarios/editar/${u.run}`)}
                                    />
                                    <Boton
                                        className="btn-eliminar"
                                        texto="Eliminar"
                                        alHacerClick={() => navigate(`/admin/usuarios/eliminar/${u.run}`)}
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </section>
    );
}

export default TablaUsuarios;