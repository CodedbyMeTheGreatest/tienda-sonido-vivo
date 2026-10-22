import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Boton from "../atoms/Boton";
import { Insignia } from "../atoms/Insignia";

function TablaUsuarios(props) {
    const usuarios = props.usuarios || [];
    const [paginaActual, setPaginaActual] = useState(1);
    const usuariosPorPagina = 10;

    const totalPaginas = Math.ceil(usuarios.length / usuariosPorPagina);

    // si se elimina el último de una página, vuelve a la anterior
    useEffect(() => {
        if (paginaActual > totalPaginas && totalPaginas > 0) {
            setPaginaActual(totalPaginas);
        }
    }, [usuarios.length, totalPaginas, paginaActual]);

    if (usuarios.length === 0) {
        return <div className="mensaje-vacio">No hay usuarios registrados.</div>;
    }

    const indiceUltimo = paginaActual * usuariosPorPagina;
    const indicePrimero = indiceUltimo - usuariosPorPagina;
    const usuariosActuales = usuarios.slice(indicePrimero, indiceUltimo);

    return (
        <section className="contenedor-tabla-paginada" aria-label="Listado de usuarios">
            <Table striped bordered hover responsive className="tabla-usuarios">
                <thead>
                    <tr>
                        <th>RUN</th>
                        <th>Nombre</th>
                        <th>Correo</th>
                        <th>Región</th>
                        <th>Rol</th>
                        <th className="texto-centro">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {usuariosActuales.map((u) => (
                        <tr key={u.run}>
                            <td><code>{u.run}</code></td>
                            <td>
                                <strong>{u.nombres} {u.apellidos}</strong>
                                <div className="detalle-subtexto">{u.direccion}</div>
                            </td>
                            <td>{u.correo}</td>
                            <td>
                                {u.region}
                                <div className="detalle-subtexto">{u.comuna}</div>
                            </td>
                            <td>
                                <Insignia tone={u.rol === "Administrador" ? "success" : "neutral"}>
                                    {u.rol}
                                </Insignia>
                            </td>
                            <td>
                                <div className="acciones-tabla">
                                    <Boton className="btn-editar" alHacerClick={() => props.onEditar(u)} texto="Editar" />
                                    <Boton className="btn-eliminar" alHacerClick={() => props.onEliminar(u)} texto="Eliminar" />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {totalPaginas > 1 && (
                <div className="paginacion-contenedor">
                    <Boton
                        className="btn-paginacion"
                        alHacerClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
                        deshabilitado={paginaActual === 1}
                        texto="Anterior"
                    />
                    <div className="paginacion-numeros">
                        {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((num) => (
                            <Boton
                                key={num}
                                className={`btn-pagina ${paginaActual === num ? "activa" : ""}`}
                                alHacerClick={() => setPaginaActual(num)}
                                texto={String(num)}
                            />
                        ))}
                    </div>
                    <Boton
                        className="btn-paginacion"
                        alHacerClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
                        deshabilitado={paginaActual === totalPaginas}
                        texto="Siguiente"
                    />
                </div>
            )}
        </section>
    );
}

export default TablaUsuarios;