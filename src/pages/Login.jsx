import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioLogin from "../components/organisms/FormularioLogin";
import useLogin from "../hooks/useLogin";
import { useSesion } from "../context/SesionContext";
import { useTituloPagina } from "../hooks/useTituloPagina";


function Login() {
    const navigate = useNavigate()
    const { iniciarSesion } = useSesion()

    useTituloPagina("Iniciar Sesion");


    function manejarInicioSesionExitoso(valores) {
        const exito = iniciarSesion(valores.correo, valores.contrasenia)
        if (exito) navigate ("/")
        return exito
    }

    const { valores, errores, mensajeConfirmacion, alCambiar, alEnviar } = useLogin(manejarInicioSesionExitoso);

    return (
        <PlantillaPublica>
            <FormularioLogin
                valores={valores}
                errores={errores}
                mensajeConfirmacion={mensajeConfirmacion}
                alCambiar={alCambiar}
                alEnviar={alEnviar}
            />
        </PlantillaPublica>
    );
}

export default Login;