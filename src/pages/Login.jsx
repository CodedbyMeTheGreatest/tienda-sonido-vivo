import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../components/organisms/FormularioLogin";
import useLogin from "../context/LoginContext"

const SESION_KEY = "sv_sesion";

const USUARIOS = [
    { nombres: "Camila Rojas", correo: "camila.rojas@gmail.com", rol: "Administrador" },
    { nombres: "Mariano Soto", correo: "ma.soto@duoc.cl", rol: "Vendedor" }
];

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

    const { valores, errores, mensajeConfirmacion, alCambiar, alEnviar } = useLogin(manejarInicioSesionExitoso);

    return (
        <Container>
            <Row>
                <Col xs={12} md={8} lg={6}>
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