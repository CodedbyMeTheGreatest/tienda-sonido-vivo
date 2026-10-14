import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import Regiones  from "../../data/Regiones.json";

function FormularioRegistro(props) {
    const { valores, errores, mensajeConfirmacion } = props;

    const comunas = Regiones.find((r) => r.nombre === valores.region)?.comunas ?? [];

    const campo = (id) => ({
        id,
        valor: valores[id],
        alCambiar: props.alCambiar,
        requerido: true,
        esInvalido: Boolean(errores[id]),
        mensajeError: errores[id],
    });

    return (
        <section>
            <h2>Registro</h2>
            <form id="registro" className="admin-form" onSubmit={props.alEnviar} noValidate>
                <CampoFormulario etiqueta="RUN (sin puntos ni guion)" tipo="text" {...campo("run")} />
                <CampoFormulario etiqueta="Nombres" tipo="text" {...campo("nombres")} />
                <CampoFormulario etiqueta="Apellidos" tipo="text" {...campo("apellidos")} />
                <CampoFormulario etiqueta="Correo" tipo="email" {...campo("correo")} />
                <CampoFormulario etiqueta="Contraseña" tipo="password" {...campo("contrasenia")} />
                <CampoFormulario etiqueta="Confirmar contraseña" tipo="password" {...campo("confirmarContrasenia")} />
                <CampoFormulario
                    etiqueta="Región"
                    opciones={Regiones.map((r) => r.nombre)}
                    {...campo("region")}
                />
                <CampoFormulario
                    etiqueta="Comuna"
                    opciones={comunas}
                    deshabilitado={!valores.region}
                    {...campo("comuna")}
                />
                <CampoFormulario etiqueta="Dirección" tipo="text" {...campo("direccion")} />
                <Boton tipo="submit" texto="Registrarse" />
                {mensajeConfirmacion.texto && (
                    <p className={mensajeConfirmacion.esExito ? "mensaje-exito" : "mensaje-error"}>
                        {mensajeConfirmacion.texto}
                    </p>
                )}
            </form>
        </section>
    );
}

export default FormularioRegistro;