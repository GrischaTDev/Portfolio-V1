/**
 * This function is used to render the html of the new Task Popup.
 */
function renderAddNewTaskInPopup() {
    return /* html */ `
    <div class="addTask-popup" onclick="doNotClose(event), closeUserListInPopup()">
   
    <div>
        <div class="header-container">
            <h1>Add Task</h1>
        </div>

        <form onsubmit="addTask(); return false;">
            <div class="add-task-form">
                <div class="add-task-form-row">
                    <div class="add-task-title">
                        <span>Title<span class="red-asterisk">*</span></span>
                        <input type="text" required placeholder="Enter a title" id="titel">
                    </div>

                    <div class="add-task-title">
                        <span>Description</span>
                        <textarea type="text" minlength="5" placeholder="Enter a description"
                            id="description"></textarea>
                    </div>

                    <div class="add-task-title">
                        <span>Assigned to</span>
                        <div class="assigned-input">
                            <input class="input-task-select" id="search-user" autocomplete="off"
                                onkeydown="filterUser()" onclick="openUserList(event)" type="text"
                                placeholder="Select contacts to assign">
                            <img onclick="openUserList(event)" id="input-icon" class="input-arrow"
                                src="./assets/img/arrow_drop_down_1.svg" alt="">
                        </div>
                        <div id="user-list" class="d-none" onclick="doNotClose(event)"></div>
                        <div id="selected-user"></div>
                    </div>
                </div>

                <div class="add-task-border"></div>

                <div class="add-task-form-row">
                    <div class="add-task-title">
                        <span>Due a date<span class="red-asterisk">*</span></span>
                        <input class="input-task-date" type="date" id="dueDate" required>
                    </div>

                    <div class="add-task-title">
                        <span>Prio</span>
                        <div class="priority-buttons">
                            <button type="button" class="priority-button" id="urgent"
                                onclick="togglePriority('urgent')">
                                <span>Urgent</span>
                                <svg id="svg-urgent" xmlns="http://www.w3.org/2000/svg" width="21" height="15"
                                    fill="none">
                                    <g fill="#FF3D00" clip-path="url(#a)">
                                        <path
                                            d="M19.571 14.755c-.234 0-.463-.075-.652-.214l-8.252-6.083-8.252 6.083a1.098 1.098 0 0 1-1.304-1.763l8.904-6.57a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.095 1.095 0 0 1-.652 1.977Z" />
                                        <path
                                            d="M19.571 9.006c-.234 0-.463-.075-.652-.214L10.667 2.71 2.415 8.792A1.098 1.098 0 0 1 1.111 7.03L10.015.46a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.096 1.096 0 0 1-.652 1.977Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.667.245h20v14.51h-20z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button active-medium" id="medium"
                                onclick="togglePriority('medium')">
                                <span>Medium</span>
                                <svg id="svg-medium" xmlns="http://www.w3.org/2000/svg" width="18" height="8"
                                    fill="none">
                                    <g fill="#FFA800" clip-path="url(#a)">
                                        <path
                                            d="M16.569 7.167H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.099.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275ZM16.569 2.71H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.1.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.5.833h17v6.333H.5z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                                <span>Low</span>
                                <svg id="svg-low" xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
                                    <g fill="#7AE229">
                                        <path
                                            d="M10.334 9.006c-.235 0-.463-.075-.652-.214L.779 2.222A1.096 1.096 0 1 1 2.083.46l8.251 6.082L18.585.46a1.097 1.097 0 0 1 1.304 1.763l-8.903 6.57c-.189.138-.417.213-.652.213Z" />
                                        <path
                                            d="M10.334 14.754c-.235 0-.463-.074-.652-.213L.779 7.97a1.096 1.096 0 1 1 1.304-1.763l8.251 6.083 8.251-6.083a1.098 1.098 0 0 1 1.304 1.763l-8.903 6.57c-.189.139-.417.214-.652.213Z" />
                                    </g>
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div class="add-task-title">
                        <span>Category<span class="red-asterisk">*</span></span>
                        <select class="input-task-select" required id="category" aria-placeholder="Select task category">
                            <option value="" disabled selected>Select a Category</option>
                            <option value="technical-task">Technical Task</option>
                            <option value="user-story">User Story</option>
                        </select>
                    </div>

                    <div class="subtask-container">
                        <span>Subtask</span>
                        <div class="input-sub-field">
                            <input class="input-subtask" id="subtask" placeholder="Add new subtask"/>
                            <img src="./assets/img/add_subtask.svg" class="suffix" id="addButton" alt="" onclick="addTodo()">
                        </div>
                        <ul id="mylist"></ul>
                    </div>
                </div>
            </div>

            <div class="create-task-container">
                <span>
                    <span class="red-asterisk">*</span>This field is required
                </span>
                <div class="form-button">
                    <div class="button-clear" onclick="clearInputFields()">
                        <span>Clear</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none">
                            <mask id="a" width="24" height="24" x="4" y="4" maskUnits="userSpaceOnUse"
                                style="mask-type:alpha">
                                <path fill="#D9D9D9" d="M4 4h24v24H4z" />
                            </mask>
                            <g mask="url(#a)">
                                <path fill="#fff"
                                    d="m16 17.4-4.9 4.9a.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275.948.948 0 0 1-.275-.7c0-.283.091-.517.275-.7l4.9-4.9-4.9-4.9a.948.948 0 0 1-.275-.7c0-.283.091-.517.275-.7a.948.948 0 0 1 .7-.275c.283 0 .516.092.7.275l4.9 4.9 4.9-4.9a.948.948 0 0 1 .7-.275c.283 0 .516.092.7.275a.948.948 0 0 1 .275.7.948.948 0 0 1-.275.7L17.4 16l4.9 4.9a.949.949 0 0 1 .275.7.948.948 0 0 1-.275.7.948.948 0 0 1-.7.275.948.948 0 0 1-.7-.275L16 17.4Z" />
                            </g>
                        </svg>
                    </div>
                    <button class="button-create">
                        <span>Create Task</span>
                        <img src="/assets/img/check.svg" alt="">
                    </button>
                </div>
            </div>
        </form>
    </div>
    `;
}


/**
 * This function is used to render the HTML of the Popup.
 * 
 * @param {Object} task - The task object containing details about the task.
 * @param {string} urgentSymbolHTML - HTML representing the urgent priority symbol.
 * @param {string} mediumSymbolHTML - HTML representing the medium priority symbol.
 * @param {string} lowSymbolHTML - HTML representing the low priority symbol.
 * @param {string} userNamesHTML - HTML representing the assigned users' names and initials.
 * @param {string} subtasksHTML - HTML representing the subtasks of the task.
 * @returns {string} - The HTML string representing the popup.
 */
function renderTaskDetailsInPopup(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userNamesHTML, subtasksHTML) {
    return /*html*/ `
    <div class="complete_board_popup" onclick="doNotClose(event)">
        <div class="popup-card popup-card-mobile", onclick="doNotClose(event)">
        <div class="board_popup board_popup_mobile">
            <div class="flex-container-head">
                <div class="task_popup_${task.category}">
                    <p>${task.category}</p>
                </div>
                <div class="close_icon_box">
                    <img class="img_popup img_popup_mobile" style="cursor: pointer;" onclick="closeIncomePopup()"
                        src="./assets/img/close_icon.svg" alt="close Button">
                </div>
            </div>
            
            <textarea class="titelarea titelarea-mobile">${task.titel}</textarea>
      
     
            <textarea class="descriptionarea descriptionarea-mobile">${task.description}</textarea>
        
            <div class="due_date_popup due-date-popup-mobile">
                <p style="color: #42526E;">Due Date:</p>
                <p id="variable_date">${task.dueDate}</p>
            </div>
            <div class="priority_popup priority-popup-mobile">
                <p class="prioity_container prioity-container-mobile" style="color: #42526E;">Priority:</p>
                ${urgentSymbolHTML}
                ${mediumSymbolHTML}
                ${lowSymbolHTML}
            </div>
            <div class="assigned-popup">
    <p class="assigned-mobile" style="color: #42526E;">Assigned to:</p>
    <div class="user-container-popup">
        ${userNamesHTML} 
    </div>
    <p class="subtask_container subtask-container-mobile" style="color: #42526E;">Subtasks</p>
    <div class="subtask-list subtask-list-mobile">
        ${subtasksHTML} 
    </div>
    <div class="edit-delete" id="edit">
        <a class="button-delete-edit" href="#" onclick="deleteTask(${task.id})">
            <img class="edit-delete-img edit-delete-img-mobile" src="/assets/img/delete_icon.svg"
                alt="Bild plus Button" />
            <div class="edit-delete-popup-button edit-delete-popup-button-mobile">Delete</div>
        </a>
        <a class="button-delete-edit" href="#" onclick="editPopup(${task.id})">
            <img class="edit-delete-img edit-delete-img-mobile" src="/assets/img/edit_icon.svg"
                alt="Bild plus Button" />
            <div class="edit-delete-popup-button edit-delete-popup-button-mobile">Edit</div>
        </a>
    </div>
</div>
        </div>
    </div>
`;
}


/**
 * Generates HTML for the edit popup form.
 * 
 * @returns {string} - The HTML markup for the edit popup form.
 */
function generateHtmlForEditPopup(taskId) {
    return/*html*/ `
<form class="task-edit-form" onsubmit="addTask()" onclick="doNotClose(event), closeUserListInPopup()">
<div class="close-icon-edit-popup">
        <img class="img_popup" style="cursor: pointer;" onclick="closeEditPopup()" src="./assets/img/close_icon.svg" alt="close Button">
    </div>
<div class="add-task-form-edit">
    <div class="add-task-title">
        <span>Title<span class="red-asterisk">*</span></span>
        <input type="text" required placeholder="Enter a title" id="titel">
    </div>
    <div class="add-task-title">
        <span>Description</span>
        <textarea type="text" required minlength="5" placeholder="Enter a description" id="description"></textarea>
    </div>
    <div class="add-task-title">
        <span>Assigned to</span>
        <div class="assigned-input">
    <input class="input-task-select" id="search-user" autocomplete="off" onkeydown="filterUser()" onclick="openUserList(event)" type="text" placeholder="Select contacts to assign">
    <img onclick="openUserList(event)" id="input-icon" class="input-arrow" src="./assets/img/arrow_drop_down_1.svg" alt="">
      </div>
      <div id="user-list" class="d-none" onclick="doNotClose(event)"></div>
    <div id="selected-user"></div>
    </div>
    <div class="add-task-title">
        <span>Due a date<span class="red-asterisk">*</span></span>
        <input class="input-task-date" type="date" id="dueDate" required>
    </div>
    <div class="add-task-title">
        <span>Prio</span>
        <div class="priority-buttons">
            <button type="button" class="priority-button" id="urgent" onclick="togglePriority('urgent')">
                <span>Urgent</span>
                <svg id="svg-urgent" xmlns="http://www.w3.org/2000/svg" width="21" height="15"
                                    fill="none">
                                    <g fill="#FF3D00" clip-path="url(#a)">
                                        <path
                                            d="M19.571 14.755c-.234 0-.463-.075-.652-.214l-8.252-6.083-8.252 6.083a1.098 1.098 0 0 1-1.304-1.763l8.904-6.57a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.095 1.095 0 0 1-.652 1.977Z" />
                                        <path
                                            d="M19.571 9.006c-.234 0-.463-.075-.652-.214L10.667 2.71 2.415 8.792A1.098 1.098 0 0 1 1.111 7.03L10.015.46a1.096 1.096 0 0 1 1.304 0l8.904 6.57a1.096 1.096 0 0 1-.652 1.977Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.667.245h20v14.51h-20z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button active-medium" id="medium"
                                onclick="togglePriority('medium')">
                                <span>Medium</span>
                                <svg id="svg-medium" xmlns="http://www.w3.org/2000/svg" width="18" height="8"
                                    fill="none">
                                    <g fill="#FFA800" clip-path="url(#a)">
                                        <path
                                            d="M16.569 7.167H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.099.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275ZM16.569 2.71H1.431a.928.928 0 0 1-.66-.275.942.942 0 0 1 0-1.327.928.928 0 0 1 .66-.275h15.137c.247 0 .483.1.658.275a.942.942 0 0 1 0 1.327.928.928 0 0 1-.659.275Z" />
                                    </g>
                                    <defs>
                                        <clipPath id="a">
                                            <path fill="#fff" d="M.5.833h17v6.333H.5z" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </button>
                            <button type="button" class="priority-button" id="low" onclick="togglePriority('low')">
                                <span>Low</span>
                                <svg id="svg-low" xmlns="http://www.w3.org/2000/svg" width="21" height="15" fill="none">
                                    <g fill="#7AE229">
                                        <path
                                            d="M10.334 9.006c-.235 0-.463-.075-.652-.214L.779 2.222A1.096 1.096 0 1 1 2.083.46l8.251 6.082L18.585.46a1.097 1.097 0 0 1 1.304 1.763l-8.903 6.57c-.189.138-.417.213-.652.213Z" />
                                        <path
                                            d="M10.334 14.754c-.235 0-.463-.074-.652-.213L.779 7.97a1.096 1.096 0 1 1 1.304-1.763l8.251 6.083 8.251-6.083a1.098 1.098 0 0 1 1.304 1.763l-8.903 6.57c-.189.139-.417.214-.652.213Z" />
                                    </g>
                                </svg>
                            </button>
        </div>
    </div>
    <div class="subtask-container">
        <span>Subtask</span>
        <div class="input-sub-field">
            <input class="input-subtask" id="subtask" />
            <div onclick="addTodo();" id="addButton" class="plus-button-subtask-edit-popup">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" fill="none">
                <path fill="#2A3647"
                   d="M6.249 8h-5a.968.968 0 0 1-.713-.287A.968.968 0 0 1 .249 7c0-.283.095-.52.287-.713A.968.968 0 0 1 1.249 6h5V1c0-.283.095-.52.287-.713A.968.968 0 0 1 7.249 0c.283 0 .52.096.712.287.192.192.288.43.288.713v5h5c.283 0 .52.096.712.287.192.192.287.43.287.713s-.095.52-.287.713a.967.967 0 0 1-.713.287h-5v5c0 .283-.095.52-.287.713a.967.967 0 0 1-.712.287.967.967 0 0 1-.713-.287.968.968 0 0 1-.287-.713V8Z" />
                </svg>
            </div>
        </div>
        <ul id="mylist"></ul>
    </div>
</div>
<div class="button-ok">
    <button id="saveEditButton" class="button-edit-ok" onclick="SaveEditedTask(${taskId})">OK<img src="/assets/img/check.svg" alt=""></button>
</div>
</form>
 `;
}


/**
 * This function is used to render all tasks with progress status "to do"
 * 
 * @param {*} task 
 * @param {*} urgentSymbolHTML 
 * @param {*} mediumSymbolHTML 
 * @param {*} lowSymbolHTML 
 * @param {*} userInitialsHTML 
 * @param {*} progressPercentage 
 * @param {*} completedSubtasks 
 * @param {*} totalSubtasks 
 */
function renderAllTasksInProgressfieldTodo(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userInitialsHTML, progressPercentage, completedSubtasks, totalSubtasks) {
    return /*html*/`
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
      <div class="card">
        <div class="card-category-${task.category}">${task.category}</div>
        <div class="card-headline">${task.titel}</div>
        <div class="card-description">${task.description}</div>
        <div class="progress-container">
          <div class="progress" style="flex: 1;">
            <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
          </div>
          <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
        </div>
        <div class="user-priority-container">
          <div class="user-container">
            ${userInitialsHTML}
          </div>
          <div class="priority-symbols">
            ${urgentSymbolHTML}
            ${mediumSymbolHTML}
            ${lowSymbolHTML}
          </div>
        </div>
        
      </div>
    </a>`;
}


/**
 * This function is used to render all tasks with progress status "in progress"
 * 
 * @param {*} task 
 * @param {*} urgentSymbolHTML 
 * @param {*} mediumSymbolHTML 
 * @param {*} lowSymbolHTML 
 * @param {*} userInitialsHTML 
 * @param {*} progressPercentage 
 * @param {*} completedSubtasks 
 * @param {*} totalSubtasks 
 */
function renderAllTasksInProgressfieldInProgress(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userInitialsHTML, progressPercentage, completedSubtasks, totalSubtasks) {
    return /*html*/`
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-description">${task.description}</div>
    <div class="progress-container">
              <div class="progress" style="flex: 1;">
                <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>
    <div class="user-priority-container">
                    <div class="user-container">
                        ${userInitialsHTML}
                    </div>
                    <div class="priority-symbols">
                        ${urgentSymbolHTML}
                        ${mediumSymbolHTML}
                        ${lowSymbolHTML}
                    </div>
                </div>
            </div>
        </a>
    `;
}


/**
 * This function is used to render all tasks with progress status "await feedback"
 * 
 * @param {*} task 
 * @param {*} urgentSymbolHTML 
 * @param {*} mediumSymbolHTML 
 * @param {*} lowSymbolHTML 
 * @param {*} userInitialsHTML 
 * @param {*} progressPercentage 
 * @param {*} completedSubtasks 
 * @param {*} totalSubtasks 
 */
function renderAllTasksInProgressfieldAwaitFeedback(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userInitialsHTML, progressPercentage, completedSubtasks, totalSubtasks) {
    return /*html*/`
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-description">${task.description}</div>
    <div class="progress-container">
              <div class="progress" style="flex: 1;">
                <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>
    <div class="user-priority-container">
                    <div class="user-container">
                        ${userInitialsHTML}
                    </div>
                    <div class="priority-symbols">
                        ${urgentSymbolHTML}
                        ${mediumSymbolHTML}
                        ${lowSymbolHTML}
                    </div>
                </div>
            </div>
        </a>
    `;
}


/**
 * This function is used to render all tasks with progress status "done"
 * 
 * @param {*} task 
 * @param {*} urgentSymbolHTML 
 * @param {*} mediumSymbolHTML 
 * @param {*} lowSymbolHTML 
 * @param {*} userInitialsHTML 
 * @param {*} progressPercentage 
 * @param {*} completedSubtasks 
 * @param {*} totalSubtasks 
 */
function renderAllTasksInProgressfieldDone(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userInitialsHTML, progressPercentage, completedSubtasks, totalSubtasks) {
    return /*html*/`
    <a draggable="true" href="#" ondragstart="startDragging(${task.id})" class="card-section desktop-card-section" onclick="showPopup(${task.id})">
    <div class="card">
    <div class="card-category-${task.category}">${task.category}</div>
    <div class="card-headline">${task.titel}</div>
    <div class="card-description">${task.description}</div>
    <div class="progress-container">
              <div class="progress" style="flex: 1;">
                <div class="progress-bar" style="width: ${progressPercentage}%; background-color:#4586ff;" role="progressbar" aria-valuenow="${progressPercentage}" aria-valuemin="0" aria-valuemax="100"></div>
              </div>
              <div class="progress-text">${completedSubtasks}/${totalSubtasks} Subtasks</div>
            </div>
    <div class="user-priority-container">
                    <div class="user-container">
                        ${userInitialsHTML}
                    </div>
                    <div class="priority-symbols">
                        ${urgentSymbolHTML}
                        ${mediumSymbolHTML}
                        ${lowSymbolHTML}
                    </div>
                </div>
            </div>
        </a>
    `;
}


/**
 * 
 * @returns If there are no tasks in progressfield it shows this message
 */
function renderEmptyProgressfieldTodo() {
    return /*html*/`
    <div class="no-tasks desktop-no-tasks">
        <span>No tasks to do</span>
    </div>
    `;
  }


  /**
 * 
 * @returns If there are no tasks in progressfield it shows this message
 */
function renderEmptyProgressfieldInProgress() {
    return /*html*/`
    <div class="no-tasks desktop-no-tasks">
        <span>No tasks in progress</span>
    </div>
    `;
  }


  /**
 * 
 * @returns If there are no tasks in progressfield it shows this message
 */
function renderEmptyProgressfieldAwaitFeedback() {
    return /*html*/`
    <div class="no-tasks desktop-no-tasks">
        <span>No tasks in await feedback</span>
    </div>
    `;
  }


  /**
 * 
 * @returns If there are no tasks in progressfield it shows this message
 */
function renderEmptyProgressfieldDone() {
    return /*html*/`
    <div class="no-tasks desktop-no-tasks">
        <span>No tasks done</span>
    </div>
    `;
  }


  /**
 * Renders subtasks in the popup window.
 * 
 * @param {number} taskId - The ID of the task.
 * @param {Object} subtask - The subtask object.
 * @returns {string} - HTML markup for rendering subtasks.
 */
function renderSubtasksInPopup(taskId, subtask) {
    return /*html*/`
    <div class="form-check">
        <input class="form-check-input form-check-input-mobile" type="checkbox" id="subtask_${subtask.name
          }" ${subtask.status ? "checked" : ""
          } onchange="updateSubtaskStatus(${taskId}, '${subtask.name}', this.checked)">
        <label class="form-check-label" for="subtask_${subtask.name}">${subtask.name
          }</label>
    </div>
  `;
  }
  

  /**
   * Renders initials for users in the popup window.
   * 
   * @param {Object} user - The user object.
   * @returns {string} - HTML markup for rendering user initials.
   */
  function renderInitialsForPopup(user) {
    return /*html*/`
  <div class="user-details user-details-mobile">
      <div class="initials-circle-two initials-circle-mobile" style="background-color: ${user.backgroundcolor
  };">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
      <div class="user-full-name user-full-name-mobile">${user.fname} ${user.lname
  }</div>
  </div>`;
  }


/**
 * shows selected user in popup, who belongs the task
 * 
 * @param {*} user 
 */
  function renderAssignedUserInEditPopup(user) {
    return /*html*/ `
    <div class="user-details">
        <div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>
    </div>
  `;
  }

  
/**
 * this function is used to render the user list in editPopup
 */
function renderUserListInEditPopup(user, userColor, initialLetters, i) {
  return/* html */ `
        <div id="currentUser${i}" class="userColumn ${isUSerSelectedEdit(user.id) ? "user-list-active" : ""
    }" onclick="toggleAddUserEdit(${user.id})">
          <div class="user-name">
            <span class="letter-icon" style="background-color:${userColor}">${initialLetters}</span>
            <div>${user.name}</div>
          </div>
          <img id="user-checkbox${i}" src="${isUSerSelectedEdit(user.id)
      ? "./assets/img/checkbox_active_white.svg"
      : "./assets/img/checkbox.svg"
    }" alt="">
        </div>
      `;
}