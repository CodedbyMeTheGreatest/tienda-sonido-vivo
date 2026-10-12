import { Insignia } from "../atoms/Insignia";

function FichaCodigoStock(props) {
  const codigo = props.codigo;
  const stock = props.stock;
  const tieneStock = stock > 0;

  return (
    <div className="ficha-codigo-stock">
      <Insignia tone="neutral">Código: {codigo}</Insignia>
      <Insignia tone={tieneStock ? "success" : "warning"}>
        {tieneStock ? `Stock: ${stock}` : "Sin stock"}
      </Insignia>
    </div>
  );
}

export default FichaCodigoStock;