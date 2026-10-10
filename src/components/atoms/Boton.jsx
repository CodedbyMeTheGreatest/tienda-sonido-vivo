function Boton(props) {
  const tipo = props.tipo || "button";

  return (
    <button
      type={tipo}
      className={props.className}
      onClick={props.alHacerClick}
      disabled={props.deshabilitado}
    >
      {props.texto}
    </button>
  );
}

export default Boton;