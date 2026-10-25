// Genera las tarjetas de las aplicaciones definidas en config.js y comprueba
// si cada dirección responde.

function crearElemento(etiqueta, clase, texto) {
    const elemento = document.createElement(etiqueta);
    if (clase) {
        elemento.className = clase;
    }
    if (texto) {
        elemento.textContent = texto;
    }
    return elemento;
}

// Con mode 'no-cors' la respuesta es opaca, pero si llega significa que el
// servidor está levantado; un error de red o el tiempo agotado indican lo contrario.
function comprobarDisponibilidad(url) {
    const controlador = new AbortController();
    const temporizador = setTimeout(function () {
        controlador.abort();
    }, tiempoEsperaComprobacion);

    return fetch(url, { mode: 'no-cors', cache: 'no-store', signal: controlador.signal })
        .then(function () {
            return true;
        })
        .catch(function () {
            return false;
        })
        .finally(function () {
            clearTimeout(temporizador);
        });
}

function crearAcceso(texto, url, tipo) {
    const acceso = crearElemento('div', 'acceso');

    const enlace = crearElemento('a', 'boton-acceso boton-' + tipo);
    enlace.href = url;
    enlace.target = '_blank';
    enlace.rel = 'noopener';
    enlace.appendChild(crearElemento('span', 'texto-boton', texto));

    const estado = crearElemento('span', 'estado estado-comprobando');
    estado.title = 'Comprobando…';
    enlace.appendChild(estado);

    acceso.appendChild(enlace);
    acceso.appendChild(crearElemento('span', 'url-acceso', url.replace(/^https?:\/\//, '')));

    comprobarDisponibilidad(url).then(function (disponible) {
        estado.className = 'estado ' + (disponible ? 'estado-activo' : 'estado-caido');
        estado.title = disponible ? 'Disponible' : 'No responde';
    });

    return acceso;
}

function copiarAlPortapapeles(texto, boton) {
    navigator.clipboard.writeText(texto)
        .then(function () {
            boton.textContent = 'Copiado';
            setTimeout(function () {
                boton.textContent = 'Copiar';
            }, 1500);
        })
        .catch(function () {
            boton.textContent = 'Error';
        });
}

function crearTarjeta(app) {
    const tarjeta = crearElemento('article', 'tarjeta-app');
    tarjeta.style.setProperty('--color-app', app.color);

    const cabecera = crearElemento('header', 'cabecera-tarjeta');
    if (app.icono) {
        const imagen = crearElemento('img', 'icono-app');
        imagen.src = app.icono;
        imagen.alt = app.nombre;
        cabecera.appendChild(imagen);
    } else {
        cabecera.appendChild(crearElemento('div', 'icono-app icono-sigla', app.sigla));
    }

    const titulos = crearElemento('div', 'titulos-tarjeta');
    titulos.appendChild(crearElemento('h2', null, app.nombre));
    titulos.appendChild(crearElemento('p', 'subtitulo-app', app.subtitulo));
    cabecera.appendChild(titulos);
    tarjeta.appendChild(cabecera);

    tarjeta.appendChild(crearElemento('p', 'descripcion-app', app.descripcion));

    const etiquetas = crearElemento('ul', 'lista-etiquetas');
    app.etiquetas.forEach(function (etiqueta) {
        etiquetas.appendChild(crearElemento('li', 'etiqueta', etiqueta));
    });
    tarjeta.appendChild(etiquetas);

    const accesos = crearElemento('div', 'bloque-accesos');
    if (app.urlProduccion) {
        accesos.appendChild(crearAcceso('Abrir', app.urlProduccion, 'produccion'));
    }
    if (app.urlLocal) {
        accesos.appendChild(crearAcceso('Local', app.urlLocal, 'local'));
    }
    tarjeta.appendChild(accesos);

    if (app.arranqueLocal) {
        const detalle = crearElemento('details', 'arranque-local');
        detalle.appendChild(crearElemento('summary', null, 'Cómo arrancar en local'));

        const fila = crearElemento('div', 'fila-comando');
        fila.appendChild(crearElemento('code', null, app.arranqueLocal));
        const botonCopiar = crearElemento('button', 'boton-copiar', 'Copiar');
        botonCopiar.type = 'button';
        botonCopiar.addEventListener('click', function () {
            copiarAlPortapapeles(app.arranqueLocal, botonCopiar);
        });
        fila.appendChild(botonCopiar);
        detalle.appendChild(fila);
        tarjeta.appendChild(detalle);
    }

    tarjeta.appendChild(crearElemento('p', 'carpeta-app', app.carpeta));

    return tarjeta;
}

function iniciarPortal() {
    const contenedor = document.getElementById('listaAplicaciones');
    aplicaciones.forEach(function (app) {
        contenedor.appendChild(crearTarjeta(app));
    });
    document.getElementById('numeroAplicaciones').textContent = aplicaciones.length;
}

document.addEventListener('DOMContentLoaded', iniciarPortal);
