import PlantillaPublica from "../components/templates/PlantillaPublica";
import ListaBlog from "../components/organisms/ListaBlog";
import entradas from "../data/Blogs.json";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Blog() {
    useTituloPagina('Blogs')
    return (
        <PlantillaPublica>
            <ListaBlog entradas={entradas} />
        </PlantillaPublica>
    );
}

export default Blog;