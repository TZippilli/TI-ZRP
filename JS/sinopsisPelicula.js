let queryString = location.search;
let StringToObject = new URLSearchParams(queryString);
let id = StringToObject.get('id');

let urlPeli = `https://api.themoviedb.org/3/movie/${id}?api_key=f216cd46b728d209895b1387e51e9182&language=en-US`

console.log(urlPeli);

fetch(urlPeli)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let bloque = document.querySelector('.movieDetailContainer')
        let urlImagen = 'https://image.tmdb.org/t/p/w342/'
        bloque.innerHTML += `<div class="movieDetailContainer">
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

        let generos = document.querySelector('.generos');
        for (let i = 0; i < data.genres.length; i++) {
            generos.innerHTML += `<a href='sinopsisGenero.html?id=${data.genres[i].id}&name=${data.genres[i].name}'>
                                                        ${data.genres[i].name}
                                                        </a>`
        }

    })
    .catch(function (error) {
        console.log(error);
    })





// agrego trailer y mas videos (opcional)
let urlTrailer = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=f216cd46b728d209895b1387e51e9182&language=en-US`
fetch(urlTrailer)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let urlYoutube = 'https://www.youtube.com/embed/'
        let Trailer = document.querySelector('.Trailer')
        let videos = document.querySelector('.otrosVideos')
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].type == 'Trailer') {
                Trailer.innerHTML += `<iframe src = "${urlYoutube + data.results[i].key}" width= "850px" height = "520px"></iframe>`

                break
            }
        }
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].type == 'Trailer') {
                videos.innerHTML += `<iframe src = "${urlYoutube + data.results[i].key}" ></iframe>`
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    })