import Boton from "../atoms/Boton";
import Precio from "../atoms/Precio";
import ControlCantidad from "./ControlCantidad";

function ItemCarrito(props) {
    const { producto, cantidad } = props.item;

    return (
        <li className="carrito-item">
            <div className="carrito-item-info">
                <h3 className="carrito-item-nombre">{producto.nombre}</h3>
                <div className="carrito-item-precio-unitario">
                    <Precio precio={producto.precio} /> c/u
                </div>
                {cantidad >= producto.stock && (
                    <small className="carrito-aviso">Stock máximo alcanzado</small>
                )}
            </div>

            <div className="carrito-item-controles">
                <ControlCantidad
                    cantidad={cantidad}
                    maximo={producto.stock}
                    onIncrement={() => props.onIncrement(producto.codigo)}
                    onDecrement={() => props.onDecrement(producto.codigo)}
                />
                <div className="carrito-item-subtotal">
                    <Precio precio={producto.precio * cantidad} />
                </div>
                <Boton
                    className="carrito-quitar"
                    texto="Quitar"
                    alHacerClick={() => props.onRemove(producto.codigo)}
                />
            </div>
        </li>
    );
}

export default ItemCarrito;