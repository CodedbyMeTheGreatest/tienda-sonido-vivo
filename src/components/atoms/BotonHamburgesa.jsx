function BotonHamburgesa(props) {
   const clase = prop.abierto ? "boton-hamburgesa abierto" : "boton-hamburgesa";
   const etiqueta  = props.abierto ? "Cerrar menu" : "Abrir menu";
    return (
        <button 
        type="button"
        className= {clase}
        onClick={props.alHacerClick}
        aria-expanded={props.abierto}
        aria-label={etiqueta}
        >
            <span className="icono-hamburgesa"></span>
            <span className="icono-hamburgesa"></span>
            <span className="icono-hamburgesa"></span>
        </button>

    )
}
export default BotonHamburgesa;