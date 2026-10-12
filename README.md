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
│   ├── assets/
│   │   ├── carrito.png
│   │   ├── hero.png
│   │   ├── logo.png
│   │   ├── placeholder.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components/
│   │   ├── atoms/
│   │   │   ├── Boton.jsx
│   │   │   ├── BotonHamburguesa.jsx
│   │   │   ├── EnlaceNav.jsx
│   │   │   ├── Imagen.jsx
│   │   │   ├── InputLabel.jsx
│   │   │   ├── Insignia.jsx
│   │   │   ├── Label.jsx
│   │   │   └── Precio.jsx
│   │   ├── molecules/
│   │   │   ├── CampoContacto.jsx
│   │   │   ├── CampoLogin.jsx
│   │   │   ├── ControlCantidad.jsx
│   │   │   ├── EnlaceCarrito.jsx
│   │   │   ├── FichaCodigoStock.jsx
│   │   │   ├── ItemCarrito.jsx
│   │   │   ├── LogoMarca.jsx
│   │   │   ├── MigasDePan.jsx
│   │   │   ├── ResumenCarrito.jsx
│   │   │   └── TarjetaProducto.jsx
│   │   ├── organisms/
│   │   │   ├── CatalogoProducto.jsx
│   │   │   ├── DetalleProducto.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── FormularioContacto.jsx
│   │   │   ├── FormularioLogin.jsx
│   │   │   ├── ListaCarrito.jsx
│   │   │   └── Navbar.jsx
│   │   └── templates/
│   │       └── PlantillaPublica.jsx
│   ├── context/
│   │   ├── CarritoContext.jsx
│   │   ├── LoginContext.jsx
│   │   ├── ProductContext.jsx
│   │   └── UsuarioContext.jsx
│   ├── data/
│   │   ├── Productos.json
│   │   └── Usuarios.json
│   ├── hooks/
│   │   └── useTituloPagina.js
│   ├── pages/
│   │   ├── Carrito.jsx
│   │   ├── Catalogo.jsx
│   │   ├── Inicio.jsx
│   │   ├── Login.jsx
│   │   └── Producto.jsx
│   ├── services/
│   │   ├── productoService.js
│   │   └── usuarioService.js
│   ├── utils/
│   │   └── validaciones.js
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .oxlintrc.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
```

## Tecnologías
- React + Vite
- React Bootstrap

## Cómo ejecutar el proyecto
npm install
npm run dev

## Material complementario
Carpeta de Drive con documentos del semestre (ERS y otros):
https://drive.google.com/drive/folders/1yBC232qOvIjry0WJZZulEDMttQJMAu9i?usp=drive_link