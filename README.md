# GEOPORTAL

Página de acceso directo a mis aplicaciones geoespaciales. HTML, CSS y JS puro:
no tiene servidor, bundler ni dependencias.

## Uso

Abre `index.html` en el navegador (doble clic). Cada tarjeta enlaza a la versión
de producción y/o local de la app, y un punto indica si esa dirección responde:
verde = disponible, rojo = no responde.

| App | Producción | Local |
| --- | --- | --- |
| BIDELAN | https://visor.geospatiallab.xyz | — |
| CORTES | https://cortes.geospatiallab.xyz | http://localhost:4100 (`MODO_LOCAL=1` en `backend/.env`, `npm start`) |
| DRONES | https://drones.geospatiallab.xyz (usuario y contraseña) | http://127.0.0.1:5000 (`.\iniciar.ps1`) |

## Añadir una aplicación

Añade un objeto a la lista `aplicaciones` de `js/config.js` (nombre, descripción,
color, etiquetas y URLs). `js/portal.js` genera la tarjeta sola.

## Estructura

- `index.html`: página principal
- `css/estilos.css`: estilos (con modo oscuro automático)
- `js/config.js`: catálogo de aplicaciones
- `js/portal.js`: genera las tarjetas y comprueba la disponibilidad
- `img/`: logotipos
