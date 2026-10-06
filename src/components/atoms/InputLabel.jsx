function InputLabel(props) {
  const tipo = props.tipo || "text";
  const clase = props.esInvalido ? "campo campo-error" : "campo";
    
  if (tipo === "textarea") {
    return (
      <textarea
        id={props.id}
        name={props.id}
        value={props.valor}
        onChange={props.alCambiar}
        required={props.requerido}
        className={clase}
      />
    );
  }
  return (
    <input
      id={props.id}
      name={props.id}
      type={tipo}
      value={props.valor}
      onChange={props.alCambiar}
      required={props.requerido}
      className={clase}
    />
  );
}

export default InputLabel;