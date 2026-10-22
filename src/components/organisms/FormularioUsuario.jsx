import { useState } from "react";
import CampoContacto from "../molecules/CampoContacto";
import Label from "../atoms/Label";
import Boton from "../atoms/Boton";
import regiones from "../../data/Regiones.json";
import { esRunValido, esTextoValido, esCorreoValido, coincidenContrasenias} from "../../utils/validaciones";

const OPCIONES_ROL = ["Administrador", "Vendedor", "Comprador"];

function FormularioUsuario(props) {
    const usuario = props.usuarioAEditar; 
    const esEdicion = Boolean(usuario);


    const [valores, setValores] = useState({
        run: usuario ? usuario.run : "",
        nombres: usuario ? usuario.nombres : "",
        apellidos: usuario ? usuario.apellidos : "",
        correo: usuario ? usuario.correo : "",
        contrasena: usuario ? usuario.contrasena : "",
        confirmarContrasena: usuario ? usuario.contrasena : "",
        region: usuario ? usuario.region : "",
        comuna: usuario ? usuario.comuna : "",
        direccion: usuario ? usuario.direccion : "",
        rol: usuario ? usuario.rol : "",
    });
    const [errores, setErrores] = useState({});

    const regionElegida = regiones.find((r) => r.nombre === valores.region);
    const comunas = regionElegida ? regionElegida.comunas : [];

    function validarCampo(nombreCampo, valor) {
        if (nombreCampo === "run") {
            return esRunValido(valor) ? "" : "RUN inválido (sin puntos ni guion, con dígito verificador).";
        }
        if (nombreCampo === "nombres" || nombreCampo === "apellidos") {
            return esTextoValido(valor, 2, 50) ? "" : "Ingrese un valor válido (2 a 50 caracteres).";
        }
        if (nombreCampo === "correo") {
            return esCorreoValido(valor) ? "" : "Correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        }
        if (nombreCampo === "contrasena") {
            return esTextoValido(valor, 4, 10) ? "" : "La contraseña debe tener entre 4 y 10 caracteres.";
        }
        if (nombreCampo === "confirmarContrasena") {
             return coincidenContrasenias(valor, valores.contrasena) ? "" : "Las contraseñas no coinciden.";
        }
        if (nombreCampo === "region" || nombreCampo === "comuna") {
            return esTextoValido(valor) ? "" : "Seleccione una opción.";
        }
        if (nombreCampo === "direccion") {
            return esTextoValido(valor, 2, 80) ? "" : "Este campo es obligatorio.";
        }
        if (nombreCampo === "rol") {
            return esTextoValido(valor) ? "" : "Seleccione un rol.";
        }
        return "";
    }

    function alCambiar(e) {
        const nombre = e.target.name;
        const valor = e.target.value;

        if (nombre === "region") {
            setValores((prev) => ({ ...prev, region: valor, comuna: "" }));
            setErrores((prev) => ({ ...prev, region: validarCampo("region", valor), comuna: "" }));
            return;
        }

        setValores((prev) => ({ ...prev, [nombre]: valor }));
        setErrores((prev) => ({ ...prev, [nombre]: validarCampo(nombre, valor) }));
    }

    function alEnviar(e) {
        e.preventDefault();

        const nuevosErrores = {};
        Object.keys(valores).forEach((campo) => {
            nuevosErrores[campo] = validarCampo(campo, valores[campo]);
        });
        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some((error) => error !== "");
        if (hayErrores) return;

        const { confirmarContrasena, ...datosUsuario } = valores;
        props.onSubmit(datosUsuario);
    }

    return (
        <form className="formulario-usuario" onSubmit={alEnviar} noValidate>
            {esEdicion ? (
                <div className="campo-contenedor">
                    <Label paraId="run" texto="RUN" />
                    <p className="campo campo-solo-lectura">{valores.run}</p>
                </div>
            ) : (
                <CampoContacto id="run" etiqueta="RUN" tipo="text" valor={valores.run} alCambiar={alCambiar} requerido esInvalido={!!errores.run} mensajeError={errores.run} />
            )}
            <CampoContacto id="nombres" etiqueta="Nombres" tipo="text" valor={valores.nombres} alCambiar={alCambiar} requerido esInvalido={!!errores.nombres} mensajeError={errores.nombres} />
            <CampoContacto id="apellidos" etiqueta="Apellidos" tipo="text" valor={valores.apellidos} alCambiar={alCambiar} requerido esInvalido={!!errores.apellidos} mensajeError={errores.apellidos} />
            <CampoContacto id="correo" etiqueta="Correo Electrónico" tipo="email" valor={valores.correo} alCambiar={alCambiar} requerido esInvalido={!!errores.correo} mensajeError={errores.correo} />
            <CampoContacto id="contrasena" etiqueta="Contraseña" tipo="password" valor={valores.contrasena} alCambiar={alCambiar} requerido esInvalido={!!errores.contrasena} mensajeError={errores.contrasena} />
            <CampoContacto id="confirmarContrasena" etiqueta="Confirmar Contraseña" tipo="password" valor={valores.confirmarContrasena} alCambiar={alCambiar} requerido esInvalido={!!errores.confirmarContrasena} mensajeError={errores.confirmarContrasena} />
            <CampoContacto id="region" etiqueta="Región" tipo="select" opciones={regiones.map((r) => r.nombre)} valor={valores.region} alCambiar={alCambiar} requerido esInvalido={!!errores.region} mensajeError={errores.region} />
            <CampoContacto id="comuna" etiqueta="Comuna" tipo="select" opciones={comunas} valor={valores.comuna} alCambiar={alCambiar} requerido esInvalido={!!errores.comuna} mensajeError={errores.comuna} />
            <CampoContacto id="direccion" etiqueta="Dirección" tipo="text" valor={valores.direccion} alCambiar={alCambiar} requerido esInvalido={!!errores.direccion} mensajeError={errores.direccion} />
            <CampoContacto id="rol" etiqueta="Rol" tipo="select" opciones={OPCIONES_ROL} valor={valores.rol} alCambiar={alCambiar} requerido esInvalido={!!errores.rol} mensajeError={errores.rol} />

            <div className="formulario-acciones">
                <Boton tipo="button" className="btn-cancelar" alHacerClick={props.onCancelar} texto="Cancelar" />
                <Boton tipo="submit" className="btn-guardar" texto={esEdicion ? "Guardar cambios" : "Agregar usuario"} />
            </div>
        </form>
    );
}

export default FormularioUsuario;