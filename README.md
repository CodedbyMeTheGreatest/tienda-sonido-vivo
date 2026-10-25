# Nombre del Equipo
Jelico

## Integrantes
- Jean Lefiman (je.lefiman@duocuc.cl)
- Felix Rojas (fn.rojas@duocuc.cl)
- Corina Urrutia (cor.urrutia@duocuc.cl)

## Caso
Tienda Sonido Vivo

## Descripción del caso
Sonido Vivo es una tienda especializada en instrumentos musicales, equipos de sonido y accesorios para músicos, ubicada en Viña del Mar, Región de Valparaíso. Tiene 11 años de funcionamiento y es atendida por el dueño y dos vendedores.

El catálogo incluye guitarras, bajos, baterías, teclados, amplificadores, micrófonos, pedales de efectos y accesorios. También ofrece reparación de instrumentos de cuerda. El catálogo actual tiene 340 referencias distintas.

Nuestro equipo de desarrollo se encargará de la transformación digital integral de la tienda. El propósito es ofrecer una experiencia renovada y de alto impacto, tanto para la clientela habitual como para los nuevos prospectos. Esto se ejecutará mediante la implementación de tecnologías de desarrollo web avanzadas, resultando en una plataforma robusta que centralizará la información comercial, agilizará el ciclo de ventas y proporcionará herramientas eficientes para la gestión interna."

## Estructura del proyecto
```
tienda-sonido-vivo/
├── src/
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Boton.jsx
│   │   │   ├── BotonHamburguesa.jsx
│   │   │   ├── EnlaceNav.jsx
│   │   │   ├── Imagen.jsx
│   │   │   ├── InputLabel.jsx
│   │   │   ├── Insignia.jsx
│   │   │   ├── Label.jsx
│   │   │   ├── Precio.jsx
│   │   │   └── SelectLabel.jsx
│   │   ├── molecules/
│   │   │   ├── AnimacionExito.jsx
│   │   │   ├── AvisoInicioSesion.jsx
│   │   │   ├── CampoContacto.jsx
│   │   │   ├── CampoFormulario.jsx
│   │   │   ├── ControlCantidad.jsx
│   │   │   ├── EnlaceCarrito.jsx
│   │   │   ├── EstadoPedido.jsx
│   │   │   ├── FichaCodigoStock.jsx
│   │   │   ├── ItemCarrito.jsx
│   │   │   ├── LogoMarca.jsx
│   │   │   ├── MigasDePan.jsx
│   │   │   ├── ResumenCarrito.jsx
│   │   │   ├── SeccionArticulo.jsx
│   │   │   ├── TarjetaBlog.jsx
│   │   │   ├── TarjetaPedido.jsx
│   │   │   └── TarjetaProducto.jsx
│   │   ├── organisms/
│   │   │   ├── ArticuloBlog.jsx
│   │   │   ├── ArticuloBlog.test.jsx
│   │   │   ├── CatalogoProducto.jsx
│   │   │   ├── DetalleProducto.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormularioCheckout.jsx
│   │   │   ├── FormularioContacto.jsx
│   │   │   ├── FormularioContacto.test.jsx
│   │   │   ├── FormularioLogin.jsx
│   │   │   ├── FormularioProducto.jsx
│   │   │   ├── FormularioRegistro.jsx
│   │   │   ├── FormularioUsuario.jsx
│   │   │   ├── FormularioUsuario.test.jsx
│   │   │   ├── ListaBlog.jsx
│   │   │   ├── ListaCarrito.jsx
│   │   │   ├── ListaPedidos.jsx
│   │   │   ├── ModalConfirmacion.jsx
│   │   │   ├── ModalConfirmacionUsuario.jsx
│   │   │   ├── ModalFormularioProducto.jsx
│   │   │   ├── ModalFormularioUsuario.jsx
│   │   │   ├── ModalFormularioUsuario.test.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── Navbar.test.jsx
│   │   │   ├── ResumenCompra.jsx
│   │   │   ├── TablaProductos.jsx
│   │   │   └── TablaUsuarios.jsx
│   │   └── templates/
│   │       ├── PlantillaAdmin.jsx
│   │       └── PlantillaPublica.jsx
│   ├── context/
│   │   ├── CarritoContext.jsx
│   │   ├── PedidoContext.jsx
│   │   ├── ProductContext.jsx
│   │   ├── SesionContext.jsx
│   │   └── UsuarioContext.jsx
│   ├── data/
│   │   ├── Blogs.json
│   │   ├── Productos.json
│   │   ├── Regiones.json
│   │   └── Usuarios.json
│   ├── hooks/
│   │   ├── useCheckout.js
│   │   ├── useLogin.js
│   │   ├── useRegistro.js
│   │   ├── useScroll.js
│   │   └── useTituloPagina.js
│   ├── pages/
│   │   ├── AdminProductos.jsx
│   │   ├── AdminUsuarios.jsx
│   │   ├── Blog.jsx
│   │   ├── Carrito.jsx
│   │   ├── Catalogo.jsx
│   │   ├── Checkout.jsx
│   │   ├── CompraExitosa.jsx
│   │   ├── CompraFallida.jsx
│   │   ├── DetalleBlog.jsx
│   │   ├── Inicio.jsx
│   │   ├── InicioAdmin.jsx
│   │   ├── Login.jsx
│   │   ├── MisPedidos.jsx
│   │   ├── Producto.jsx
│   │   └── Registro.jsx
│   ├── services/
│   │   ├── pedidoService.js
│   │   ├── pedidoService.test.js
│   │   ├── productoService.js
│   │   ├── productoService.test.js
│   │   ├── usuarioService.js
│   │   └── usuarioService.test.js
│   ├── utils/
│   │   ├── categorias.js
│   │   ├── filtrarProductos.js
│   │   ├── pedidos.js
│   │   ├── pedidos.test.js
│   │   ├── validaciones.js
│   │   └── validaciones.test.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
│   └── setupTests.js
```

## Tecnologías y sus versiones
- React + Vite       -> ^19.2.8 y ^8.3.0
- React Bootstrap    -> ^2.10.10
- Vitest             -> ^5.0.5
- Testing Library    -> ^7.0.1
- jsdom              -> ^30.1.3
- BrowserRouter      -> ^7.18.4

## Cómo ejecutar el proyecto
Para ejecutar el proyecto, primero se debe clonar el repositorio o descargar el archivo ZIP del proyecto y descomprimirlo.

Una vez se tenga acceso a las carpetas del proyecto, se deben realizar los siguientes comandos

```
npm install
npm run dev
```

Al ejecutar el proyecto se debería poder acceder a la página con la siguiente ruta

- http://localhost:5173/tienda-sonido-vivo/
  
## Cómo ejecutar las pruebas del proyecto
Para ejecutar las pruebas del proyecto se pueden utilizar los siguientes comandos

```
# Ejecuta todas las pruebas una vez y termina
npm run test:run
#Ejecuta las pruebas una vez y entrega el reporte de cobertura
npm run test:cov
```


## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
https://drive.google.com/drive/folders/1yBC232qOvIjry0WJZZulEDMttQJMAu9i?usp=drive_link
