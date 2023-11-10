https://api.themoviedb.org/3/movie/76341?api_key=da31463f5e4aa5390f02ed35a0cef0d4

document.getElementById('movieSearchForm').addEventListener('submit', function (event) {
  event.preventDefault();


  const query = document.getElementById('query').value;

  // Construir la URL del endpoint con la clave de la API de TMDb
  const apiKey = 'da31463f5e4aa5390f02ed35a0cef0d4'; // Reemplaza con tu clave de API de TMDb
  const endpointURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

 
  fetch(endpointURL)
    .then(response => response.json())
    .then(data => {
      // Manejar la respuesta de la API (data)
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


function displayResults(results) {
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.innerHTML = ''; // limpia resultados anteriores

  // creo elementos HTML para cada resultado
  results.forEach(movie => {
    const movieElement = document.createElement('div');
    movieElement.style.float = 'left'; 
    movieElement.style.width = '200px'; 
    movieElement.style.margin = '10px';
    movieElement.style.textAlign = 'center';

    // para que muestre la foto y no la sinopsis
    movieElement.innerHTML = `
      <h2>${movie.title}</h2>
      <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title} Poster" style="max-width: 100%;">
    `;
    resultContainer.appendChild(movieElement);
  });
}