import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Boton from "../atoms/Boton";
import { Insignia } from "../atoms/Insignia";
import Precio from "../atoms/Precio";

function TablaProductos(props) {
    const productos = props.productos || [];
    const [paginaActual, setPaginaActual] = useState(1);
    const productosPorPagina = 10;

    const totalPaginas = Math.ceil(productos.length / productosPorPagina);

    useEffect(() => {
        if (paginaActual > totalPaginas && totalPaginas > 0) {
            setPaginaActual(totalPaginas);
        }
    }, [productos.length, totalPaginas, paginaActual]);

    if (productos.length === 0) {
        return (
            <div className="mensaje-vacio">
                No hay productos registrados en el catálogo.
            </div>
        );
    }

    const indiceUltimo = paginaActual * productosPorPagina;
    const indicePrimero = indiceUltimo - productosPorPagina;
    const productosActuales = productos.slice(indicePrimero, indiceUltimo);

    return (
        <section className="contenedor-tabla-paginada" aria-label="Listado de productos">

            <Table striped bordered hover responsive className="tabla-productos">
                <thead>
                    <tr>
                        <th>Código</th>
                        <th>Nombre</th>
                        <th>Categoría</th>
                        <th>Precio</th>
                        <th>Stock</th>
                        <th className="texto-centro">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosActuales.map((p) => (
                        <tr key={p.codigo}>
                            <td>
                                <code>{p.codigo}</code>
                            </td>
                            <td>
                                <strong>{p.nombre}</strong>
                                {(p.marca || p.modelo) && (
                                    <div className="detalle-subtexto">
                                        {p.marca} {p.modelo}
                                    </div>
                                )}
                            </td>
                            <td>
                                <Insignia tone="neutral">{p.categoria}</Insignia>
                            </td>
                            <td>
                                <Precio precio={p.precio} />
                            </td>
                            <td>
                                <Insignia tone={p.stock > 0 ? "success" : "warning"}>
                                    {p.stock > 0 ? `${p.stock} un.` : "Sin stock"}
                                </Insignia>
                            </td>
                            <td>
                                <div className="acciones-tabla">
                                    <Boton
                                        className="btn-editar"
                                        alHacerClick={() => props.onEditar(p)}
                                        texto="Editar"
                                    />
                                    <Boton
                                        className="btn-eliminar"
                                        alHacerClick={() => props.onEliminar(p.codigo)}
                                        texto="Eliminar"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            {
                totalPaginas > 1 && (
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
                )
            }
        </section>
    );
}

export default TablaProductos;