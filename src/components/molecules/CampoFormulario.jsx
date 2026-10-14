// molecules/CampoFormulario.jsx
import Label from "../atoms/Label";
import InputLabel from "../atoms/InputLabel";
import SelectLabel from "../atoms/SelectLabel";

function CampoFormulario(props) {
  return (
    <div className="campo-login mb-3">
      <Label paraId={props.id} texto={props.etiqueta} />
      {props.opciones ? (
        <SelectLabel
          id={props.id}
          valor={props.valor}
          alCambiar={props.alCambiar}
          requerido={props.requerido}
          esInvalido={props.esInvalido}
          opciones={props.opciones}
          placeholder={props.placeholder}
          deshabilitado={props.deshabilitado}
        />
      ) : (
        <InputLabel
          id={props.id}
          tipo={props.tipo}
          valor={props.valor}
          alCambiar={props.alCambiar}
          requerido={props.requerido}
          esInvalido={props.esInvalido}
          mensajeError={props.mensajeError}
        />
      )}
      {props.esInvalido && (
        <small className="texto-error">{props.mensajeError}</small>
      )}
    </div>
  );
}

export default CampoFormulario;