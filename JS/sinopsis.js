document.addEventListener('DOMContentLoaded', function () {
    // Obtener el ID de la película de la URL
    let urlParams = new URLSearchParams(window.location.search);
    let movieId = urlParams.get('id');

    
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
    let apiKey = 'f216cd46b728d209895b1387e51e9182';
    let detailsEndpointURL = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;
    let videosEndpointURL = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;

    // Hacer una solicitud a la API de TMDb para obtener detalles de la película
    let detailsPromise = fetch(detailsEndpointURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener detalles de la película.');
            }
            return response.json();
        });

    // solicitud de trailer
    let videosPromise = fetch(videosEndpointURL)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener videos de la película.');
            }
            return response.json();
        });

    // promise.all espera a que se concrten todos los pedidos
    return Promise.all([detailsPromise, videosPromise])
        .then(([details, videos]) => {
            // detalle y video en un solo objeto
            return { ...details, videos };
        })
        .catch(error => {
            console.error('Error al obtener detalles y videos de la película:', error);
        });
}

function mostrarDetallesEnContenedor(movieDetails) {
    let movieDetailContainer = document.getElementById('movieDetailContainer');

    // Limpiar contenido anterior
    movieDetailContainer.innerHTML = '';

    // Crear elementos HTML para mostrar los detalles de la película
    let movieTitle = document.createElement('h1');
    movieTitle.textContent = movieDetails.title;

    let movieOverview = document.createElement('p');
    movieOverview.textContent = movieDetails.overview;

    let movieReleaseYear = document.createElement('p');
    movieReleaseYear.textContent = `Año de estreno: ${getYearFromDate(movieDetails.release_date)}`;

    let movieRating = document.createElement('p');
    movieRating.textContent = `Calificación: ${movieDetails.vote_average}/10`;

    let movieDuration = document.createElement('p');
    movieDuration.textContent = `Duración: ${movieDetails.runtime} minutos`;

    let movieGenres = document.createElement('p');
    movieGenres.textContent = `Género: ${getGenresString(movieDetails.genres)}`;

    //agrega los elementos al contenedor
    movieDetailContainer.appendChild(movieTitle);
    movieDetailContainer.appendChild(movieOverview);
    movieDetailContainer.appendChild(movieReleaseYear);
    movieDetailContainer.appendChild(movieRating);
    movieDetailContainer.appendChild(movieDuration);
    movieDetailContainer.appendChild(movieGenres);

    // portada
    if (movieDetails.poster_path) {
        let posterImage = document.createElement('img');
        posterImage.src = `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`;
        posterImage.alt = `${movieDetails.title} Poster`;
        posterImage.style.maxWidth = '100%';
        movieDetailContainer.appendChild(posterImage);
    }

    // mete trailer si esta disponible
    if (movieDetails.videos && movieDetails.videos.results.length > 0) {
        let trailerContainer = document.createElement('div');
        trailerContainer.className = 'trailerContainer';

        let trailerHeading = document.createElement('h2');
        trailerHeading.textContent = 'Trailer';

        let trailerIframe = document.createElement('iframe');
        trailerIframe.src = `https://www.youtube.com/embed/${movieDetails.videos.results[0].key}`;
        trailerIframe.width = '560';
        trailerIframe.height = '315';
        trailerIframe.allowFullscreen = true;

        trailerContainer.appendChild(trailerHeading);
        trailerContainer.appendChild(trailerIframe);
        movieDetailContainer.appendChild(trailerContainer);
    }
}

function getYearFromDate(dateString) {
    let date = new Date(dateString);
    return date.getFullYear();
}

// obtiene cadena del array de generos
function getGenresString(genres) {
    return genres.map(genre => genre.name).join(', ');
}