const container = document.getElementById("pokemon-container");
const search = document.getElementById("search");
const loading = document.getElementById("loading");

let pokemonList = [];


async function getPokemon() {
    try {
        const response = await fetch(
            "https://pokeapi.co/api/v2/pokemon?limit=20"
        );

        const data = await response.json();

        pokemonList = [];

        
        for (let pokemon of data.results) {
            const response = await fetch(pokemon.url);
            const details = await response.json();

            pokemonList.push(details);
        }

        loading.style.display = "none";

        showPokemon(pokemonList);

    } catch (error) {
        loading.textContent = "Failed to load Pokémon.";
        console.log(error);
    }
}


function showPokemon(pokemon) {
    container.innerHTML = "";

    pokemon.forEach(function (item) {

        const card = document.createElement("div");
        card.classList.add("card");

        const image = item.sprites.other["official-artwork"].front_default;

        const name = item.name;

        const ability = item.abilities[0].ability.name;

        card.innerHTML = `
            <img src="${image}" alt="${name}">

            <h2>${name}</h2>

            <button onclick="showAbility('${name}', '${ability}')">
                Show Ability
            </button>

            <p id="ability-${name}"></p>
        `;

        container.appendChild(card);
    });
}


function showAbility(name, ability) {

    const abilityText = document.getElementById(`ability-${name}`);

    abilityText.textContent = 
        `I am ${name} and I have ${ability}.`;
}


// Search Pokémon
search.addEventListener("input", function () {

    const searchText = search.value.toLowerCase();

    const filteredPokemon = pokemonList.filter(function (pokemon) {

        return pokemon.name.toLowerCase().includes(searchText);

    });

    showPokemon(filteredPokemon);
});


// Start the program
getPokemon();