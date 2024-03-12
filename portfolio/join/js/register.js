let users = [];
let checkBox = false;


/**
 * Load registered user.
 */
async function loadRegisteredUser() {  
  await includeHTML();
  try {
    users = JSON.parse(await getItem('users'));
  } catch (e) {
    console.error('Loading error:', e);
  }
}


/**
 * Push newly registered users into the users array.
 * 
 * @returns Cancels registration if the requirements are not met.
 */
function addUser() {
  let registerButton = document.getElementById('register-button');
  registerButton.disabled = true;
  let registerName = document.getElementById('register-name').value;
  let registerEmail = document.getElementById('register-email').value;
  let registerPassword = document.getElementById('register-password').value;
  let registerConfirmPassword = document.getElementById('register-confirm-password').value;

  if (registerPassword !== registerConfirmPassword) {
    checkPassword(registerButton);
    return
  }

  if (!checkBox) {
    checkPrivacyConsent(registerButton);
    return;
  }

  let dontPrivacyAccept = document.getElementById('dont-accept');
  dontPrivacyAccept.classList.add('d-none');
  userPush(registerName, registerEmail, registerPassword, registerConfirmPassword);
  successfullyMessage();
  resetForm(registerName, registerEmail, registerPassword, registerConfirmPassword, registerButton);
}


/**
 * Checks whether the entered passwords match.
 * 
 * @param {boolean} registerButton - Registry button true or false.
 */
function checkPassword(registerButton) {
  let passwordDontMatch = document.getElementById('password-dont-match');
  let passwordDontMatchBorder = document.getElementById('register-confirm-password');
  let dontPrivacyAccept = document.getElementById('dont-accept');
  dontPrivacyAccept.classList.add('d-none');
  passwordDontMatch.classList.remove('d-none');
  passwordDontMatchBorder.classList.add('input-invalid');
  registerButton.disabled = false;
}


/**
 * Checks whether the privacy checkbox has been confirmed.
 * 
 * @param {boolean} registerButton - Registry button true or false
 */
function checkPrivacyConsent(registerButton) {
  let dontPrivacyAccept = document.getElementById('dont-accept');
  dontPrivacyAccept.classList.remove('d-none');
  let passwordDontMatch = document.getElementById('password-dont-match');
  let passwordDontMatchBorder = document.getElementById('register-confirm-password');
  passwordDontMatch.classList.add('d-none');
  passwordDontMatchBorder.classList.remove('input-invalid');
  registerButton.disabled = false;
}

/**
 * Push the registered user into a json.
 * 
 * @param {string} registerName - User name
 * @param {string} registerEmail - User email
 * @param {string} registerPassword - User password
 */
async function userPush(registerName, registerEmail, registerPassword) {
  let userId = users.length;
  users.push({
    id: userId,
    name: registerName,
    email: registerEmail,
    password: registerPassword,
    color: generateRandomColor()
  });
  await setItem('users', JSON.stringify(users));
}


/**
 * Checks whether the privacy checkbox has been activated.
 */
function privacyCheck() {
  let checkBoxImage = document.getElementById('checkbox');

  if (!checkBox) {
    checkBoxImage.src = './assets/img/checkbox_active.svg';
    checkBox = true;
  } else {
    checkBoxImage.src = './assets/img/checkbox.svg';
    checkBox = false;
  }
}


/**
 * Confirmation message after successful registration.
 */
async function successfullyMessage() {
  let msg = document.getElementById('msgBox');
  msg.classList.remove('d-none');
  msg.classList.add('msgBox');
  setTimeout(() => {
    window.location.href = 'index.html';
  }, 1500);
}


/**
 * Resets the form and clears the fields.
 * 
 * @param {string} registerName - User name
 * @param {string} registerEmail - User email
 * @param {string} registerPassword - User password
 * @param {string} registerConfirmPassword - User confirm password
 * @param {boolean} registerButton - Registry button true or false
 */
function resetForm(registerName, registerEmail, registerPassword, registerConfirmPassword, registerButton) {
  registerName = '';
  registerEmail = '';
  registerPassword = '';
  registerConfirmPassword = '';
  registerButton.disabled = false;
}


/**
 * Displays the password by activating an icon.
 * 
 * @param {string} inputPassword - Register input password
 * @param {string} showIcon - Register input field icon
 * @returns - If the input field is empty, the function aborts
 */
function showPassword(inputPassword, showIcon) {
  let inputField = document.getElementById(inputPassword);
  let icon = document.getElementById(showIcon);

  if (inputField.value === '') {
    return
  } if (inputField.type === "password") {
    inputField.type = "text";
    icon.src = './assets/img/visibility.svg';
  } else {
    inputField.type = "password";
    icon.src = './assets/img/visibility_off.svg';
  }
}


/**
 * Changes the icon to display the password.
 * 
 * @param {string} inputPassword - User password
 * @param {icon} showIcon - Change icon
 */
function changePasswordIcon(inputPassword, showIcon) {
  const inputField = document.getElementById(inputPassword);
  const icon = document.getElementById(showIcon);

  if (inputField.value === '') {
    icon.src = './assets/img/lock_icon.svg';
  } else {
    icon.src = './assets/img/visibility_off.svg';
  } if (inputField.type === "text") {
    icon.src = './assets/img/visibility.svg';
  } if (inputField.value === '') {
    icon.src = './assets/img/lock_icon.svg';
    inputField.type = "password";
  }
}
