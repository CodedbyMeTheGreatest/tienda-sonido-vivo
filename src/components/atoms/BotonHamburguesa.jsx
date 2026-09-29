function BotonHamburguesa(props) {
  const clase = props.abierto ? "boton-hamburguesa activo" : "boton-hamburguesa";
  const etiqueta = props.abierto ? "Cerrar menú" : "Abrir menú";

  return (
    <button
      type="button"
      className={clase}
      onClick={props.alHacerClick}
      aria-expanded={props.abierto}
      aria-label={etiqueta}
    >
      <span className="linea-hamburguesa"></span>
      <span className="linea-hamburguesa"></span>
      <span className="linea-hamburguesa"></span>
    </button>
  );
}

export default BotonHamburguesa;