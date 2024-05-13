let regionAllPokemon;
let allRegionPokemonData = []; // Alle Pokemon die es in der API gibt!
let startIndex = 0;
let endIndex = 20;
loadMorePokemon = 20;
nextPokemon = 0;
////////////////////////////////////////////////

progressBarNone = document.getElementById('progress-bar');


/**
 * Loads important function at the start of the page
 */
async function initAllRegionPokemon(currentRegion) {
    await loadRegion(currentRegion);
    renderRegionPokemon();
    startLoadCompleteRegionPokemon();
    startLoadCompletePokemon();
    load();
    renderAllDraggedPokemon();
}


/**
 * Loads all regions from Pokemon
 * 
 * @param {number} currentRegion - Transfers the id for the requested region
 */
async function loadRegion(currentRegion) {
    let regionsUrl = `https://pokeapi.co/api/v2/pokedex/${currentRegion}`;
    let response = await fetch(regionsUrl);
    let regionLoaded = await response.json();
    regionAllPokemon = regionLoaded['pokemon_entries'];

    await loadRegionPokemon();
}


/**
 * Loads all Pokemon for the region
 */
async function loadRegionPokemon() {
    allRegionPokemonData = [];
    const promises = [];

    for (let h = startIndex; h < endIndex; h++) { 
        let pokemonUrl = regionAllPokemon[h]['pokemon_species']['url'];
        let response = await fetch(pokemonUrl);
        let currentRegionPokemon = await response.json();

        let regionPokemonId = currentRegionPokemon['id'];
        promises.push(loadAllPokemonApi(regionPokemonId));
    }
    await Promise.all(promises);
}


/**
 * After the first 20 Pokemon have been rendered, all the remaining Pokemon in the region are loaded
 */
function startLoadCompleteRegionPokemon() {
    endIndex = regionAllPokemon.length;
    loadRegionPokemon();
}


/**
 * Loads all required Pokemon data from the Pokemon API for the Pokemon region
 * 
 * @param {id} regionPokemonId - Region Pokemon ID
 */
async function loadAllPokemonApi(regionPokemonId) {
    let allPokemonUrl = 'https://pokeapi.co/api/v2/pokemon/' + regionPokemonId;
    let response2 = await fetch(allPokemonUrl);
    let currenRegionPokemon = await response2.json();
    allRegionPokemonData.push({ name: currenRegionPokemon['name'], data: currenRegionPokemon});
}


/**
 * Renders all Regions Pokemon
 */
function renderRegionPokemon() {
    for (let i = nextPokemon; i < loadMorePokemon; i++) {
        let number = allRegionPokemonData[i]['data']['id'];
        let name = allRegionPokemonData[i]['name'];
        let typesStyle = allRegionPokemonData[i]['data']['types'][0]['type']['name']+'-border';

        document.getElementById('pokedex').innerHTML += singlePokemonTemplateKanto(i, number, name, typesStyle);
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
function singlePokemonTemplateKanto(i, number, name, typesStyle) {
    return `
    <div draggable="true" ondragstart="startDragging(${number-1})" onclick="pokemonPopup(${number-1})" class="pokemon-card ${typesStyle}">
    <div class="type-card">
        <div class="types-content">
            ${typeTemplate(allRegionPokemonData[i])}
        </div>
        <div class="pokemonId">#${i+1}</div>
    </div>
        <img src="img/pokemon/${number}.png" alt="">
        <div>${name}</div>      
    </div>
    `;
}

/**
 * Loads the next Pokemon when scrolling down
 */
function loadMoreRegion() {
    let remainingPokemon = allRegionPokemonData.length - loadMorePokemon;

    if (remainingPokemon <= 0) {
        console.log('Maximale Länge erreicht!');
        return; 
    }
    if (remainingPokemon > 20) {
        loadMorePokemon += 20;
        nextPokemon += 20;
        renderRegionPokemon(); 
    } else {
        loadMorePokemon = allRegionPokemonData.length;
        renderRegionPokemon(); 
    }
}

/**
 * Loads the next Pokemon when scrolling down
 */
window.addEventListener('scroll', () => {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 200) { 
        loadMoreRegion();
    }
});
