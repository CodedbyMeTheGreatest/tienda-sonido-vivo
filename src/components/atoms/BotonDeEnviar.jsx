function BotonDeEnviar(props) {
  const tipo = props.tipo || "button";

  return (
    <button
      type={tipo}
      className="boton-primario"
      onClick={props.alHacerClick}
      disabled={props.deshabilitado}
    >
      {props.texto}
    </button>
  );
}

export default BotonDeEnviar;