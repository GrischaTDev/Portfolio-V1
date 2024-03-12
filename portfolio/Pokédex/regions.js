let allRegions; // Alle Regionen aus Pokemon.
////////////////////////////////////////////////
let regionKanto; // Region Kanto.
let currentKantoPokemon;
let currentKantoPokemonId;
let currentPokemonIdKanto = 0;
let headerTitel;
////////////////////////////////////////////////


async function loadRegions() {
    let url = 'https://pokeapi.co/api/v2/pokedex/?offset=0&limit=32';
    let response = await fetch(url);
    allRegions = await response.json();
    allRegions = allRegions['results'];
}

function renderRegion(test, name) {
    headerTitel = name;
    loadRegionKanto(test)
}

async function loadRegionKanto(test) {
    let kantoUrl = allRegions[test]['url'];
    let response = await fetch(kantoUrl);
    regionKanto = await response.json();
    renderKantoPokemon()
}

async function renderKantoPokemon() {
    let kantoPokemons = regionKanto['pokemon_entries']
    document.getElementById('pokedex').innerHTML = '';

    changeHeaderTitle();

    for (let i = 0; i < kantoPokemons.length; i++) {
        let kantoPokemonUrl = kantoPokemons[i]['pokemon_species']['url'];
        let response = await fetch(kantoPokemonUrl);
        currentKantoPokemonId = await response.json();
        let kantoId = currentKantoPokemonId['id'];
        // Hier wird die Normale Pokemon API mit der ID der Pokemon aus dem Kanto Pokedex geladen.
        await loadAllPokemonApi(kantoId);

        let number = currentKantoPokemon['id'];
        let arrayNumber = currentKantoPokemon['id']-1;
        let name = currentKantoPokemon['name'];
        let listNumber = i+1;

        document.getElementById('pokedex').innerHTML += singlePokemonTemplateKanto(number, name, arrayNumber, listNumber);
    }
    console.log(headerTitel, 'Pokedex geladen!');
}

function singlePokemonTemplateKanto(number, name, arrayNumber, listNumber) {
    return `
    <div onclick="pokemonPopup(${arrayNumber})" class="pokemon-card">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(currentKantoPokemon)}
        </div>
        <div class="pokemonId">#${listNumber}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}

async function loadAllPokemonApi(kantoId) {
    let pokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + kantoId;
    let response2 = await fetch(pokemonUrl);
    currentKantoPokemon = await response2.json();
    return currentKantoPokemon;
}


function changeHeaderTitle() {
    let header = document.getElementById('header-img');
    header.innerHTML = /* html */ `
    <div>${headerTitel}</div>
    `;
}