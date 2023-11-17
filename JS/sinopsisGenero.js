let apiKey = 'f216cd46b728d209895b1387e51e9182';

let query = location.search;
let StringToObject = new URLSearchParams(query);
let id = StringToObject.get('id');
let genreName = StringToObject.get("name");
let generoBuscadoDom = document.querySelector("#generoBuscado")
generoBuscadoDom.innerText = genreName
let tipo = StringToObject.get("tipo");


// // Obtener la lista de géneros peliculas
let urlPorGenero = `https://api.themoviedb.org/3/discover/${tipo}?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${id}&with_watch_monetization_types=flatrate`;
let peliculas = document.querySelector('.pelis_genero')

fetch(urlPorGenero)
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
       if (agregar == true) {
        let popular = data.results[i]
        if(tipo === "movie"){

            peliculas.innerHTML += ` <article class="peliculasGenero"> 
            <a class="aclickeo" href="./sinopsisPelicula.html?id=${popular.id}">
            <img src="https://image.tmdb.org/t/p/w500/${popular.poster_path}" alt="" class="img1">
            <p>${popular.title}</p> 
            <p>${popular.release_date}</p>
            </a>
            </article>
            `
        }else{

            peliculas.innerHTML += ` <article class="peliculasGenero"> 
            <a class="aclickeo" href="./sinopsisSerie.html?id=${popular.id}">
            <img src="https://image.tmdb.org/t/p/w500/${popular.poster_path}" alt="" class="img1">
            <p>${popular.name}</p> 
            <p>${popular.first_air_date}</p>
            </a>
            </article>
            `
        }
       }
    }
    return data;
}
)
.catch(function (error) {
    console.log(error);
    return error;
}
)