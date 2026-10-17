import { Link } from "react-router-dom";
import TarjetaPedido from "../molecules/TarjetaPedido";

function ListaPedidos(props) {
    if (props.pedidos.length === 0) {
        return (
            <div className="carrito-vacio">
                <p>Aún no tienes pedidos.</p>
                <Link to="/catalogo" className="boton-carrito boton-carrito-primario">Ir al catálogo</Link>
            </div>
        );
    }

    return (
        <ul className="carrito-lista">
            {props.pedidos.map((p) => (
                <TarjetaPedido key={p.id} pedido={p} />
            ))}
        </ul>
    );
}

export default ListaPedidos;