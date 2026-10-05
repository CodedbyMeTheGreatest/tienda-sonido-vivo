import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../components/organisms/FormularioLogin";
import LoginContext from "../context/LoginContext"
import USUARIOS from "../data/Usuarios.json"

const SESION_KEY = "sv_sesion";

function Login() {
    const manejarInicioSesionExitoso = (datosFormulario) => {
        const usuarioEncontrado = USUARIOS.find(
            u => u.correo.toLowerCase() === datosFormulario.correo.toLowerCase()
        );

        const rol = usuarioEncontrado ? usuarioEncontrado.rol : "Cliente";
        const datosSesion = usuarioEncontrado || {
            nombres: "Invitado",
            correo: datosFormulario.correo,
            rol
        };

        localStorage.setItem(SESION_KEY, JSON.stringify(datosSesion));

        /*Aqui redireccionaria, pero como no hay nada mas, no pasa nada por ahora*/
    };

    const { valores, errores, mensajeConfirmacion, alCambiar, alEnviar } = LoginContext(manejarInicioSesionExitoso);

    return (
        <Container>
            <Row>
                <Col xs={12}>
                    <FormularioLogin
                        valores={valores}
                        errores={errores}
                        mensajeConfirmacion={mensajeConfirmacion}
                        alCambiar={alCambiar}
                        alEnviar={alEnviar}
                    />
                </Col>
            </Row>
        </Container>
    );
}

export default Login;