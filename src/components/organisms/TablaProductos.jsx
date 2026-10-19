import Table from "react-bootstrap/Table";
import Boton from "../atoms/Boton";
import { Insignia } from "../atoms/Insignia";
import Precio from "../atoms/Precio";

function TablaProductos(props) {
    const productos = props.productos || [];

    if (productos.length === 0) {
        return (
            <div className="">
                No hay productos registrados en el catálogo.
            </div>
        );
    }

    return (
        <Table striped bordered hover responsive className="">
            <thead className="">
                <tr>
                    <th>Código</th>
                    <th>Nombre</th>
                    <th>Categoría</th>
                    <th>Precio</th>
                    <th>Stock</th>
                    <th className="">Acciones</th>
                </tr>
            </thead>
            <tbody className="cuerpo-tabla-admin" id="cuerpo-tabla-productos-admin">
                {productos.map((p) => (
                    <tr key={p.codigo}>
                        <td>
                            <code>{p.codigo}</code>
                        </td>
                        <td>
                            <strong>{p.nombre}</strong>
                            {(p.marca || p.modelo) && (
                                <div className="">
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
                        <td className="">
                            <div className="">
                                <Boton
                                    className="btn btn-outline-primary btn-sm"
                                    alHacerClick={() => props.onEditar(p)}
                                    texto="Editar"
                                />
                                <Boton
                                    className="btn btn-outline-danger btn-sm"
                                    alHacerClick={() => props.onEliminar(p.codigo)}
                                    texto="Eliminar"
                                />
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

export default TablaProductos;