import { useNavigate, useParams } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import ArticuloBlog from "../components/organisms/ArticuloBlog";
import Boton from "../components/atoms/Boton";
import entradas from "../data/Blogs.json";
import { useTituloPagina } from "../hooks/useTituloPagina";

function DetalleBlog() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    const articulo = entradas.find((e) => String(e.id) === id);
    
    if (!articulo) {
        useTituloPagina('Artículo no encontrado')
        return (
            <PlantillaPublica>
                <div className="articulo-completo">
                    <h2>Artículo no encontrado</h2>
                    <p>No existe ninguna entrada con ese identificador.</p>
                    <Boton className="boton-catalogo-añadir-producto" texto="Volver al blog" alHacerClick={() => navigate("/blog")} />
                </div>
            </PlantillaPublica>
        );
    }

    useTituloPagina(articulo.titulo)

    return (
        <PlantillaPublica>
            <ArticuloBlog articulo={articulo} />
        </PlantillaPublica>
    );
}

export default DetalleBlog;