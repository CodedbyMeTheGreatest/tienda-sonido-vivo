import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioRegistro from "../components/organisms/FormularioRegistro";
import useRegistro from "../hooks/useRegistro";
import { useUsuarios } from "../context/UsuarioContext";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function Registro() {
    const navigate = useNavigate();
    const temporizador = useRef(null);
    const { crear } = useUsuarios();

    useTituloPagina("Registro");

    useEffect(() => () => clearTimeout(temporizador.current), []);

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
        temporizador.current = setTimeout(() => navigate("/login"), 2000);
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