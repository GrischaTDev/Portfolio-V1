let loggedInUser = [];
let rememberMeUser = [];
let checkBoxLogin = false;

/**
 * Load registered users.
 */
async function initLogin(){
    await includeHTML();
    loadRegisteredUsers();
    loadRememberMeUser();
}


/**
 * Load registered users from server.
 */
async function loadRegisteredUsers(){
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e){
        console.error('Loading error:', e);
    }
}


/**
 * Takes the value of the input fields and checks whether the user exists.
 */
async function login() {
    let loginEmail = document.getElementById('login-email').value;
    let loginPassword = document.getElementById('login-password').value;
    let user = users.find(u => u.email == loginEmail && u.password == loginPassword);

    console.log('Benutzer', user);
    if (loginEmail == user.email && loginPassword == user.password) {
        resetLoginForm(loginEmail, loginPassword);
        userPushLogin(user);
        location.href = './summary.html';
    } else {
        console.log('Falsche Eingabe')
        return
    }
}


/**
 * Clears the input fields after successful login.
 * 
 * @param {string} loginEmail - ID from email input field
 * @param {string} loginPassword - ID from password input field
 */
function resetLoginForm(loginEmail, loginPassword) {
    loginEmail = '';
    loginPassword = '';
}


/**
 * Saves the logged-in user as json in the local storage.
 * 
 * @param {JSON} user - Saved login user data
 */
async function userPushLogin(user) {
    loggedInUser.push({
      id: user.id,
      name: user.name,
      color: user.color
    });
    save();
}


/**
 * Saved login users in local storage.
 */
function save() {
    let loggedUSer = JSON.stringify(loggedInUser);
    localStorage.setItem('loggedInUser', loggedUSer);
}


/**
 * Saves the login data in the input fields.
 */
function rememberMe() {
    let checkBoxImage = document.getElementById('remember-me');
    let loginEmail = document.getElementById('login-email').value;
    let loginPassword = document.getElementById('login-password').value;

    if (loginEmail.length === 0 && loginPassword.length === 0) {
        return;
    }

    if (!checkBoxLogin) {
      checkBoxImage.src = './assets/img/checkbox_active.svg';
      checkBoxLogin = true;
      pushRememberMe(loginEmail, loginPassword)
      loadRememberMeUser();
    } else {
      checkBoxImage.src = './assets/img/checkbox.svg';
      checkBoxLogin = false;
      rememberMeUser.splice(0, rememberMeUser.length);
      saveRememberMe();
      loadRememberMeUser();
    }
}


/**
 * Saves the logged-in user as json in the local storage.
 * 
 * @param {JSON} user - Saved login user data
 */
function pushRememberMe(loginEmail, loginPassword) {
    rememberMeUser = [];
    rememberMeUser.push({
      email: loginEmail,
      password: loginPassword,
    });
    saveRememberMe();
}


/**
 * Saved remember me user in local storage.
 */
function saveRememberMe() {
    let saveUserLogin = JSON.stringify(rememberMeUser);
    localStorage.setItem('rememberMeUser', saveUserLogin);
    loadRememberMeUser();
}


/**
 * Load remember me user from local storage.
 */
function loadRememberMeUser() {
    let loadUserLogin = localStorage.getItem("rememberMeUser");
    if (loadUserLogin) {
        rememberMeUser = JSON.parse(loadUserLogin);
    }
    loadRememberMeInputValue();
}


/**
 * Load remember me user in input fields.
 */
function loadRememberMeInputValue() {
    let checkBoxImage = document.getElementById('remember-me');
    if (rememberMeUser.length > 0) {
        checkBoxImage.src = './assets/img/checkbox_active.svg';
        checkBoxLogin = true;
        document.getElementById('login-email').value = rememberMeUser[0].email;
        document.getElementById('login-password').value = rememberMeUser[0].password;
    } 
}


/**
 * Login as guest user without registration.
 */
function guestLogIn() {
    document.getElementById('login-email').value = 'test-user@join.com';
    document.getElementById('login-password').value = 'xt8mnVL6t8i4f4N';
    loggedInUser.push({
        id: 99,
        name: 'Guest',
        color: 'rgb(222,222,69)'
        });
    location.href = './summary.html';
    save();
}



