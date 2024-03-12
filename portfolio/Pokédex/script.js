let completePokemon; // Alle Pokemon die es in der API gibt! Wird für die Regionen benötigt.
///////////////////////////////////////////////////////////////////////////////////////////
let currentAllPokemon;
let currentAllPokemonPopup;
let currentSearchPokemon;
///////////////////////////////////////////////////////////////////////////////////////////

/**
 * 
 *
 */
async function loadCompletePokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=2000';
    let response = await fetch(url);
    completePokemon = await response.json();
    completePokemon = completePokemon['results'];

    renderAllPokemon();
}

async function renderAllPokemon() {
    changeHeaderAll();
    document.getElementById('pokedex').innerHTML = '';
    for (i = 0; i < 20; i++) {
        let pokemonUrl = completePokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentAllPokemon = await response.json();
        const number = currentAllPokemon['id'];
        const name = currentAllPokemon['name'];

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(number, name);
    }
    disableLoadingScreen();
}

/**
 * 
 * @param {*} number 
 * @param {*} name 
 * @param {*} currentKantoPokemon 
 * @returns 
 */
function singlePokemonTemplate(number, name, currentKantoPokemon) {
    return `
    <div onclick="pokemonPopup(${i})" class="pokemon-card">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(currentAllPokemon)}
        </div>
        <div class="pokemonId">#${number}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}

function typeTemplate(currentPokemon) {
    const types = currentPokemon['types'];
    let htmlText = "";
    for (let j = 0; j < types.length; j++) {
        htmlText += `
        <div class="${types[j]['type']['name']}">
            <div>${types[j]['type']['name']}</div>
        </div>
        `;
    }
    return htmlText;
}

async function pokemonPopup(i) {
    let pokemonUrl = completePokemon[i]['url'];
    let response = await fetch(pokemonUrl);
    currentAllPokemonPopup = await response.json();
    const number = currentAllPokemonPopup['id'];
    const name = currentAllPokemonPopup['name'];
    currentPokemonId = i;

    document.getElementById('pokemon-stats').innerHTML = popupPokemonTemplate(number, name, i);

    openPopup();
    changeArrowLeft(); 
    loadBaseStats();
}

function popupPokemonTemplate(number, name, i) {
    return `
    <div class="pokemon-popup" onclick="closePopup()">
        <div class="closeMobile" onclick="closePopup()">Close</div>
        <div id="pokemon-popup-card${i}" class="pokemon-popup-card" onclick="notClose(event)">  
        <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(currentAllPokemonPopup)}
                </div>
                <div class="pokemonId">#${number}</div>   
            </div>
            <div>${name}</div>     
            <img src="img/pokemon/${number}.png" alt="">
            <div class="pokemon-info-card">
                <menu>
                    <div class="pokemon-left" onclick="pokemonPopup(currentPokemonId -1)"><img id="arrowLeft" src="./img/navigate-left.svg"></div>
                    <div class="menu">
                        <div class="menu-start" href="" onclick="loadBaseStats()">Base Stats</div>
                        <div class="menu-end" href="" id="test" onclick="loadAbout()">About</div>
                        <!-- <div class="menu-end" onclick="loadEvolution(i)">Evolution</div> -->
                    </div>
                    <div class="pokemon-right" onclick="pokemonPopup(currentPokemonId +1)"><img src="./img/navigate.svg"></div>
                </menu>
                <div id="about"></div>
            </div>
        </div>
    </div>
    `;
}

function loadAbout() {
    const species = currentAllPokemonPopup['species']['name'];
    const height = currentAllPokemonPopup['height'];
    const weight = currentAllPokemonPopup['weight'];

    document.getElementById('about').innerHTML = /* html */`

    <div id="about-info">
        <div class="about-row">
            <div class="about-left">Species</div><div class="about-right">${species}</div>
        </div>
        <div class="about-row">
            <div class="about-left">Height</div><div class="about-right">${height}</div>
        </div>
        <div class="about-row">
            <div class="about-left">Weight</div><div class="about-right">${weight}</div>
        </div>  
    </div>
    `;
}

function loadBaseStats() {
    const baseStats = currentAllPokemonPopup['stats'];
    document.getElementById('about').innerHTML = '';

    for (s = 0; s < baseStats.length; s++) {
        const baseStatName = baseStats[s]['stat']['name'];
        const baseStatValue = baseStats[s]['base_stat'];


        document.getElementById('about').innerHTML += /* html */`

        <div class="base-stats-row">
            <div class="base-stats-left">${baseStatName}</div>
            <div>${baseStatValue}</div>
            <div class="progress base-stats-right" role="progressbar" aria-label="Basic example" aria-valuenow="${baseStatValue}" aria-valuemin="0" aria-valuemax="100">
                <div class="progress-bar" style="width: ${baseStatValue}%"></div>
            </div>
        </div>
        `;
    }
}

function changeArrowLeft() {
    let pokemonArrowSrc = document.getElementById('arrowLeft');
    if (currentPokemonId == 0) {
        pokemonArrowSrc.src = './img/navigate-left-end.svg';
    }
}

async function searchPokemon() {
    let search = document.getElementById('inputSearch').value;
    search = search.toLowerCase();
    pokemon = completePokemon;

    let renderPokemonList = document.getElementById('pokedex');
    renderPokemonList.innerHTML = '';

    renderSearchPokemon(search, pokemon, renderPokemonList);
}

async function renderSearchPokemon(search, pokemon, renderPokemonList) {
    for (i = 0; i < pokemon.length; i++) {
        let pokemonUrl = pokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        currentSearchPokemon = await response.json();

        const number = currentSearchPokemon['id'];
        const name = currentSearchPokemon['name'];

        if (name.toLowerCase().includes(search)) {

            renderPokemonList.innerHTML += /* html */ `
            <div onclick="pokemonPopup(${i})" class="pokemon-card">
            <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(currentSearchPokemon)}
                </div>
                <div class="pokemonId">#${number}</div>
            </div>
                <img src="img/pokemon/${number}.png" alt="">
                <div>${name}</div>      
            </div>
            `;
        }
    }
}

function disableLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}

function openPopup() {
    document.getElementById('pokemon-stats').classList.remove('d-none');
    document.getElementById('body').classList.add('hide-scrollbar');
}

function closePopup() {
    document.getElementById('pokemon-stats').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}

function notClose(event) {
    event.stopPropagation();
}

function changeHeaderAll() {
    let header = document.getElementById('header-img');
    header.innerHTML = /* html */ `
    <div>All Pokemon</div>
    `;
}

// Test der onscroll function //////////////////////////////////////////////////
window.onscroll = function() {myFunction()};

function myFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    // document.getElementById("myP").className = "test";
    console.log('Onscroll Test');
  } else {
    // document.getElementById("myP").className = "";
  }
}