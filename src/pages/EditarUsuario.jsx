import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import CampoContacto from "../components/molecules/CampoContacto";
import Label from "../components/atoms/Label";
import Boton from "../components/atoms/Boton";
import { useUsuarios } from "../context/UsuarioContext";
import { esCampoVacio, esTextoValido, esCorreoValido, coincidenContrasenias } from "../utils/validaciones";
import regiones from "../data/Regiones.json";

const OPCIONES_ROL = ["Administrador", "Vendedor", "Comprador"];
const OPCIONES_REGION = regiones.map((r) => r.nombre);

function EditarUsuario() {
    const { run } = useParams(); 
    const navigate = useNavigate();
    const { usuarios, actualizar } = useUsuarios();

    const usuarioActual = usuarios.find((u) => u.run === run);

  
    const [valores, setValores] = useState({
        nombres: usuarioActual?.nombres ?? "",
        apellidos: usuarioActual?.apellidos ?? "",
        correo: usuarioActual?.correo ?? "",
        contrasena: usuarioActual?.contrasena ?? "",
        confirmarContrasena: usuarioActual?.contrasena ?? "",
        region: usuarioActual?.region ?? "",
        comuna: usuarioActual?.comuna ?? "",
        rol: usuarioActual?.rol ?? "",
        direccion: usuarioActual?.direccion ?? "",
    });
    const [errores, setErrores] = useState({});

    const regionElegida = regiones.find((r) => r.nombre === valores.region);
    const opcionesComuna = regionElegida ? regionElegida.comunas : [];

    function validarCampo(nombreCampo, valor) {
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

        const nuevosErrores = {};
        Object.keys(valores).forEach((campo) => {
            nuevosErrores[campo] = validarCampo(campo, valores[campo]);
        });
        setErrores(nuevosErrores);

        const hayErrores = Object.values(nuevosErrores).some((error) => error !== "");
        if (hayErrores) return;

        const { confirmarContrasena, ...cambios } = valores;
        actualizar(run, cambios);
        navigate("/admin/usuarios");
    }

    if (!usuarioActual) {
        return (
            <PlantillaAdmin>
                <div className="listado-admin">
                    <h2>Usuario no encontrado</h2>
                    <p>No existe ningún usuario con el RUN {run}.</p>
                    <Boton className="btn-enlace" texto="Volver al listado" alHacerClick={() => navigate("/admin/usuarios")} />
                </div>
            </PlantillaAdmin>
        );
    }

    return (
        <PlantillaAdmin>
            <div className="listado-admin">
                <h2>Editar Usuario</h2>
                <form className="admin-form" onSubmit={alEnviar} noValidate>
                   
                    <div className="campo-contenedor">
                        <Label paraId="run" texto="RUN" />
                        <p id="run" className="campo">{usuarioActual.run}</p>
                    </div>

                    <CampoContacto id="nombres" etiqueta="Nombres" tipo="text" valor={valores.nombres} alCambiar={alCambiar} requerido esInvalido={!!errores.nombres} mensajeError={errores.nombres} />
                    <CampoContacto id="apellidos" etiqueta="Apellidos" tipo="text" valor={valores.apellidos} alCambiar={alCambiar} requerido esInvalido={!!errores.apellidos} mensajeError={errores.apellidos} />
                    <CampoContacto id="correo" etiqueta="Correo Electrónico" tipo="email" valor={valores.correo} alCambiar={alCambiar} requerido esInvalido={!!errores.correo} mensajeError={errores.correo} />
                    <CampoContacto id="contrasena" etiqueta="Contraseña" tipo="password" valor={valores.contrasena} alCambiar={alCambiar} requerido esInvalido={!!errores.contrasena} mensajeError={errores.contrasena} />
                    <CampoContacto id="confirmarContrasena" etiqueta="Confirmar Contraseña" tipo="password" valor={valores.confirmarContrasena} alCambiar={alCambiar} requerido esInvalido={!!errores.confirmarContrasena} mensajeError={errores.confirmarContrasena} />
                    <CampoContacto id="region" etiqueta="Región" tipo="select" opciones={OPCIONES_REGION} valor={valores.region} alCambiar={alCambiar} requerido esInvalido={!!errores.region} mensajeError={errores.region} />
                    <CampoContacto id="comuna" etiqueta="Comuna" tipo="select" opciones={opcionesComuna} valor={valores.comuna} alCambiar={alCambiar} requerido esInvalido={!!errores.comuna} mensajeError={errores.comuna} />
                    <CampoContacto id="direccion" etiqueta="Dirección" tipo="text" valor={valores.direccion} alCambiar={alCambiar} requerido esInvalido={!!errores.direccion} mensajeError={errores.direccion} />
                    <CampoContacto id="rol" etiqueta="Rol" tipo="select" opciones={OPCIONES_ROL} valor={valores.rol} alCambiar={alCambiar} requerido esInvalido={!!errores.rol} mensajeError={errores.rol} />

                    <Boton tipo="submit" className="boton-primario" texto="Guardar Cambios" />
                </form>
            </div>
        </PlantillaAdmin>
    );
}

export default EditarUsuario;