import CampoLogin from "../molecules/CampoLogin";
import Boton from "../atoms/Boton";

function FormularioLogin(props) {
    return (
        <section>
            <h2>Inicio de sesion</h2>
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
                    id="contrasenia" 
                    etiqueta="Contraseña" 
                    tipo="password" 
                    valor={props.valores.contrasenia} 
                    alCambiar={props.alCambiar} 
                    requerido={true} 
                    esInvalido={Boolean(props.errores.contrasenia)}
                    mensajeError={props.errores.contrasenia}
                />
                <Boton tipo="submit" texto="Iniciar Sesión"/>
                {props.mensajeConfirmacion.texto && (
                    <p id="mensaje-confirmacion">{props.mensajeConfirmacion.texto}</p>
                )}
            </form>
        </section>
    );
}

export default FormularioLogin;