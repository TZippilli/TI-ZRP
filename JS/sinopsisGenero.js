let apiKey = 'f216cd46b728d209895b1387e51e9182';

let query = location.search;
let StringToObject = new URLSearchParams(query);
let id = StringToObject.get('id');
let genreName = StringToObject.get("name");
let generoBuscadoDom = document.querySelector("#generoBuscado")
generoBuscadoDom.innerText = genreName
// obtenemos la lista de géneros
let urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
let urlGeneroPeli = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${id}&with_watch_monetization_types=flatrate`;
let peliculas = document.querySelector('.pelis_genero')

fetch(urlGeneroPeli)
    .then(function (response) {
        return response.json()
    }
    )
    .then(function (data) {
        console.log(data);
        for (let i = 0; i < data.results.length; i++) {
            let agregar = false;
            let listaId = data.results[i].genre_ids;
            for (let index = 0; index < listaId.length; index++) {
                if (listaId[index] == id) {
                    agregar = true
                }

            }
            let peliculas = document.querySelector('.movieDetailContainer')
            let urlImagen = 'https://image.tmdb.org/t/p/w342/'
            peliculas.innerHTML += `<div class="movieDetailContainer">
                                <h2>${data.original_title}</h2>
                                <p>${data.release_date}  |  ${data.runtime} minutos</p>
                                <div class="foto_trailer">
                                    <img src="${urlImagen + data.poster_path}" width="300px" height ='520px'>
                                    <div class = "Trailer"></div>
                                    <div class="otrosVideos"><p>Todos los videos y trailers</p></div>
                                </div>
                                <ul class="generos"></ul>
                                <p>${data.overview}</p>
                                <p>Calificacion: ${data.vote_average}</p>
                            </div>`

        }
        return data;
    }
    )
    .catch(function (error) {
        console.log(error);
        return error;
    }
    )