import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioRegistro from "../components/organisms/FormularioRegistro";
import useRegistro from "../hooks/useRegistro";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario, obtenerMensajeError } from "../services/authService";
import { registroRequestDto } from "../dto/auth.dto";

export default function Registro() {
    const navigate = useNavigate();
    const temporizador = useRef(null);

    useTituloPagina("Registro");

    useEffect(() => () => clearTimeout(temporizador.current), []);

    async function manejarRegistro(v) {
        try {
            await registrarUsuario(registroRequestDto(v));
        }catch(e){
            throw new Error(obtenerMensajeError(e));
        }
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