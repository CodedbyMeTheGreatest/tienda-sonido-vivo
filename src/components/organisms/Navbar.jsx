import { useState } from "react";
import LogoMarca from "../molecules/LogoMarca";
import EnlaceCarrito from "../molecules/EnlaceCarrito";
import EnlaceNav from "../atoms/EnlaceNav";
import BotonHamburguesa from "../atoms/BotonHamburguesa";

const ENLACES = [
  { texto: "Página Principal", to: "/" },
  { texto: "Catálogo", to: "/productos" },
  { texto: "Blogs", to: "/blog" },
  { texto: "Iniciar Sesión", to: "/login" },
  { texto: "Registrarse", to: "/registro" },
];

function Navbar(props) {
  const [menuAbierto, setMenuAbierto] = useState(false);

  function alternarMenu() {
    setMenuAbierto(!menuAbierto);
  }

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  const claseNav = menuAbierto ? "nav-principal activo" : "nav-principal";

  return (
    <header className="header">
      <LogoMarca
        to="/"
        textoAlt="Sonido Vivo"
        texto="Sonido Vivo"
      />

      <nav className={claseNav}>
        {ENLACES.map((enlace) => (
          <EnlaceNav
            key={enlace.texto}
            to={enlace.to}
            texto={enlace.texto}
            alHacerClick={cerrarMenu}
          />
        ))}

        <EnlaceCarrito
          to="/compra"
          cantidad={props.cantidadCarrito}
        />
      </nav>

      <BotonHamburguesa abierto={menuAbierto} alHacerClick={alternarMenu} />
    </header>
  );
}

export default Navbar;