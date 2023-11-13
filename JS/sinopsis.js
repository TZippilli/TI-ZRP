// sinopsis.js

document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ID de la película de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const movieId = urlParams.get('id');

    // Verificar si se proporcionó un ID válido
    if (movieId) {
        // Obtener detalles de la película desde la API de TMDb
        obtenerDetallesDeLaPelicula(movieId)
            .then(movieDetails => {
                // Mostrar los detalles en el contenedor
                mostrarDetallesEnContenedor(movieDetails);
            })
            .catch(error => {
                console.error('Error al obtener detalles de la película:', error);
            });
    } else {
        console.error('No se proporcionó un ID de película válido.');
    }
});

function obtenerDetallesDeLaPelicula(movieId) {
    const apiKey = 'f216cd46b728d209895b1387e51e9182';
    const endpointURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    // Hacer una solicitud a la API de TMDb para obtener detalles de la película
    return fetch(endpointURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener detalles de la película.');
            }
            return response.json();
        });
}

function mostrarDetallesEnContenedor(movieDetails) {
    const movieDetailContainer = document.getElementById('movieDetailContainer');

    // Limpiar contenido anterior
    movieDetailContainer.innerHTML = '';

    // Crear elementos HTML para mostrar los detalles de la película
    const movieTitle = document.createElement('h1');
    movieTitle.textContent = movieDetails.title;

    const movieOverview = document.createElement('p');
    movieOverview.textContent = movieDetails.overview;

    // Agregar elementos al contenedor
    movieDetailContainer.appendChild(movieTitle);
    movieDetailContainer.appendChild(movieOverview);

    // Agregar reproductor de video para el trailer (si está disponible)
    if (movieDetails.videos && movieDetails.videos.results.length > 0) {
        const trailerContainer = document.createElement('div');
        trailerContainer.className = 'trailerContainer';

        const trailerHeading = document.createElement('h2');
        trailerHeading.textContent = 'Trailer';

        const trailerIframe = document.createElement('iframe');
        trailerIframe.src = `https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`;
        trailerIframe.width = '560';
        trailerIframe.height = '315';
        trailerIframe.allowFullscreen = true;

        trailerContainer.appendChild(trailerHeading);
        trailerContainer.appendChild(trailerIframe);
        movieDetailContainer.appendChild(trailerContainer);
    }

    // Agregar imagen de la portada
    if (movieDetails.poster_path) {
        const posterImage = document.createElement('img');
        posterImage.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
        posterImage.alt = `${movieDetails.title} Poster`;
        posterImage.style.maxWidth = '100%';
        movieDetailContainer.appendChild(posterImage);
    }
}
