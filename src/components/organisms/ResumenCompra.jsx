import Precio from "../atoms/Precio";

function ResumenCompra(props) {
    return (
        <aside className="resumen-compra">
            <h3>Resumen del pedido</h3>
            <ul className="resumen-compra-lista">
                {props.lineas.map((l) => (
                    <li key={l.codigo} className="resumen-compra-linea">
                        <span>{l.cantidad} × {l.nombre}</span>
                        <Precio precio={l.precio * l.cantidad} />
                    </li>
                ))}
            </ul>
            <div className="carrito-total">
                <span>Total:</span>
                <Precio precio={props.total} />
            </div>
        </aside>
    );
}

export default ResumenCompra;