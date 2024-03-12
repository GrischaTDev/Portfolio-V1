loggedInUser = [];

/**
 * Load functions on Summary page.
 */
async function init() {
    await includeHTML();
    activeMenu();
    load();
    loadUserProfile();
    greatingUser();
}


/**
 * load functions on help
 */
async function initHelp() {
    await includeHTML();
    activeMenu();
    load();
    loadUserProfile();
}


/**
 * Load localStorage loggedInUser.
 */
function load() {
    let currentUserUser = localStorage.getItem('loggedInUser');
    if (currentUserUser) {
        loggedInUser = JSON.parse(currentUserUser);
        if (loggedInUser.length === 0) {
            alert('Sie müssen sich anmelden!');
            window.location.href = './index.html';
        }
    }
}


/**
 * This function logs the user out and deletes the user from the local storage
 */
function logout() {
    loggedInUser.splice(0, loggedInUser.length);
    window.location.href = './index.html';
    save();
}
  

/**
 *  * Includes HTML content from external files into the specified elements with the attribute 'w3-include-html'.

 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}


/**
 * Function load active menu tab
 * 
 * @param menuItems
 */
function activeMenu() {
    const menuItems = document.querySelectorAll('.menu-item');
    const currentPath = window.location.pathname.substring(1);
  
    menuItems.forEach(item => {
      const href = item.getAttribute('href');
      if (href === currentPath) {
        item.classList.add('active-menu');
      } else {
        item.classList.remove('active-menu');
      }
    });
}
  

/**
 * Greets the logged-in user by displaying their name on the mobile and desktop interfaces.
 */
function greatingUser() {
    let name = loggedInUser[0].name;
    let nameMobile = document.getElementById('user-greating-mobile');
    let nameDesktop = document.getElementById('user-greating-desktop');
    nameMobile.innerHTML = `<div>${name}</div>`;
    nameDesktop.innerHTML = `<div>${name}</div>`;
}


/**
 * Loads the user profile by displaying the initial letters of the user's name.
 */
function loadUserProfile() {
    let userName = loggedInUser[0].name;
    let initialLetters = nameInitialLetters(userName);
    let userProfile = document.getElementById('log-user');
    userProfile.innerHTML = /* html */ `${initialLetters}`;
}


/**
 * Generates the initial letters of a given user name.
 * @param {string} userName - The name of the user.
 * @returns {string} The initial letters of the user's name.
 */
function nameInitialLetters(userName) {
    const fullNameSplitt = userName.split(" ");
    const letters = fullNameSplitt.map(name => name[0]);
    const initialLetters = letters.join("");
    return initialLetters;
}


/**
 * Opens the legal notice sidebar by removing the 'd-none' class from the sidebar screen element.
 */
function openLegalNoticeSidebar() {
    document.getElementById('legal_notice_sidebar_screen').classList.remove('d-none');
    document.getElementById('user-profile-menu').classList.add('move-from-right-to-screen');
}


/**
 * Moves the legal notice sidebar from the screen to the right and then closes it after a delay.
 */
function moveLegalNoticeSidebarFromScreenToRight() {
    document.getElementById('user-profile-menu').classList.add('move-from-screen-to-right');
    document.getElementById('legal_notice_sidebar_screen').classList.remove('d-none');
    setTimeout(closeLegalNoticeSidebar, 500);
}


/**
 * Closes the legal notice sidebar by removing the 'move-from-screen-to-right' class from the user profile menu and adding the 'd-none' class to the sidebar screen element.
 */
function closeLegalNoticeSidebar() {
    document.getElementById('user-profile-menu').classList.remove('move-from-screen-to-right');
    document.getElementById('legal_notice_sidebar_screen').classList.add('d-none');
}


/**
 * Navigates the user back to the previous page in the browser history.
 */
function goBack() {
    window.history.back();
}


/**
 * Generates a random RGB color.
 * @returns {string} A random RGB color in the format 'rgb(r,g,b)'.
 */
function generateRandomColor() {
    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}


/**
 * Toggles the visibility of a legal popup by adding or removing the 'd-none' class from the specified popup element.
 * @param {string} popupId - The ID of the legal popup element.
 */
function legalPopup(popupId) {
    let legalPopup = document.getElementById(popupId);
    if (legalPopup.classList.contains('d-none')) {
        legalPopup.classList.remove('d-none');
    } else {
        legalPopup.classList.add('d-none');
    }
}
