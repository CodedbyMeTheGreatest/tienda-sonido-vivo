import CampoLogin from "../molecules/CampoLogin";
import BotonDeEnviar from "../atoms/BotonDeEnviar";

function FormularioLogin(props) {
    return (
        <section>
            <form id="inicio-sesion" className="admin-form" onSubmit={props.alEnviar} noValidate>
                <CampoLogin 
                    id="correo" 
                    etiqueta="Correo" 
                    tipo="email" 
                    valor={props.valores.correo} 
                    alCambiar={props.alCambiar} 
                    requerido={true} 
                    esInvalido={Boolean(props.errores.correo)}
                    mensajeError={props.errores.correo}
                />
                <CampoLogin 
                    id="contraseña" 
                    etiqueta="Contraseña" 
                    tipo="password" 
                    valor={props.valores.contraseña} 
                    alCambiar={props.alCambiar} 
                    requerido={true} 
                    esInvalido={Boolean(props.errores.contraseña)}
                    mensajeError={props.errores.contraseña}
                />
                <BotonDeEnviar tipo="submit" texto="Iniciar Sesión"/>
                {props.mensajeConfirmacion.texto && (
                    <p id="mensaje-confirmacion">{props.mensajeConfirmacion.texto}</p>
                )}
            </form>
        </section>
    );
}

export default FormularioLogin;