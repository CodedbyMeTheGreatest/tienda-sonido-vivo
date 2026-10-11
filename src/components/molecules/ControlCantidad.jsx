import Boton from "../atoms/Boton";

function ControlCantidad(props) {
    return (
        <div className="carrito-cantidad">
            <Boton
                className="carrito-cantidad-boton"
                texto="−"
                alHacerClick={props.onDecrement}
            />
            <span className="carrito-cantidad-valor">{props.cantidad}</span>
            <Boton
                className="carrito-cantidad-boton"
                texto="+"
                alHacerClick={props.onIncrement}
                deshabilitado={props.cantidad >= props.maximo}
            />
        </div>
    );
}

export default ControlCantidad;