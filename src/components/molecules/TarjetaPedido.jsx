import Precio from "../atoms/Precio";
import EstadoPedido from "./EstadoPedido";

function TarjetaPedido(props) {
    const { pedido } = props;
    const fecha = new Date(pedido.fecha).toLocaleDateString("es-CL");
    const detalle = pedido.items.map((i) => `${i.cantidad} × ${i.nombre}`).join(", ");

    return (
        <li className="carrito-item">
            <div className="carrito-item-info">
                <h3 className="carrito-item-nombre">{pedido.id} · {fecha}</h3>
                <p className="carrito-item-precio-unitario">{pedido.entrega.tipo}</p>
                <p className="pedido-detalle">{detalle}</p>
            </div>
            <div className="carrito-item-controles">
                <EstadoPedido estado={pedido.estado} />
                <div className="carrito-item-subtotal">
                    <Precio precio={pedido.total} />
                </div>
            </div>
        </li>
    );
}

export default TarjetaPedido;