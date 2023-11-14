let queryString = location.search; 
let queryStringToObject = new URLSearchParams(queryString);
let id = queryStringToObject.get('id'); 
let urlSeries = `https://api.themoviedb.org/3/discover/movie?api_key=f216cd46b728d209895b1387e51e9182&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${id}&with_watch_monetization_types=flatrate`

console.log(urlSeries)

fetch(urlSeries)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);

        let section = document.querySelector('.nombre_genero')
        section.innerHTML += `<div class="nombre">
                                <h1>${data.genre}</h1>
                            </div>`   
        
        let pelisGenero = document.querySelector('.pelis_genero')
        for (let i=0; i<data.poster_path.length; i++) {
            pelisGenero.innerHTML += `<a href='sinopsis.html?id=${data[i].id}'>
                                        <img src=${"https://image.tmdb.org/t/p/w200/" + data[i].poster_path} alt='' />
                                        <p>${data[i].name}</p>
                                    </a>`
        }
    })
    .catch(function(error){
        console.log(error);
    })