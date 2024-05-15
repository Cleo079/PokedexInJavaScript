const listaPokemon = document.querySelector('#listaPokemon');
const botonesHeader = document.querySelectorAll('.btn-header');
let URL = 'https://pokeapi.co/api/v2/pokemon/';
const pokeNumber = 251;
const itemNumber = 2110;
const berryNumber = 64;
for (let i = 1; i <= pokeNumber; i++) {
  fetch(URL + i)
    .then(response => response.json())
    .then(poke => mostrarPokemon(poke));
}

function mostrarPokemon(poke) {

    let tipos = poke.types.map(type => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
    tipos = tipos.join('');

    let pokeid =poke.id.toString();
    if(pokeid.length == 1){
      pokeid = "000" + pokeid;
    }else if(pokeid.length == 2){
      pokeid = "00" + pokeid;
    }else if(pokeid.length == 3){
      pokeid = "0" + pokeid;
    }

  const div = document.createElement("div");
    div.classList.add("pokemon");
    // div.style.border = `5px solid #${poke.types[0].type.name}`;
    // div.classList.add(poke.types[0].type.name);
    div.innerHTML = `
      <div class="pokemon-imagen">
        <img src="${poke.sprites.front_default}" alt="${poke.name}">
      </div>
      <div class="pokemon-info">
        <div class="nombre-contenedor">
          <p class="pokemon-id">${pokeid}</p>
          <h2 class="pokemon-nombre">${poke.name}</h2>
        </div>
        <div class="pokemon-tipos">
          ${tipos}
        </div>
        <div class="pokemon-stats">
          <p class="stat">${poke.height}m</p>
          <p class="stat">${poke.weight}kg</p>
        </div>
      </div>
    `;
    listaPokemon.append(div);
}

botonesHeader.forEach(boton => {
  boton.addEventListener('click', (event) => {
    const botonId = event.target.id;

    listaPokemon.innerHTML = '';
    for (let i = 1; i <= pokeNumber; i++) {
        fetch(URL + i)
          .then(response => response.json())
          .then(data => {
            if(botonId === 'all') {
              mostrarPokemon(data);
            }else {
                const tipos = data.types.map(type => type.type.name);
                if (tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
                }
            }
        });
      }
  });
});