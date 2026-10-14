import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioRegistro from "../components/organisms/FormularioRegistro";
import useRegistro from "../hooks/useRegistro";
import { useUsuarios } from "../context/UsuarioContext";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function Registro() {
    const { crear } = useUsuarios();

    useTituloPagina("Registro");

    function manejarRegistro(v) {
        crear({
            run: v.run.trim().toUpperCase(),
            nombres: v.nombres.trim(),
            apellidos: v.apellidos.trim(),
            correo: v.correo.trim().toLowerCase(),
            contrasena: v.contrasenia,
            region: v.region,
            comuna: v.comuna,
            rol: "Cliente",
            direccion: v.direccion.trim(),
        });
    }

    const { valores, errores, mensajeConfirmacion, alCambiar, alEnviar } = useRegistro(manejarRegistro);

    return (
        <PlantillaPublica>
            <FormularioRegistro
                valores={valores}
                errores={errores}
                mensajeConfirmacion={mensajeConfirmacion}
                alCambiar={alCambiar}
                alEnviar={alEnviar}
            />
        </PlantillaPublica>
    );
}