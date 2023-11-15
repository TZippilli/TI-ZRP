let consulta = location.search;
let stringToObject = new URLSearchParams(consulta);
let buscamos = stringToObject.get('query');

let apiPeli = `https://api.themoviedb.org/3/search/movie?query=${buscamos}&api_key=f216cd46b728d209895b1387e51e9182&language=en-US&page=1&include_adult=false`;
let infobusqueda = document.querySelector('.results');

fetch(apiPeli)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let container = document.querySelector('.resultsContainer');
        if (data.results.length === 0) {
            container.innerHTML = `No hay resultados para su búsqueda de películas: <strong>"${buscamos}"</strong>`;
        } else {
            container.innerHTML = `Estos son los títulos de películas que coinciden con tu búsqueda de <strong>"${buscamos}"</strong>:`;
            let peliculas = '';
            data.results.forEach(movie => {
                peliculas += `<article>
                                    <a href='sinopsisPelicula.html?id=${movie.id}'>
                                        <img src=${"https://image.tmdb.org/t/p/w300/" + movie.poster_path} alt='' />
                                        <p>${movie.title}</p>
                                    </a>
                                </article>`;
            });
            container.innerHTML += peliculas;
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
