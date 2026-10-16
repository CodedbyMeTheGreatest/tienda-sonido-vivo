import PlantillaPublica from "../components/templates/PlantillaPublica";
import ListaBlog from "../components/organisms/ListaBlog";
import entradas from "../data/Blogs.json";

function Blog() {
    return (
        <PlantillaPublica>
            <ListaBlog entradas={entradas} />
        </PlantillaPublica>
    );
}

export default Blog;