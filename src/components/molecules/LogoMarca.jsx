import { Link } from "react-router-dom";
import logoSonidoVivo from "../../assets/logo.png";

function LogoMarca(props) {
  return (
    <Link to={props.to} className="logo-enlace">
      <img src={logoSonidoVivo} alt={props.textoAlt} className="logo-imagen" />
      <h1 className="logo-titulo">{props.texto}</h1>
    </Link>
  );
}

export default LogoMarca;