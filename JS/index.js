https://api.themoviedb.org/3/movie/76341?api_key=da31463f5e4aa5390f02ed35a0cef0d4
document.getElementById('movieSearchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    // Obtener el valor del campo de búsqueda
    const query = document.getElementById('query').value;

    // Construir la URL del endpoint con la clave de la API de TMDb
    const apiKey = 'da31463f5e4aa5390f02ed35a0cef0d4'; // Reemplaza con tu clave de API de TMDb
    const endpointURL = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;

    // Realizar la solicitud a la API de TMDb
    fetch(endpointURL)
      .then(response => response.json())
      .then(data => {
        // Manejar la respuesta de la API (data)
        displayResults(data.results);
      })
      .catch(error => {
        console.error('Error en la solicitud:', error);
      });
  });

  // Función para mostrar los resultados en el contenedor
  function displayResults(results) {
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.innerHTML = ''; // Limpiar resultados anteriores

    // Crear elementos HTML para cada resultado
    results.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.innerHTML = `<h2>${movie.title}</h2><p>${movie.overview}</p>`;
      resultContainer.appendChild(movieElement);
    });
  }
