const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeaer = document.querySelectorAll(".btn-header")
let URL = "https://pokeapi.co/api/v2/pokemon/";
//URL es la direcion de la appi donde vamos hacer las peticiones 

for (let i = 1; i <=151; i++) {
    fetch(URL + i)
        .then((response) => response.json())// // convertir a json
        .then(data => mostrarPokemon(data))
        .catch(Error => console.log("Solicitud Fallida"))
}

function mostrarPokemon(poke){

    let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('')
    //Join es un metodo de array q nos permite junatar todos los elementos de un array, en un string
    //console.log(tipos);

    let pokeId = poke.id.toString();
    //toString es un metodo que nos permite convertir un numero a string

    if(pokeId.length === 1){
        pokeId = "#00" + pokeId;
    }else if(pokeId.length === 2){
        pokeId = "#0" + pokeId;
    }

    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `<p class="pokemon-id-back">${pokeId}</p>
    <div class="pokemon-imagen">
        <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
    </div>
    <div class="pokemon-info">
        <div class="nombre-contenedor">
            <p class="pokemon-id">${pokeId}</p>
            <h2 class="pokemon-nombre">${poke.name}</h2>                       
        </div>
        <div class="pokemon-tipos">
            ${tipos}
        </div>
        <div class="pokemon-stats">
            <p class="stat">${poke.height}m</p>
            <p class="stat">${poke.weight}kg</p>
        </div>
    </div>`
    ;
    listaPokemon.append(div);
}

botonesHeaer.forEach(boton => boton.addEventListener("click", (e) =>{
    //El método forEach de JavaScript es una de las varias formas de recorrer un arreglo
    const botonId = e.currentTarget.id;
    //Identifica el target (objetivo) actual del evento, ya que el evento atraviesa el DOM. Siempre hace referencia al elmento al cual el controlador del evento fue asociado, a diferencia de event.target, que identifica el elemento el el que se produjo el evento.
    

    listaPokemon.innerHTML = "";
    
    for (let i = 1; i <= 151; i++) {
        fetch(URL + i)
            .then((response) => response.json())
            .then(data => {

                if(botonId === "ver-todos") {
                    mostrarPokemon(data);
                } else {
                    const tipos = data.types.map(type => type.type.name);
                    //El método Array.map()permite iterar sobre un arreglo y modificar sus elementos utilizando una función callback.
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        //El método some() comprueba si un elemento del array cumple con una condición, y nos devuelve un booleano.
                        //El método includes() para ver si una cadena (string) existe dentro de otra
                        // includes es sensible a las mayúsculas y minúsculas
                        mostrarPokemon(data);
                    }
                }

            })
    }
}))


