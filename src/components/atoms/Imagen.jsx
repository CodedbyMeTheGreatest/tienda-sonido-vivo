function Imagen(props) {
    const src = props.src;
    const alt = props.alt || "Imagen del producto";
    const clase = props.className || "imagen-producto";
    return (
        <img
            src={src}
            alt={alt || "Imagen del producto"}
            className={`img-fluid ${clase}`}
            onClick={props.alHacerClick}
        />
    );
}

export default Imagen;