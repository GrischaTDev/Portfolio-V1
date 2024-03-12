const STORAGE_TOKEN = 'OV66TAB8QFR9R5JNEUTVSTTNS2K1255C547OFXV4';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';


/**
 * Asynchronously sets an item in the storage.
 * @param {string} key - The key of the item to be set.
 * @param {any} value - The value of the item to be set.
 * @returns {Promise<object>} A Promise that resolves to the response JSON object.
 */
async function setItem(key, value) {
    const payload = { key, value, token: STORAGE_TOKEN };
    return fetch(STORAGE_URL, { method: 'POST', body: JSON.stringify(payload) })
        .then(res => res.json());
}


/**
 * Asynchronously retrieves an item from the storage.
 * @param {string} key - The key of the item to be retrieved.
 * @returns {Promise<any>} A Promise that resolves to the value of the retrieved item.
 * @throws {string} Throws an error if the data with the specified key is not found.
 */
async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(res => res.json()).then(res => {
        // Verbesserter code
        if (res.data) { 
            return res.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}