const api_url = `https://pokeapi.co/api/v2/pokemon/`;

//characters imag url
//https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/(put id here).png

//selecting html elements
let pokemon_container = document.querySelector("#pokemon-container");

//introducing variables
let number_of_pokemons = 150;

//Let's fetch the pokemon data
async function fetchPokemons() {
  for (let i = 1; i <= number_of_pokemons; i++) {
    await getPokemons(i);
  }
}

async function getPokemons(id) {
  let url = `${api_url + id}`;
  let response = await fetch(url);
  let data = await response.json();
  pokemonCharacters(data);
}

//this function will actually create and append cards into our pokemon_container div.
function pokemonCharacters(pokemon) {
  let pokemon_card = document.createElement("div");
  pokemon_card.className = "pokemon";

  //editing name (we wanna make the first letter uppercase)
  let name = pokemon.name[0].toUpperCase() + pokemon.name.slice(1);

  //editing number , we need zeroes in front of the number (001 - 150)
  let dynamic_id = pokemon.id.toString().padStart(3, "0");

  let innerHTML = `
    <div class="pokemon-img">
        <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png"
        />
    </div>
    <div class="pokemon-info">
        <h3 class="number">#${dynamic_id}</h3>
        <h2 class="name">${name}</h2>
    </div>
    `;

  pokemon_card.innerHTML = innerHTML;
  pokemon_container.append(pokemon_card);
}

fetchPokemons();

//new concept learned : padStart() - it's a temporary space filler , that's it !!
