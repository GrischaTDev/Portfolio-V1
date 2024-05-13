let completePokemon;
let allPokemonData = []; // Alle Pokemon die es in der API gibt!
let allCatchedPokemon = [];
let loadMorePokemon = 20;
let nextPokemon = 0;
let stopScroll = false;
let limit = 20;
let currentDraggedPokemon;
let progressBarNone = document.getElementById('progress-bar');
///////////////////////////////////////////////////////////////////////////////////////////


/**
 * Loads important function at the start of the page
 */
async function initAllPokemon() {
    await loadCompletePokemon();
    renderAllPokemon();
    startLoadCompletePokemon();
    load();
    renderAllDraggedPokemon();
}


/**
 * Loads all existing Pokemon up to a maximum of 1000
 */
async function loadCompletePokemon() {
    let url = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=${limit}`;
    let response = await fetch(url);
    completePokemon = await response.json();
    completePokemon = completePokemon['results'];
    allPokemonData = [];

    const progressBar = document.querySelector('.progress-bar');

    for (i = 0; i < completePokemon.length; i++) {
        let pokemonUrl = completePokemon[i]['url'];
        let response = await fetch(pokemonUrl);
        let currentAllPokemon = await response.json();

        allPokemonData.push({ name: currentAllPokemon['name'], data: currentAllPokemon });

        const progressPercentage = Math.round((i + 1) / completePokemon.length * 100);
        progressBar.style.width = `${progressPercentage}%`;
        progressBar.innerText = `${progressPercentage}%`; // Show percentage text
    }
    progressBarNone.classList.add('d-none');
    console.log('Alle Pokemon daten', allPokemonData);
}


/**
 * Changes the limit on how many Pokemon can be loaded to 1000
 */
function startLoadCompletePokemon() {
    limit = 1000;
    progressBarNone.classList.remove('d-none');
    loadCompletePokemon(progressBarNone);
}


/**
 * Renders all Pokemon
 */
function renderAllPokemon() {
    for (k = nextPokemon; k < loadMorePokemon; k++) {
        let number = allPokemonData[k]['data']['id'];
        let name = allPokemonData[k]['name'];
        let typesStyle = allPokemonData[k]['data']['types'][0]['type']['name']+'-border';

        document.getElementById('pokedex').innerHTML += singlePokemonTemplate(k, number, name, typesStyle);
    }
    stopScroll = false;
    disableLoadingScreen();
}


/**
 * Pokemon Card HTML
 * 
 * @param {index} i - Pokemon Index
 * @param {number} number - Pokemon ID
 * @param {string} name - Pokemon Name
 * @param {string} typesStyle - Add new Class for Type style
 */
function singlePokemonTemplate(i, number, name, typesStyle) {
    return `
    <div draggable="true" ondragstart="startDragging(${i})" onclick="pokemonPopup(${i})" class="pokemon-card ${typesStyle}">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(allPokemonData[i])}
        </div>
        <div class="pokemonId">#${number}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}


/**
 * Renders all types of a Pokemon
 * 
 * @param {data} allPokemonData - All Pokemon data
 */
function typeTemplate(allPokemonData) {
    const types = allPokemonData['data']['types'];
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


/**
 * Opens the Pokemon Card in a new pop-up window
 * 
 * @param {index} i - Pokemon index
 */
function pokemonPopup(i) {
    if (i == -1) {
        return;
    }

    let number = allPokemonData[i]['data']['id'];
    let name = allPokemonData[i]['name'];

    document.getElementById('pokemon-stats').innerHTML = `
    <div class="pokemon-popup" onclick="closePopup()">
        <div class="closeMobile" onclick="closePopup()">Close</div>
        <div id="pokemon-popup-card${i}" class="pokemon-popup-card" onclick="notClose(event)">  
        <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(allPokemonData[i])}
                </div>
                <div class="pokemonId">#${number}</div>   
            </div>
            <div>${name}</div>     
            <img src="img/pokemon/${number}.png" alt="">
            <div class="pokemon-info-card">
                <menu>
                    <div class="pokemon-left" onclick="pokemonPopup(${i -1})"><img id="arrowLeft" src="./img/navigate-left.svg"></div>
                    <div class="menu">
                        <div class="menu-start" href="" onclick="loadBaseStats(${i})">Base Stats</div>
                        <div class="menu-end" href="" id="test" onclick="loadAbout(${i})">About</div>
                    </div>
                    <div class="pokemon-right" onclick="pokemonPopup(${i +1})"><img src="./img/navigate.svg"></div>
                </menu>
                <div id="about"></div>
            </div>
        </div>
    </div>
    `;

    openPopup();
    changeArrowLeft(number); 
    loadBaseStats(i);
}


/**
 * Loads the Pokemon About me data
 * 
 * @param {index} i - Pokemon Index
 */
function loadAbout(i) {
    let species = allPokemonData[i]['data']['species']['name'];
    let height = allPokemonData[i]['data']['height'];
    let weight = allPokemonData[i]['data']['weight'];

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


/**
 * Loads the Pokemon base stats
 * 
 * @param {index} i - Pokemon Index
 */
function loadBaseStats(i) {
    let baseStats = allPokemonData[i]['data']['stats'];
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


/**
 * Hides the left button on the first Pokemon
 * 
 * @param {index} i - Pokemon Index 
 */
function changeArrowLeft(i) {
    let pokemonArrowSrc = document.getElementById('arrowLeft');
    if (i == 1) {
        pokemonArrowSrc.src = './img/navigate-left-end.svg';
    }
}


/**
 * Starts the search function and opens the results field
 */
function searchPokemon() {
    let search = document.getElementById('inputSearch').value.toLowerCase();
    let renderPokemonList = document.getElementById('search-results');
    renderPokemonList.innerHTML = '';
    
    if (search === '') {
        renderPokemonList.innerHTML = '';
        renderPokemonList.classList.add('d-none');
        return;
    }; 
    renderPokemonList.classList.remove('d-none');
    renderSearchPokemon(search, renderPokemonList);
}


/**
 * Renders the pokemon you are looking for
 * 
 * @param {value} search - Inputfield value
 * @param {id} renderPokemonList - Render results field
 */
function renderSearchPokemon(search, renderPokemonList) {
    for (let i = 0; i < allPokemonData.length; i++) {

        const number = allPokemonData[i]['data']['id'];
        const name = allPokemonData[i]['name'];

        if (name.toLowerCase().includes(search) && search.length >= 2) {

            renderPokemonList.innerHTML += /* html */ `
            <div draggable="true" ondragstart="startDragging(${i})" onclick="pokemonPopup(${i})" class="pokemon-card">
            <div class="type-card">
                <div class="types-content">
                    ${typeTemplate(allPokemonData[i])}
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


/**
 * Deactivates the loading screen
 */
function disableLoadingScreen() {
    document.getElementById('loadingScreen').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}


/**
 * Opens the Pokemon pop-up
 */
function openPopup() {
    document.getElementById('pokemon-stats').classList.remove('d-none');
    document.getElementById('body').classList.add('hide-scrollbar');
}


/**
 * Closes the Pokemon popup
 */
function closePopup() {
    document.getElementById('pokemon-stats').classList.add('d-none');
    document.getElementById('body').classList.remove('hide-scrollbar');
}


/**
 * prevents the Pokemon popup from closing when clicking on the content
 * 
 * @param {event} event 
 */
function notClose(event) {
    event.stopPropagation();
}

/**
 * Loads the next Pokemon when scrolling down
 */
function loadMore() {
    let remainingPokemon = allPokemonData.length - loadMorePokemon;

    if (remainingPokemon <= 0) {
        console.log('Maximale Länge erreicht!');
        return; 
    }
    if (remainingPokemon > 20) {
        loadMorePokemon += 20;
        nextPokemon += 20;
        renderAllPokemon(); 
    } else {
        loadMorePokemon = allPokemonData.length;
        renderAllPokemon(); 
    }
}


/**
 * Loads the next Pokemon when scrolling down
 */
window.addEventListener('scroll', () => {
    if (document.getElementById('load-more-function')) { 
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) { 
            loadMore();
            console.log('geht nicht')
        }
    }
});
