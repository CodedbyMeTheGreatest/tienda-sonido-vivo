import PlantillaPublica from '../components/templates/PlantillaPublica'
import ListaCarrito from '../components/organisms/ListaCarrito'
import { useCart } from '../context/CarritoContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

function Carrito() {
const { items, totalPrecio, increment, decrementar, eliminar, vaciar } = useCart()

  useTituloPagina('Carrito')

  return (
    <PlantillaPublica>
      <section className="carrito">
        <h2>Tu carrito</h2>
        <ListaCarrito
        items={items}
        total={totalPrecio}
        onIncrement={increment}
        onDecrement={decrementar}
        onRemove={eliminar}
        onClear={vaciar}
        />
      </section>
    </PlantillaPublica>
  )
}

export default Carrito