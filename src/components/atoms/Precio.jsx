function Precio(props) {
    const precioFormateado = Intl.NumberFormat('es-CL').format(props.precio);
    return(
        <p className="precio">${precioFormateado}</p>
    );
};
export default Precio;