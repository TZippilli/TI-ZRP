let consulta = location.search
let stringToObject = new URLSearchParams(consulta)
let buscamos = stringToObject.get('query')

let apiPeli = `https://api.themoviedb.org/3/search/movie?query=${buscamos}&api_key=f216cd46b728d209895b1387e51e9182&language=en-US&page=1&include_adult=false`;

fetch(apiPeli)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        let info = data.results
        let container = document.querySelector('.resultsContainer');
            let peliculas = '';
            for(let i=0; i<info.length; i++){
                peliculas += `<article>
                                    <a href='sinopsis.html?id=${info[i].id}'>
                                    <img src=${"https://image.tmdb.org/t/p/w300/" + info[i].poster_path} alt='' />
                                    <p>${info[i].title}</p>  </a>
                                </article>`
            }
            container.innerHTML = peliculas;   
    })
        
    .catch(function(error){
        console.log(error);
    })
