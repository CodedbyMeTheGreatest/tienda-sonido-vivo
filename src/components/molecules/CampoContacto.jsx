import Label from "../atoms/Label";
import InputLabel from "../atoms/InputLabel";

function CampoContacto(props){
     return(
   <div className="campo-contenedor">
    <Label paraId = {props.id} texto={props.etiqueta} />
    <InputLabel
        id={props.id}
        tipo={props.tipo}
        valor={props.valor}
        alCambiar= {props.alCambiar}
        requerido={props.requerido}
        esInvalido={props.esInvalido}
    />
        {props.esInvalido && <span className="error">{props.mensajeError}</span>}
    </div>
     );

}

export default CampoContacto