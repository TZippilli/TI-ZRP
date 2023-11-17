let queryString = location.search;
let StringToObject = new URLSearchParams(queryString);
let id = StringToObject.get('id');

let urlSerie = `https://api.themoviedb.org/3/tv/${id}?api_key=f216cd46b728d209895b1387e51e9182&language=en-US`;


console.log(urlSerie)
    ;

fetch(urlSerie)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let bloque = document.querySelector('.serieDetailContainer')
        let urlImagen = 'https://image.tmdb.org/t/p/w342/'
        bloque.innerHTML += `<div class="detalleSerie">
                                <h2>${data.original_name}</h2>
                                <p>${data.first_air_date}  |  ${data.number_of_episodes} episodios </p>
                                <div class="foto_trailer">
                                    <img src="${urlImagen + data.poster_path}" width="300px" height ='520px'>
                                    <div class = "Trailer"></div>
                                    
                                </div>
                                <div class="generos"></div>
                                <p>${data.overview}</p>
                                <p>Calificacion: ${data.vote_average}</p>
                            </div>`

        let generos = document.querySelector('.generos');
        for (let i = 0; i < data.genres.length; i++) {
            generos.innerHTML += `| <a href='sinopsisGenero.html?id=${data.genres[i].id}&name=${data.genres[i].name}'>
                                                        ${data.genres[i].name}
                                                        | </a>  `}
    })
    .catch(function (error) {
        console.log(error);
    })


// agrego trailer y mas videos (opcional)
let urlTrailer = `https://api.themoviedb.org/3/tv/${id}/videos?api_key=f216cd46b728d209895b1387e51e9182&language=en-US`;

fetch(urlTrailer)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        let urlYoutube = 'https://www.youtube.com/embed/';
        let Trailer = document.querySelector('.Trailer');
        let videos = document.querySelector('.otrosVideos');
        if (data.results.length === 0 || !data.results.some(trailer => trailer.type === 'Trailer')) { //si no hay trailers disponibles
            Trailer.innerHTML = "No hay trailers disponibles";
            return;
        }

        // busco el trailer y lo muestro en el div .Trailer
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].type == 'Trailer') {
                Trailer.innerHTML += `<iframe src="${urlYoutube + data.results[i].key}" width= "650px" height = "420px"></iframe>`;
                break;
            }
        }

        // muestro los otros videos en .otrosVideos
        for (let i = 0; i < data.results.length; i++) {
            if (data.results[i].type == 'Trailer') {
                videos.innerHTML += `<iframe src="${urlYoutube + data.results[i].key}"></iframe>`;
            }
        }
    })
    .catch(function (error) {
        console.log(error);
    });



//recomendaciones series
let urlRecomendacionesSerie = `https://api.themoviedb.org/3/tv/${id}/recommendations?api_key=f216cd46b728d209895b1387e51e9182&language=en-US&page=1`
fetch(urlRecomendacionesSerie)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);

        let section = document.querySelector('.recomendacionesSerie')
        let urlImgReco = 'https://image.tmdb.org/t/p/w300/'
        section.innerHTML += `
                            <h2> Recomendaciones:</h2>
                            <section class="recomendaciones_3">
                            <article>
                            <a href='sinopsisSerie.html?id=${data.results[0].id}'>
                            <img src="${urlImgReco + data.results[0].poster_path}">
                            <p>${data.results[0].original_name}</p>
                            </a>
                            </article>
                            <article>
                            <a href='sinopsisSerie.html?id=${data.results[1].id}'>
                            <img src="${urlImgReco + data.results[1].poster_path}">
                            <p>${data.results[1].original_name}</p>
                            </a>
                            </article>
                            <article>
                            <a href='sinopsisSerie.html?id=${data.results[2].id}'>
                            <img src="${urlImgReco + data.results[2].poster_path}">
                            <p>${data.results[2].original_name}</p>
                            </a>
                            </article>
                            <article>
                            <a href='sinopsisSerie.html?id=${data.results[3].id}'>
                            <img src="${urlImgReco + data.results[3].poster_path}">
                            <p>${data.results[3].original_name}</p>
                            </a>
                            </article>
                            </section>`
    })
    .catch(function (error) {
        console.log(error);
    })

let buttonRecomendacionesSerie = document.querySelector(".recomendacionesButtonSerie");
let recomendacionesSerie = document.querySelector(".recomendacionesSerie");

buttonRecomendacionesSerie.addEventListener('click', function (e) {
    buttonRecomendacionesSerie.style.display = "none";

    recomendacionesSerie.style.display = "block";
})