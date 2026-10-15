import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import CampoContacto from "../components/molecules/CampoContacto";
import Boton from "../components/atoms/Boton";
import { useUsuarios } from "../context/UsuarioContext";
import { esCampoVacio, esTextoValido, esCorreoValido, esRunValido, coincidenContrasenias } from "../utils/validaciones"; // CAMBIO: agregué esCampoVacio
import regiones from "../data/Regiones.json"; 

const OPCIONES_ROL = ["Administrador", "Vendedor", "Comprador"];
const OPCIONES_REGION = regiones.map((r) => r.nombre); 

function NuevoUsuario() {
    const navigate = useNavigate();
    const { crear } = useUsuarios();

    const [valores, setValores] = useState({
        run: "",
        nombres: "",
        apellidos: "",
        correo: "",
        contrasena: "",
        confirmarContrasena: "",
        region: "",
        comuna: "",
        rol: "",
        direccion: "",
    });
    const [errores, setErrores] = useState({});
    const [errorGeneral, setErrorGeneral] = useState("");

  
    const regionElegida = regiones.find((r) => r.nombre === valores.region);
    const opcionesComuna = regionElegida ? regionElegida.comunas : [];

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
        if (nombreCampo === "region") { 
            return esCampoVacio(valor) ? "Seleccione una región." : "";
        }
        if (nombreCampo === "comuna") { 
            return esCampoVacio(valor) ? "Seleccione una comuna." : "";
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
        const { name, value } = e.target;

        if (name === "region") {
            setValores((prev) => ({ ...prev, region: value, comuna: "" }));
            setErrores((prev) => ({ ...prev, region: validarCampo("region", value), comuna: "" }));
            return;
        }

        setValores((prev) => ({ ...prev, [name]: value }));
        setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }));
    }

    function alEnviar(e) {
        e.preventDefault();
        setErrorGeneral("");

        const nuevosErrores = {};
        Object.keys(valores).forEach((campo) => {
            nuevosErrores[campo] = validarCampo(campo, valores[campo]);
        });
        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some((error) => error !== "");
        if (hayErrores) return;

        try {
            const { confirmarContrasena, ...datosUsuario } = valores;
            crear(datosUsuario);
            navigate("/admin/usuarios");
        } catch (error) {
            setErrorGeneral(error.message);
        }
    }

    return (
        <PlantillaAdmin>
            <div className="listado-admin">
                <h2>Agregar Usuario</h2>
                <form className="admin-form" onSubmit={alEnviar} noValidate>
                    <CampoContacto id="run" etiqueta="RUN" tipo="text" valor={valores.run} alCambiar={alCambiar} requerido esInvalido={!!errores.run} mensajeError={errores.run} />
                    <CampoContacto id="nombres" etiqueta="Nombres" tipo="text" valor={valores.nombres} alCambiar={alCambiar} requerido esInvalido={!!errores.nombres} mensajeError={errores.nombres} />
                    <CampoContacto id="apellidos" etiqueta="Apellidos" tipo="text" valor={valores.apellidos} alCambiar={alCambiar} requerido esInvalido={!!errores.apellidos} mensajeError={errores.apellidos} />
                    <CampoContacto id="correo" etiqueta="Correo Electrónico" tipo="email" valor={valores.correo} alCambiar={alCambiar} requerido esInvalido={!!errores.correo} mensajeError={errores.correo} />
                    <CampoContacto id="contrasena" etiqueta="Contraseña" tipo="password" valor={valores.contrasena} alCambiar={alCambiar} requerido esInvalido={!!errores.contrasena} mensajeError={errores.contrasena} />
                    <CampoContacto id="confirmarContrasena" etiqueta="Confirmar Contraseña" tipo="password" valor={valores.confirmarContrasena} alCambiar={alCambiar} requerido esInvalido={!!errores.confirmarContrasena} mensajeError={errores.confirmarContrasena} />
                    <CampoContacto id="region" etiqueta="Región" tipo="select" opciones={OPCIONES_REGION} valor={valores.region} alCambiar={alCambiar} requerido esInvalido={!!errores.region} mensajeError={errores.region} />
                    <CampoContacto id="comuna" etiqueta="Comuna" tipo="select" opciones={opcionesComuna} valor={valores.comuna} alCambiar={alCambiar} requerido esInvalido={!!errores.comuna} mensajeError={errores.comuna} />
                    <CampoContacto id="direccion" etiqueta="Dirección" tipo="text" valor={valores.direccion} alCambiar={alCambiar} requerido esInvalido={!!errores.direccion} mensajeError={errores.direccion} />
                    <CampoContacto id="rol" etiqueta="Rol" tipo="select" opciones={OPCIONES_ROL} valor={valores.rol} alCambiar={alCambiar} requerido esInvalido={!!errores.rol} mensajeError={errores.rol} />

                    {errorGeneral && <p className="error">{errorGeneral}</p>}

                    <Boton tipo="submit" className="boton-primario" texto="Agregar Usuario" />
                </form>
            </div>
        </PlantillaAdmin>
    );
}

export default NuevoUsuario;