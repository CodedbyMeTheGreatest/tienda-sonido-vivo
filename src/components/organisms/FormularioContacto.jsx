import { useState } from "react";
import CampoContacto from "../molecules/CampoContacto";
import Boton from "../atoms/Boton";
import { esCampoVacio, esTextoValido, esCorreoValido, esTelefonoValido } from "../../utils/validaciones";

const OPCIONES_MOTIVO = ["Consulta general", "Compra especial", "Reclamo", "Otro"];

function FormularioContacto() {
    const [valores, setValores] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        motivo: "",
        mensaje: "",
    });
    const [errores, setErrores] = useState({
        nombre: "",
        correo: "",
        telefono: "",
        motivo: "",
        mensaje: "",
    });
    const [enviado, setEnviado] = useState(false);

    function validarCampo(nombreCampo, valor) {
        if (nombreCampo === "nombre") {
            return esTextoValido(valor, 2, 50) ? "" : "Ingrese un nombre válido (2 a 50 caracteres).";
        }
        if (nombreCampo === "correo") {
            return esCorreoValido(valor) ? "" : "Correo inválido. Solo se aceptan @duoc.cl, @profesor.duoc.cl o @gmail.com.";
        }
        if (nombreCampo === "telefono") {
            if (esCampoVacio(valor)) return "Ingrese su teléfono.";
            return esTelefonoValido(valor) ? "" : "Ingrese un teléfono válido.";
        }
        if (nombreCampo === "motivo") {
            return esCampoVacio(valor) ? "Seleccione un motivo." : "";
        }
        if (nombreCampo === "mensaje") {
            return esTextoValido(valor, 10, 500) ? "" : "El mensaje debe tener entre 10 y 500 caracteres.";
        }
        return "";
    }

    function alCambiar(e) {
        const { name, value } = e.target;
        setValores((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
    }

    function alEnviar(e) {
        e.preventDefault();

        const nuevosErrores = {
            nombre: validarCampo("nombre", valores.nombre),
            correo: validarCampo("correo", valores.correo),
            telefono: validarCampo("telefono", valores.telefono),
            motivo: validarCampo("motivo", valores.motivo),
            mensaje: validarCampo("mensaje", valores.mensaje),
        };
        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some((error) => error !== "");
        if (hayErrores) {
            setEnviado(false);
            return;
        }

        setEnviado(true);
        setValores({ nombre: "", correo: "", telefono: "", motivo: "", mensaje: "" });
    }

    return (
        <form className="formulario-contacto" onSubmit={alEnviar} noValidate>
            <CampoContacto
                id="nombre"
                etiqueta="Nombre Completo"
                tipo="text"
                valor={valores.nombre}
                alCambiar={alCambiar}
                requerido
                esInvalido={!!errores.nombre}
                mensajeError={errores.nombre}
            />
            <CampoContacto
                id="correo"
                etiqueta="Correo Electrónico"
                tipo="email"
                valor={valores.correo}
                alCambiar={alCambiar}
                requerido
                esInvalido={!!errores.correo}
                mensajeError={errores.correo}
            />
            <CampoContacto
                id="telefono"
                etiqueta="Teléfono"
                tipo="tel"
                valor={valores.telefono}
                alCambiar={alCambiar}
                requerido
                esInvalido={!!errores.telefono}
                mensajeError={errores.telefono}
            />
            <CampoContacto
                id="motivo"
                etiqueta="Motivo de la consulta"
                tipo="select"
                opciones={OPCIONES_MOTIVO}
                valor={valores.motivo}
                alCambiar={alCambiar}
                requerido
                esInvalido={!!errores.motivo}
                mensajeError={errores.motivo}
            />
            <CampoContacto
                id="mensaje"
                etiqueta="Mensaje"
                tipo="textarea"
                valor={valores.mensaje}
                alCambiar={alCambiar}
                requerido
                esInvalido={!!errores.mensaje}
                mensajeError={errores.mensaje}
            />

            <Boton tipo="submit" className="boton-primario" texto="Enviar consulta" />

            {enviado && <p className="texto-exito">¡Gracias! Tu consulta fue enviada.</p>}
        </form>
    );
}

export default FormularioContacto;