import { Link } from "react-router-dom";

function AvisoInicioSesion(props) {
    return (
        <section className="resultado-compra">
            <h2>{props.titulo}</h2>
            <p>{props.mensaje}</p>
            <Link to="/login" className="boton-carrito boton-carrito-primario">
                Iniciar sesión
            </Link>
        </section>
    );
}

export default AvisoInicioSesion;