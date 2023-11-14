let apiKey = 'f216cd46b728d209895b1387e51e9182';

let query = location.search;
let StringToObject = new URLSearchParams(query);
let id = StringToObject.get('id');
let genreName = StringToObject.get("name");
let generoBuscadoDom = document.querySelector("#generoBuscado")
generoBuscadoDom.innerText = genreName
// // Obtener la lista de géneros
let urlGeneros = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`


