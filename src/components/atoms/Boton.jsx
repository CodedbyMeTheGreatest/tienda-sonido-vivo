function Boton(props) {
  const tipo = props.tipo || "button";
  const dataCodigo = props.dataCodigo || null;

  return (
    <button
      type={tipo}
      className={props.className}
      dataCodigo={dataCodigo} 
      onClick={props.alHacerClick}
      disabled={props.deshabilitado}
    >
      {props.texto}
    </button>
  );
}

export default Boton;