function Label(props) {
  return (
    <label htmlFor={props.paraId} className="etiqueta">
      {props.texto}
    </label>
  );
}

export default Label;