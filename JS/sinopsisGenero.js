let apiKey = 'f216cd46b728d209895b1387e51e9182';

let query = location.search;
let StringToObject = new URLSearchParams(query);
let id = StringToObject.get('id');
let genreName = StringToObject.get("name");
let generoBuscadoDom = document.querySelector("#generoBuscado")
generoBuscadoDom.innerText = genreName

// // Obtener la lista de géneros peliculas
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
       if (agregar == true) {
        let popular = data.results[i]
        peliculas.innerHTML += ` <article class="peliculasGenero"> 
                                <a class="aclickeo" href="./sinopsisPelicula.html?id=${popular.id}">
                                <img src="https://image.tmdb.org/t/p/w500/${popular.poster_path}" alt="" class="img1">
                                <p>${popular.title}</p> 
                                <p>${popular.release_date}</p>
                                </a>
                                </article>
                                 `
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


//agregar detalle genero de series

let urlGeneros = `https://api.themoviedb.org/3/genre/tv/list?api_key=${apiKey}&language=en-US`
let urlGeneroSerie = `https://api.themoviedb.org/3/discover/tv?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&with_genres=${id}&with_watch_monetization_types=flatrate`;
let series = document.querySelector('.series_genero')

fetch(urlGeneroSerie)
.then(function (response) {
    return response.json()
}
)
.then(function (dataSeries) {
    console.log(dataSeries);
    for (let i = 0; i < dataSeries.results.length; i++) {
        let agregar = false;
        let listaId = dataSeries.results[i].genre_ids;
        for (let index = 0; index < listaId.length; index++) {
            if (listaId[index] == id) {
                agregar = true
            }
                         
        }
       if (agregar == true) {
        let popularSerie = dataSeries.results[i]
        series.innerHTML += ` <article class="seriesGenero"> 
                                <a class="aclickeo" href="./sinopsisSerie.html?idSerie=${popularSerie.id}">
                                <img src="https://image.tmdb.org/t/p/w500/${popularSerie.poster_path}" alt="" class="img1">
                                <p>${popularSerie.title}</p> 
                                <p>${popularSerie.release_date}</p>
                                </a>
                                </article>
                                 `
       }
    }
    return dataSeries;
}
)
.catch(function (error) {
    console.log(error);
    return error;
}
)
