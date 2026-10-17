import PlantillaPublica from '../components/templates/PlantillaPublica'
import ListaCarrito from '../components/organisms/ListaCarrito'
import { useCart } from '../context/CarritoContext'
import { useTituloPagina } from '../hooks/useTituloPagina'
import { useNavigate } from 'react-router-dom'
import { useSesion } from '../context/SesionContext'

function Carrito() {
const { items, totalPrecio, increment, decrementar, eliminar, vaciar } = useCart()
const navigate = useNavigate()
const { usuario } = useSesion()

  useTituloPagina('Carrito')

function irACheckout() {
  navigate(usuario ? "/checkout" : "/login")
}

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
        onCheckout={irACheckout}
        />
      </section>
    </PlantillaPublica>
  )
}

export default Carrito