// Catálogo de aplicaciones del geoportal. Para añadir una nueva app basta con
// añadir un objeto a esta lista; portal.js genera la tarjeta automáticamente.
//
// - urlProduccion: dirección pública (null si la app solo funciona en local).
// - urlLocal: dirección en el propio equipo (null si no tiene modo local).
// - arranqueLocal: comando para levantar la versión local, se muestra en la tarjeta.
const aplicaciones = [
    {
        id: 'bidelan',
        nombre: 'BIDELAN',
        subtitulo: 'Seguimiento de actividades',
        descripcion: 'Visor de puntos kilométricos sobre la red de carreteras: búsqueda por carretera y PK, fichas, adjuntos y edición.',
        icono: 'img/bidelan.png',
        color: '#1f7a5c',
        etiquetas: ['API-IDEE', 'GeoServer', 'Node/Express', 'PostgreSQL'],
        urlProduccion: 'https://visor.geospatiallab.xyz',
        urlLocal: null,
        arranqueLocal: null,
        carpeta: 'C:\\Proyectos\\BIDELAN'
    },
    {
        id: 'cortes',
        nombre: 'CORTES',
        subtitulo: 'Cortes de carril AP-8 · AP-1 · GI-20 · AP-636',
        descripcion: 'Definición, gestión y visualización de cortes de carril por PK inicio–PK fin sobre los ejes calibrados.',
        icono: null,
        sigla: 'CC',
        color: '#c2410c',
        etiquetas: ['API-IDEE', 'PostGIS', 'Node/Express'],
        urlProduccion: 'https://cortes.geospatiallab.xyz',
        urlLocal: 'http://localhost:4100',
        arranqueLocal: 'cd C:\\Proyectos\\CORTES\\backend; npm start   # requiere MODO_LOCAL=1 en backend\\.env',
        carpeta: 'C:\\Proyectos\\CORTES'
    },
    {
        id: 'drones',
        nombre: 'DRONES',
        subtitulo: 'Visor de recorte MDT02 / MDS02',
        descripcion: 'Planificación de zonas de vuelo UAS: dibujo del polígono, hojas CNIG y GeoTIFF recortado del modelo de elevación.',
        icono: null,
        sigla: 'UAS',
        color: '#1d4ed8',
        etiquetas: ['Leaflet', 'Python/Flask', 'PostgreSQL'],
        urlProduccion: null,
        urlLocal: 'http://127.0.0.1:5000',
        arranqueLocal: 'cd C:\\Proyectos\\DRONES; .\\.venv\\Scripts\\Activate.ps1; python server.py',
        carpeta: 'C:\\Proyectos\\DRONES'
    }
];

// Tiempo máximo (ms) que se espera a una app antes de darla por no disponible.
const tiempoEsperaComprobacion = 5000;
