import { useNavigate } from 'react-router-dom'
import PlantillaPublica from '../components/templates/PlantillaPublica'
import ListaCarrito from '../components/organisms/ListaCarrito'
import Boton from '../components/atoms/Boton'
import { useCart } from '../context/CarritoContext'
import { useTituloPagina } from '../hooks/useTituloPagina'

function Carrito() {
  const navigate = useNavigate()
  const carrito = useCart()

  useTituloPagina('Carrito')

  return (
    <PlantillaPublica>
      <h2 className="h3 mb-3">Tu carrito</h2>
      <ListaCarrito/>
      {carrito.items.length === 0 && (
        <Boton onClick={() => navigate('/catalogo')}>Ir al catálogo</Boton>
      )}
    </PlantillaPublica>
  )
}

export default Carrito