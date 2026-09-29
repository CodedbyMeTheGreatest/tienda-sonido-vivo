import { Link } from "react-router-dom";

function EnlaceNav(props) {
  return (
    <Link to={props.to} className="enlace-nav" onClick={props.alHacerClick}>
      {props.texto}
    </Link>
  );
}

export default EnlaceNav;