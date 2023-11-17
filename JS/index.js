let apiKey = 'f216cd46b728d209895b1387e51e9182';

let query = location.search;
let StringToObject = new URLSearchParams(query);
let id = StringToObject.get('id');

// agrego peliculas al index
let urlPelis = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`

fetch(urlPelis)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    let datos = data.results
    let peliculasPopulares = '';

    for (let i = 0; i < datos.length && i < 6; i++) { //solo muestra 6 resultados
      peliculasPopulares += `<article class="peliculas">
                                  <a href='sinopsisPelicula.html?id=${datos[i].id}'>
                                      <img src=${"https://image.tmdb.org/t/p/w300/" + datos[i].poster_path} alt='' />
                                      <p>${datos[i].title}</p>
                                      <p>${datos[i].release_date}</p>
                                  </a>
                              </article>`
    }
    document.getElementById('moviesContainer').innerHTML = peliculasPopulares; //actualiza el contenedor
  })
  .catch(function (error) {
    console.log(error);
  })



// agrego series al index

let urlSeries = `https://api.themoviedb.org/3/tv/popular?api_key=${apiKey}&language=en-US&page=1`

fetch(urlSeries)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    let datos = data.results
    let seriesPopulares = '';

    for (let i = 0; i < datos.length && i < 6; i++) { //solo muestra 6 resultados
      seriesPopulares += `<article class="peliculas">
                                  <a href='sinopsisSerie.html?id=${datos[i].id}'>
                                      <img src=${"https://image.tmdb.org/t/p/w300/" + datos[i].poster_path} alt='' />
                                      <p>${datos[i].original_name}</p>
                                      <p>${datos[i].first_air_date}</p>
                                  </a>
                              </article>`
    }
    document.getElementById('tvShowsContainer').innerHTML = seriesPopulares; //actualiza el contenedor
  })
  .catch(function (error) {
    console.log(error);
  })



// agrego upcoming al index
let urlUpcoming = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`

fetch(urlUpcoming)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data)
    let datos = data.results
    let upcomingPopulares = '';

    for (let i = 0; i < datos.length && i < 6; i++) { //solo muestra 6 resultados
      upcomingPopulares += `<article class="peliculas">
                                  <a href='sinopsisPelicula.html?id=${datos[i].id}'>
                                      <img src=${"https://image.tmdb.org/t/p/w300/" + datos[i].poster_path} alt='' />
                                      <p>${datos[i].title}</p>
                                      <p>${datos[i].release_date}</p>
                                  </a>
                              </article>`
    }
    document.getElementById('upcomingContainer').innerHTML = upcomingPopulares; //actualiza el contenedor
  })
  .catch(function (error) {
    console.log(error);
  })