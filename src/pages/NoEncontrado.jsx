import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function NoEncontrado() {
    useTituloPagina("Página no encontrada");
    const navigate = useNavigate();

    return (
        <PlantillaPublica>
            <div className="pagina-error">
                <p className="pagina-error-codigo">404</p>
                <h2>Página no encontrada</h2>
                <p className="pagina-error-texto">
                    La dirección que ingresaste no existe o fue movida.
                </p>
                <div className="pagina-error-acciones">
                    <Boton className="boton-error-primario" texto="Volver al inicio" alHacerClick={() => navigate("/")} />
                    <Boton className="boton-error-secundario" texto="Ir al catálogo" alHacerClick={() => navigate("/catalogo")} />
                </div>
            </div>
        </PlantillaPublica>
    );
}

export default NoEncontrado;