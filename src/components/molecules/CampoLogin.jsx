import Label from "../atoms/Label";
import InputLabel from "../atoms/InputLabel";

function CampoLogin(props) {
  return (
    <div className="campo-login mb-3">
      <Label paraId={props.id} texto={props.etiqueta} />
      <InputLabel
        id={props.id}
        tipo={props.tipo}
        valor={props.valor}
        alCambiar={props.alCambiar}
        requerido={props.requerido}
        esInvalido={props.esInvalido}
      />
      {props.esInvalido && (
        <small className="texto-error">{props.mensajeError}</small>
      )}
    </div>
  );
}

export default CampoLogin;