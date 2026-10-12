import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

function MigasDePan(props) {
    const items = props.items || [];
    return (
        <Breadcrumb className="breadcrumb-nombre">
            {items.map((item, index) => {
                const esUltimo = index === items.length - 1;
                return (
                    <Breadcrumb.Item
                        key={index}
                        active={esUltimo}
                        linkAs={esUltimo ? "span" : Link}
                        linkProps={esUltimo ? {} : { to: item.url }}
                    >
                        {item.texto}
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
}

export default MigasDePan;