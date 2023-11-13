https://api.themoviedb.org/3/movie/76341?api_key=da31463f5e4aa5390f02ed35a0cef0d4

document.getElementById('movieSearchForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const query = document.getElementById('query').value;

  // Construir la URL del endpoint con la clave de la API de TMDb
  const apiKey = 'f216cd46b728d209895b1387e51e9182'; // Reemplaza con tu clave de API de TMDb
  const endpointURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

  fetch(endpointURL)
    .then(response => response.json())
    .then(data => {
      // maneja la respuesta de la API (data), alert si no hay resultados
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

function redirectToSynopsisPage(movieId) {
  // Redirige a la página de sinopsis.html con el ID de la película
  window.location.href = `sinopsis.html?id=${movieId}`;
}

function displayResults(results) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = ''; // limpia resultados anteriores

  // creo elementos HTML para cada resultado
  results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.className = 'dynamicMediaItem';
    
    // Agrega el evento onclick para redirigir a la página de sinopsis.html
    movieElement.onclick = function() {
      redirectToSynopsisPage(movie.id);
    };

    // para que muestre la foto y no la sinopsis
    movieElement.innerHTML = `
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" style="max-width: 100%;">
    `;
    resultContainer.appendChild(movieElement);
  });
}


// PAGINA HOME
document.addEventListener('DOMContentLoaded', function () {
  const apiKey = 'f216cd46b728d209895b1387e51e9182'; 

  // obtiene peliculas mediante la funcion
  getMediaData('movie/popular', 'primer', 'titulo');

  // series populares
  getMediaData('tv/popular', 'segundo', 'titulo');

  // películas populares
  getMediaData('movie/upcoming', 'tercer', 'titulo');
});

function getMediaData(endpoint, firstSubstring, secondSubstring) {
  const apiUrl = `https://api.themoviedb.org/3/${endpoint}?api_key=f216cd46b728d209895b1387e51e9182`;

  // solicitud a la API
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          if (data.results.length > 0) {
              displayMediaData(data.results, firstSubstring, secondSubstring);
          } else {
              console.error(`No se encontraron resultados`);
          }
      })
      .catch(error => console.error(`Error al obtener resultados`, error));
}

function displayMediaData(mediaArray, firstSubstring, secondSubstring, groupName) {
  const containers = document.querySelectorAll(`.${firstSubstring}.${secondSubstring}`);

  // agregar el título del grupo
  Array.from(containers).forEach(container => {
      // crea una fila para los elementos
      const row = document.createElement('div');
      row.className = 'row';

      // agrega los elementos a la fila
      mediaArray.forEach((media, index) => {
          const mediaItem = document.createElement('div');
          mediaItem.className = 'mediaItem';
          mediaItem.innerHTML = `
              <img src="https://image.tmdb.org/t/p/w500${media.poster_path}" alt="${media.title || media.name}">
              <p>${media.title || media.name}</p>
              <p>${media.release_date || media.first_air_date}</p>
          `;

          // evento onclick para redirigir a la página de detalles
          mediaItem.onclick = function () {
              redirectToDetailPage(media.id, media.media_type);
          };

          // agrega el elemento a la fila
          row.appendChild(mediaItem);

          // si agregamos 6 elementos ollegamos al final, agregar la fila al contenedor
          if ((index + 1) % 6 === 0 || index === mediaArray.length - 1) {
              container.appendChild(row);
              // crea una nueva fila para los próximos 6 elementos
              row = document.createElement('div');
              row.className = 'row';
          }
      });
  });
}

function redirectToDetailPage(mediaId, mediaType) {
  // redirige a la página de detalles
  window.location.href = `sinopsis.html?id=${mediaId}&type=${mediaType}`;
}