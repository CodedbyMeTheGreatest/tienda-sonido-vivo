import { Card } from "react-bootstrap";
import Boton from "../atoms/Boton";
import Precio from "../atoms/Precio";
import {useCart} from "../../context/CarritoContext";

function TarjetaProducto(props) {

    const {añadir} = useCart()
    function manejarAñadir() {
        añadir({
            codigo: props.productoCodigo,
            nombre: props.productoNombreCompleto,
            precio: props.productoPrecio,
            stock: props.productoStock
        })
    }

    return (
        <Card as="article" className="producto">
            <a href={props.href}>
                <img src={props.productoImagenRuta} alt={props.productoTextAlt} />
                <h3>{props.productoNombreCompleto}</h3>
                <Precio precio={props.productoPrecio}></Precio>
            </a>
            <Boton 
            className="boton-catalogo-añadir-producto"
            tipo="button" 
            texto="Añadir al Carrito" 
            dataCodigo={props.productoCodigo}
            alHacerClick={manejarAñadir}
            deshabilitado={props.productoStock === 0}>
            </Boton>
        </Card>
    );
}

export default TarjetaProducto;