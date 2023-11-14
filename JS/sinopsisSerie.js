let queryString = location.search; 
let StringToObject = new URLSearchParams(queryString);
let id = StringToObject.get('id'); 

let urlSerie = `https://api.themoviedb.org/3/tv/${id}?api_key=f216cd46b728d209895b1387e51e9182&language=en-US`;


console.log(urlSerie)
;

fetch(urlSerie)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        let bloque = document.querySelector('.serieDetailContainer')
        let urlImagen = 'https://image.tmdb.org/t/p/w342/'
        bloque.innerHTML += `<div class="serieDetailContainer">
                                <h2>${data.original_title}</h2>
                                <p>${data.release_date}  |  ${data.runtime} minutos</p>
                                <div class="foto_trailer">
                                    <img src="${urlImagen + data.poster_path}" width="300px" height ='520px'>
                                    <div class = "Trailer"></div>
                                    <div class="otros_videos"><p>Todos los videos y trailers</p></div>
                                </div>
                                <ul class="generos"></ul>
                                <p>${data.overview}</p>
                                <p>Calificacion: ${data.vote_average}</p>
                            </div>` 

                            let generos = document.querySelector('.generos');
                            for (let i=0; i<data.genres.length; i++) {
                                generos.innerHTML += `<a href='genres.html?id=${data.genres[i].name}'>
                                                        <ul>${data.genres[i].name}</ul>
                                                        </a>`
                            }
  
    })
    .catch(function(error){
        console.log(error);
    })