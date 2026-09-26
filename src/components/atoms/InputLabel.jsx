function InputLabel(props) {
  const tipo = props.tipo || "text";
  const clase = props.esInvalido ? "campo campo-error" : "campo";

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