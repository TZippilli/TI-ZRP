// generos peliculas
let urlGeneros= "https://api.themoviedb.org/3/genre/movie/list?api_key=f216cd46b728d209895b1387e51e9182&language=en-US"
fetch(urlGeneros)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data)
        let datos = data.genres
        let container = document.querySelector('.todosGeneros');
        let titulosGeneros ='';
        for (let i=0; i<datos.length; i++){
            titulosGeneros += `<article class="${datos[i].name}">
                                    <a href='sinopsisGenero.html?id=${datos[i].id}&name=${data.genres[i].name}'>
                                        <h2>${datos[i].name}</h2>
                                    </a>
                                </article>`

        }
        container.innerHTML = titulosGeneros;
    })
    .catch(function(error){
        console.log(error);
    })

// generos series
    let urlGenerosSeries= `https://api.themoviedb.org/3/genre/tv/list?api_key=f216cd46b728d209895b1387e51e9182&language=en-US`
    fetch(urlGenerosSeries)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data)
            let datos = data.genres
            let container = document.querySelector('.todosGenerosSeries');
            let titulosGenerosSeries ='';
            for (let i=0; i<datos.length; i++){
                titulosGenerosSeries += `<article class="${datos[i].name}">
                                        <a href='sinopsisGenero.html?id=${datos[i].id}&name=${data.genres[i].name}'>
                                            <h2>${datos[i].name}</h2>
                                        </a>
                                    </article>`
    
            }
            container.innerHTML = titulosGenerosSeries;
        })
        .catch(function(error){
            console.log(error);
        })
    