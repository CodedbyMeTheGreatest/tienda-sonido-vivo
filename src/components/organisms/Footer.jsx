import EnlaceNav from "../atoms/EnlaceNav";

const enlacesFooter = [
    { texto: "Nosotros", to: "/nosotros" },
    { texto: "Contacto", to: "/contacto" },
];


function Footer() {
    return(
        <footer className="footer">
            <nav className="footer-nav">
                {enlacesFooter.map((enlace) => (
                    <EnlaceNav key ={enlace.texto}to={enlace.to}texto={enlace.texto} />
                ))}
            </nav>
            <p className="footer-copyright">© 2026 Sonido Vivo</p>
        </footer>
    )
}

export default Footer;