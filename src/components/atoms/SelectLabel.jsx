function SelectLabel(props) {
  return (
    <select
      id={props.id}
      value={props.valor}
      onChange={props.alCambiar}
      required={props.requerido}
      disabled={props.deshabilitado}
      aria-invalid={props.esInvalido}
      className={props.esInvalido ? "campo-error" : ""}
    >
      <option value="">{props.placeholder || "Seleccione..."}</option>
      {props.opciones.map((o) => (
        <option key={o} value={o}>{o}</option>
      ))}
    </select>
  );
}

export default SelectLabel;