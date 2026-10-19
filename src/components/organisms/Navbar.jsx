import { useState } from "react";
import LogoMarca from "../molecules/LogoMarca";
import EnlaceCarrito from "../molecules/EnlaceCarrito";
import EnlaceNav from "../atoms/EnlaceNav";
import BotonHamburguesa from "../atoms/BotonHamburguesa";
import { useCart } from "../../context/CarritoContext";
import { useSesion } from "../../context/SesionContext";

const ENLACES = [
  { texto: "Página Principal", to: "/" },
  { texto: "Catálogo", to: "/catalogo" },
  { texto: "Blogs", to: "/blog" },
  { texto: "Mis pedidos", to: "/mis-pedidos" }
];

const ENLACES_INVITADO = [
  { texto: "Iniciar Sesión", to: "/login" },
  { texto: "Registrarse", to: "/registro" },
]

function Navbar() {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const { totalItems } = useCart();
  const { usuario, cerrarSesion } = useSesion();
  const enlacesIniciado = usuario ? ENLACES : [...ENLACES, ...ENLACES_INVITADO]

  function alternarMenu() {
    setMenuAbierto(!menuAbierto);
  }

  function cerrarMenu() {
    setMenuAbierto(false);
  }

  const claseNav = menuAbierto ? "nav-principal activo" : "nav-principal";

  const esAdmin = Boolean(usuario && usuario.rol && usuario.rol.toLowerCase().includes("admin"))
  return (
    <header className="header">
      <LogoMarca
        to="/"
        textoAlt="Sonido Vivo"
        texto="Sonido Vivo"
      />

      <nav className={claseNav}>
        {enlacesIniciado.map((enlace) => (
          <EnlaceNav
            key={enlace.texto}
            to={enlace.to}
            texto={enlace.texto}
            alHacerClick={cerrarMenu}
          />
        ))}

        {usuario && (
          <>
            {esAdmin && (
              <EnlaceNav
                to="/admin/productos"
                texto="Administración"
                alHacerClick={cerrarMenu}
              />
            )}
            <span className="saludo-usuario">Hola, {usuario.nombres}</span>
            <EnlaceNav
              to="/"
              texto="Cerrar sesión"
              alHacerClick={() => {
                cerrarSesion();
                cerrarMenu();
              }}
            />
          </>
        )}

        <EnlaceCarrito
          to="/carrito"
          cantidad={totalItems}
        />
      </nav>

      <BotonHamburguesa abierto={menuAbierto} alHacerClick={alternarMenu} />
    </header>
  );
}

export default Navbar;