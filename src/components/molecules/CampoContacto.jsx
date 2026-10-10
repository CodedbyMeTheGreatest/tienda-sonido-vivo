import Label from "../atoms/Label";
import InputLabel from "../atoms/InputLabel";

function CampoContacto(props){
   <div className="campo-contenedor">
    <Label paraId = {props.id} texto={props.etiqueta} />
    <InputLabel
        id={props.id}
        tipo={props.tipo}
        valor={props.valor}
        alCambio= {props.alCambio}
        requerido={props.requerido}
        esInvalido={props.esInvalido}
    />
        {props.esInvalido && <span className="error">{props.mensajeError}</span>}
    </div>

}

export default CampoContacto