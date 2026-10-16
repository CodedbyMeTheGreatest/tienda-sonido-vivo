import { Link } from "react-router-dom";

function TarjetaBlog(props) {
    return (
        <article className="blog-entry">
            <h3>{props.titulo}</h3>
            <p>{props.resumen}</p>
            <Link to={props.to}>Leer más</Link>
        </article>
    );
}

export default TarjetaBlog;