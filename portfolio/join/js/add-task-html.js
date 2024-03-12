/**
 * Generates HTML for displaying a filtered user with their name initials and checkbox.
 * @param {object} user - The user object containing user information.
 * @param {string} userColor - The color associated with the user.
 * @param {string} initialLetters - The initial letters of the user's name.
 * @param {number} i - The index of the user in the list.
 * @returns {string} The HTML string for displaying the filtered user.
 */
function generateFilteredUserHtml(user, userColor, initialLetters, i) {
  return /*html*/`
    <div id="currentUser${i}" class="userColumn ${isUSerSelected(i) ? 'user-list-active' : ''}" onclick="toggleAddUser(${i})">
      <div class="user-name">
        <span class="letter-icon" style="background-color:${userColor}">${initialLetters}</span>
        <div>${user.name}</div>
      </div>
      <img id="user-checkbox${i}" src="${isUSerSelected(i) ? './assets/img/checkbox_active_white.svg' : './assets/img/checkbox.svg'}" alt="">
    </div>
    `;
}


/**
* Generates HTML for displaying an open user list with their name initials and checkbox.
* @param {object} user - The user object containing user information.
* @param {string} userColor - The color associated with the user.
* @param {string} initialLetters - The initial letters of the user's name.
* @param {number} i - The index of the user in the list.
* @returns {string} The HTML string for displaying the open user list.
*/
function generateOpenUserListHtml(user, userColor, initialLetters, i) {
  return /*html*/`
    <div id="currentUser${i}" class="userColumn ${isUSerSelected(i) ? 'user-list-active' : ''}" onclick="toggleAddUser(${i})">
      <div class="user-name">
        <span class="letter-icon" style="background-color:${userColor}">${initialLetters}</span>
        <div>${user.name}</div>
      </div>
      <img id="user-checkbox${i}" src="${isUSerSelected(i) ? './assets/img/checkbox_active_white.svg' : './assets/img/checkbox.svg'}" alt="">
    </div>
    `;
}


/**
* Generates HTML for displaying a task with options for editing and deleting.
* @param {string} todo - The task to be displayed.
* @param {number} i - The index of the task in the list.
* @returns {string} The HTML string for displaying the task.
*/
function generateTaskHtml(todo, i) {
  return /*html*/`
    <div>
        <span>${todo}</span>
        <input size="60" class="edit-input d-none" value="${todo}" onchange="updateTodo(${i}, this.value)">
        </div>
    <div class="actions d-none">
        <a href="#/" onclick='editTodo(${i})'><svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_129363_1220" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
        <rect width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_129363_1220)">
        <path d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z" fill="#2A3647"/>
        </g>
        </svg>
        </a>
        <a href="#/" onclick='deleteTodo(${i})'><svg width="20" height="19" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_129363_1225" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="25" height="24">
        <rect x="0.5" width="24" height="24" fill="#D9D9D9"/>
        </mask>
        <g mask="url(#mask0_129363_1225)">
        <path d="M7.5 21C6.95 21 6.47917 20.8042 6.0875 20.4125C5.69583 20.0208 5.5 19.55 5.5 19V6C5.21667 6 4.97917 5.90417 4.7875 5.7125C4.59583 5.52083 4.5 5.28333 4.5 5C4.5 4.71667 4.59583 4.47917 4.7875 4.2875C4.97917 4.09583 5.21667 4 5.5 4H9.5C9.5 3.71667 9.59583 3.47917 9.7875 3.2875C9.97917 3.09583 10.2167 3 10.5 3H14.5C14.7833 3 15.0208 3.09583 15.2125 3.2875C15.4042 3.47917 15.5 3.71667 15.5 4H19.5C19.7833 4 20.0208 4.09583 20.2125 4.2875C20.4042 4.47917 20.5 4.71667 20.5 5C20.5 5.28333 20.4042 5.52083 20.2125 5.7125C20.0208 5.90417 19.7833 6 19.5 6V19C19.5 19.55 19.3042 20.0208 18.9125 20.4125C18.5208 20.8042 18.05 21 17.5 21H7.5ZM7.5 6V19H17.5V6H7.5ZM9.5 16C9.5 16.2833 9.59583 16.5208 9.7875 16.7125C9.97917 16.9042 10.2167 17 10.5 17C10.7833 17 11.0208 16.9042 11.2125 16.7125C11.4042 16.5208 11.5 16.2833 11.5 16V9C11.5 8.71667 11.4042 8.47917 11.2125 8.2875C11.0208 8.09583 10.7833 8 10.5 8C10.2167 8 9.97917 8.09583 9.7875 8.2875C9.59583 8.47917 9.5 8.71667 9.5 9V16ZM13.5 16C13.5 16.2833 13.5958 16.5208 13.7875 16.7125C13.9792 16.9042 14.2167 17 14.5 17C14.7833 17 15.0208 16.9042 15.2125 16.7125C15.4042 16.5208 15.5 16.2833 15.5 16V9C15.5 8.71667 15.4042 8.47917 15.2125 8.2875C15.0208 8.09583 14.7833 8 14.5 8C14.2167 8 13.9792 8.09583 13.7875 8.2875C13.5958 8.47917 13.5 8.71667 13.5 9V16Z" fill="#2A3647"/>
        </g>
        </svg>
        </a>
    </div>
  `;
}