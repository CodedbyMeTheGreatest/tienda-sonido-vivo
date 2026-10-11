import Boton from "../atoms/Boton";
import Precio from "../atoms/Precio";

function ResumenCarrito(props) {
    return (
        <div className="carrito-resumen">
            <Boton
                className="boton-carrito boton-carrito-secundario"
                texto="Vaciar carrito"
                alHacerClick={props.onClear}
            />
            <div className="carrito-total">
                <span>Total:</span>
                <Precio precio={props.total} />
            </div>
        </div>
    );
}

export default ResumenCarrito;