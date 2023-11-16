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
        bloque.innerHTML += `<div class="containerDetallePelis">
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
            generos.innerHTML += `| <a href='sinopsisGenero.html?id=${data.genres[i].id}&name=${data.genres[i].name}'>
                                                        ${data.genres[i].name}
                                                        | </a>  `
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
        if (data.results.length === 0 || !data.results.some(trailer => trailer.type === 'Trailer')) { //si no hay trailers disponibles
            Trailer.innerHTML = "No hay trailers disponibles";
            return;
        }
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].type == 'Trailer') {
                Trailer.innerHTML += `<iframe src = "${urlYoutube + data.results[i].key}" width= "480px" height = "340px"></iframe>`

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


//recomendaciones
let urlRecomendaciones = `https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=f216cd46b728d209895b1387e51e9182&language=en-US&page=1`
fetch(urlRecomendaciones)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let section = document.querySelector('.recomendaciones')
        let urlImgReco = 'https://image.tmdb.org/t/p/w300/'
        section.innerHTML += `
                            <h2> Recomendaciones:</h2>
                            <section class="recomendaciones_2">
                            <article>
                            <a href='sinopsisPelicula.html?id=${data.results[0].id}'>
                            <img src="${urlImgReco + data.results[0].poster_path}">
                            <p>${data.results[0].original_title}</p>
                            </a>
                            </article>
                            <article>
                            <a href='sinopsisPelicula.html?id=${data.results[1].id}'>
                            <img src="${urlImgReco + data.results[1].poster_path}">
                            <p>${data.results[1].original_title}</p>
                            </a>
                            </article>
                            <article>
                            <a href='sinopsisPelicula.html?id=${data.results[2].id}'>
                            <img src="${urlImgReco + data.results[2].poster_path}">
                            <p>${data.results[2].original_title}</p>
                            </a>
                            </article>
                            <article>
                            <a href='sinopsisPelicula.html?id=${data.results[3].id}'>
                            <img src="${urlImgReco + data.results[3].poster_path}">
                            <p>${data.results[3].original_title}</p>
                            </a>
                            </article>
                            </section>`
    })
    .catch(function (error) {
        console.log(error);
    })

let buttonRecomendaciones = document.querySelector(".recomendacionesButton");
let recomendaciones = document.querySelector(".recomendaciones");

buttonRecomendaciones.addEventListener('click', function (e) {
    buttonRecomendaciones.style.display = "none";

    recomendaciones.style.display = "block";
})