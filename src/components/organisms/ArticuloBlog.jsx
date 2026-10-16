import SeccionArticulo from "../molecules/SeccionArticulo";

function ArticuloBlog(props) {
    const articulo = props.articulo;

    return (
        <article className="articulo-completo">
            <h2>{articulo.titulo}</h2>
            <p>{articulo.introduccion}</p>
            {articulo.secciones.map((s) => (
                <SeccionArticulo key={s.subtitulo} subtitulo={s.subtitulo} texto={s.texto} />
            ))}
        </article>
    );
}

export default ArticuloBlog;