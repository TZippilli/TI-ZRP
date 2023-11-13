document.getElementById('movieSearchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const query = document.getElementById('query').value;
  const apiKey = 'f216cd46b728d209895b1387e51e9182';
  const endpointURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  fetch(endpointURL)
    .then(response => response.json())
    .then(data => {
      if (data.results.length === 0) {
        alert("No se encontraron resultados.");
      } else {
        displayResults(data.results);
      }
    })
    .catch(error => {
      console.error('Error en la solicitud:', error);
    });
});

function redirectToDetailPage(movieId, mediaType) {
  const url = `sinopsis.html?id=${movieId}&type=${mediaType}`;
  window.location.href = url;
}

function displayResults(results) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = '';

  results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'dynamicMediaItem';

    movieElement.onclick = function() {
      redirectToDetailPage(movie.id, 'movie'); // 'movie' es el tipo de medio para películas
    };

    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" style="max-width: 100%;">
    `;
    resultContainer.appendChild(movieElement);
  });
}

document.addEventListener('DOMContentLoaded', function () {
  // Clave de la API de TMDb
  const apiKey = 'f216cd46b728d209895b1387e51e9182';

  // Obtener películas populares
  getMediaData('movie/popular', 'primer', 'titulo', 'moviesContainer', 'movie');

  // Obtener series populares
  getMediaData('tv/popular', 'segundo', 'titulo', 'tvShowsContainer', 'tv');

  // Obtener próximos estrenos
  getMediaData('movie/upcoming', 'tercer', 'titulo', 'upcomingContainer', 'movie');
});

function getMediaData(endpoint, firstSubstring, secondSubstring, containerId, mediaType) {
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=f216cd46b728d209895b1387e51e9182`;

  // Realizar solicitud a la API
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          if (data.results.length > 0) {
              // Mostrar los datos en el contenedor correspondiente
              displayMediaData(data.results, firstSubstring, secondSubstring, containerId, mediaType);
          } else {
              console.error(`No se encontraron resultados para ${endpoint}`);
          }
      })
      .catch(error => console.error(`Error al obtener resultados de ${endpoint}`, error));
}

function displayMediaData(mediaArray, firstSubstring, secondSubstring, containerId, mediaType) {
  const container = document.getElementById(containerId);

  // Limpiar resultados anteriores
  container.innerHTML = '';

  // Crear elementos HTML para cada resultado
  mediaArray.forEach((media, index) => {
      const mediaItem = document.createElement('div');
      mediaItem.className = 'mediaItem';

      // Utilizar el título para películas o el nombre para series
      const titleOrName = media.title || media.name;

      // Agregar elementos al ítem de medios
      mediaItem.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${media.poster_path}" alt="${titleOrName} Poster" style="max-width: 100%;">
          <p>${titleOrName}</p>
          <p>${media.release_date || media.first_air_date}</p>
      `;

      // Agregar evento onclick para redirigir a la página de detalles
      mediaItem.onclick = function () {
          redirectToDetailPage(media.id, mediaType);
      };

      // Agregar el ítem al contenedor
      container.appendChild(mediaItem);

      // Si hemos agregado 6 elementos, crear una nueva fila en el contenedor
      // si agregamos 6 elementos ollegamos al final, agregar la fila al contenedor
      if ((index + 1) % 6 === 0 || index === mediaArray.length - 1) {
        container.appendChild(row);
        // crea una nueva fila para los próximos 6 elementos
        row = document.createElement('div');
        row.className = 'row';
      }
  });
}

function redirectToDetailPage(mediaId, mediaType) {
  // Redirigir a la página de detalles con el ID y el tipo de medio
  window.location.href = `sinopsis.html?id=${mediaId}&type=${mediaType}`;
}
