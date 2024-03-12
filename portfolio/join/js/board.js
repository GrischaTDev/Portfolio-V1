loggedInUser = [];

let currentDraggedElement;


/**
 * This function is used to initial the board.
 */
async function initBoard() {
  await includeHTML();
  loadAllTasks();
  activeMenu();
  load();
  loadUsers();
  loadUserProfile();
  showAllTasks(allTasks);
  if (!localStorage.getItem("allTasks")) {
    saveTasksToLocalStorage(allTasks);
  } else {
    allTasks = JSON.parse(localStorage.getItem("allTasks"));
    saveTasksToLocalStorage(allTasks);
  }
}


/**
 * This functioin is used to open a new Task Popup.
 */
function openAddNewTaskPopup() {
  if (window.innerWidth > 900) {
    document.body.classList.add("popup-open");
    document
      .getElementById("add-task-popup-container")
      .classList.remove("d-none");
    document.getElementById("add-task-popup-container").innerHTML = "";
    document.getElementById("add-task-popup-container").innerHTML +=
      renderAddNewTaskInPopup();
  } else {
    window.location.href = "add_task.html";
  }
}


/**
 * This function is used to close the add new Task Popup.
 */
function closeAddTaskPopup() {
  document.getElementById("add-task-popup-container").classList.add("d-none");
  document.body.classList.remove("popup-open");
}


/**
 * Displays a popup window with details of a task.
 * 
 * @param {number} taskId - The ID of the task to be displayed.
 */
function showPopup(taskId) {
  document.body.classList.add('popup-open');
  let task = findTaskById(taskId);
  let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent"> Urgent` : "";
  let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium"> Medium` : "";
  let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low"> Low` : "";
  let userNamesHTML = task.userList.map((user) => renderInitialsForPopup(user)
  ).join("");
  let subtasksHTML = task.subtask ? task.subtask.map((subtask) => renderSubtasksInPopup(taskId, subtask)
  ).join("") : "";
  document.getElementById("incomePopup").classList.remove("d-none");
  document.getElementById("incomePopup").innerHTML = renderTaskDetailsInPopup(task, urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userNamesHTML, subtasksHTML);
}


/**
 * This function is used to close the Popup that shows the Task details
 */
function closeIncomePopup() {
  document.getElementById("incomePopup").classList.add("d-none");
  document.body.classList.remove("popup-open");
}


/**
 * Opens a popup window to edit the details of a selected task.
 * 
 * @param {number} taskId - The ID of the task to be edited.
 */
function editPopup(taskId) {
  document.body.classList.add('popup-open');
  document.getElementById("incomePopup").classList.add("d-none");
  document.getElementById('content-board').classList.add('do-not-scroll');
  document.getElementById('edit_popup').classList.remove('d-none');
  document.getElementById('edit_popup').innerHTML = '';
  let tasks = JSON.parse(localStorage.getItem('allTasks'));
  let taskToEdit = tasks.find(task => task.id === taskId);
  if (taskToEdit && taskToEdit.subtask) {
    todos = taskToEdit.subtask.map(subtask => subtask.name);
  } else {
    todos = [];
  }
  renderEditPopup(taskId);
}


/**
 * Renders a popup window for editing the details of a selected task.
 * 
 * @param {number} taskId - The ID of the task to be edited.
 */
function renderEditPopup(taskId) {
  let tasks = JSON.parse(localStorage.getItem('allTasks'));
  let taskToEdit = tasks.find(task => task.id === taskId);
  document.getElementById('edit_popup').innerHTML += generateHtmlForEditPopup(taskId);
  getValuesFromAllTasksArray(taskToEdit);
  taskToEdit.userList.forEach(user => {
    document.getElementById('selected-user').innerHTML += renderAssignedUserInEditPopup(user);
  });
  showTodos();
}


/**
 * 
 * 
 * @param {*} taskToEdit 
 */
function getValuesFromAllTasksArray(taskToEdit) {
  document.getElementById('titel').value = taskToEdit.titel;
  document.getElementById('description').value = taskToEdit.description;
  document.getElementById('dueDate').value = taskToEdit.dueDate;
  if (taskToEdit.priority.urgent) {
    document.getElementById('urgent').classList.add('active');
  } else if (taskToEdit.priority.medium) {
    document.getElementById('medium').classList.add('active');
  } else {
    document.getElementById('low').classList.add('active');
  }
}


/**
 * This function closes the user list in a popup
 */
function closeUserListInPopup() {
  document.getElementById("user-list").classList.add("d-none");
}


/**
 * Renders the selected users by displaying their initials inside colored circles.
 * 
 * @param {Array} selectedUser - An array containing user objects with 'color' property.
 */
function renderSelectedUsersInEdit(selectedUser) {
  let selectedUserList = document.getElementById('selected-user');
  selectedUserList.innerHTML = '';
  selectedUser.forEach(user => {
    let initialLetters = nameInitialLettersAddTasks(user);
    const userColor = user['color'];
    selectedUserList.innerHTML += /* html */ `
        <div class="user-icon" style="background-color: ${userColor};">${initialLetters}</div>
      `;
  });
}


/**
 * 
 * @param {*} event 
 */
function openUserListEdit(event) {
  let userList = document.getElementById("user-list");
  let inputIcon = document.getElementById("input-icon");
  userList.innerHTML = "";
  if (userList.classList.contains("d-none")) {
    userList.classList.remove("d-none");
    inputIcon.src = "./assets/img/arrow_drop_down_2.svg";
  }
  users.forEach((user, i) => {
    const userColor = user["color"];
    let initialLetters = nameInitialLettersAddTasks(user);
    userList.innerHTML += renderUserListInEditPopup(user, userColor, initialLetters, i);
  });
}


/**
 * This function checks if a user is selected in edit popup
 * 
 * @param {*} userId 
 */
function isUSerSelectedEdit(userId) {
  return selectedUser.some((su) => su.id === userId);
}


/**
 * This function is used to add or remove with toggle a user to userlist in edit popup
 * 
 * @param {*} userId 
 */
function toggleAddUserEdit(userId) {
  let user = users.find((u) => u.id === userId);
  let selectedUSerIndex = selectedUser.findIndex((u) => u.id === userId);
  let checkBoxUser = document.getElementById(`user-checkbox${userId}`);
  if (selectedUSerIndex === -1) {
    selectedUser.push(user);
    checkBoxUser.src = "./assets/img/checkbox_active_white.svg";
  } else {
    selectedUser.splice(selectedUSerIndex, 1);
    checkBoxUser.src = "./assets/img/checkbox.svg";
  }
  renderSelectedUsersInEdit(selectedUser);
}


/**
 * This function saves a selected user to local storage
 * 
 * @param {*} selectedUser 
 */
function saveSelectedUserToLocalStorage(selectedUser) {
  localStorage.setItem("selectedUser", JSON.stringify(selectedUser));
}


/**
 * This function loads selected users from local storage
 */
function loadSelectedUserFromLocalStorage() {
  let loadUser = localStorage.getItem("selectedUser");
  if (loadUser) {
    selectedUser = JSON.parse(loadUser);
  }
}


/**
 * this function checks if a user is selected in addTask
 * 
 * @param {*} i 
 */
function isUSerSelected(i) {
  return selectedUser.some((su) => su.id === i);
}


/**
 * this function is used to generate initial letters of users
 * 
 * @param {*} user 
 */
function nameInitialLettersAddTasks(user) {
  const fullNameSplitt = user.name.split(" ");
  const letters = fullNameSplitt.map((name) => name[0]);
  const initialLetters = letters.join("");
  return initialLetters;
}


// /**
//  * this function is used to prevent to close a popup by clicking on it
//  * 
//  * @param {*} event 
//  */
// function doNotClose(event) {
//   event.stopPropagation();
// }


/**
 * This function is used to add or remove with toggle a user to userlist in addTask popup
 * 
 * @param {*} userId 
 */
function toggleAddUser(i) {
  let userColumn = document.getElementById(`currentUser${i}`);
  let user = users[i];
  let selectedUSerIndex = selectedUser.findIndex((u) => u.id === i);
  let checkBoxUser = document.getElementById(`user-checkbox${i}`);
  if (selectedUSerIndex === -1) {
    userColumn.classList.add("user-list-active");
    selectedUser.push(user);
    checkBoxUser.src = "./assets/img/checkbox_active_white.svg";
  } else {
    userColumn.classList.remove("user-list-active");
    selectedUser.splice(selectedUSerIndex, 1);
    checkBoxUser.src = "./assets/img/checkbox.svg";
  }
  renderUserList(i);
  save();
}


/**
 * this function is used to update the user list in tasks
 */
function updateUserListInTasks() {
  allTasks.forEach((task) => {
    // Überprüfen, ob der Task Benutzer hat
    if (task.userList && task.userList.length > 0) {
      task.userList = task.userList.map((user) => {
        // Suchen des entsprechenden Benutzers im selectedUser-Array
        const selectedUserIndex = selectedUser.findIndex(
          (selected) => selected.name === user.fname + " " + user.lname
        );
        if (selectedUserIndex !== -1) {
          // Aktualisieren der Benutzerdaten im Task
          user.backgroundcolor = selectedUser[selectedUserIndex].color;
        }
        return user;
      });
    }
  });
}


/**
 * This function saves an edited Task
 * 
 * @param {*} taskId - The ID of the task to be edited.
 */
function SaveEditedTask(taskId) {
  const editedTask = generateEditedTask(taskId);
  const allTasks = JSON.parse(localStorage.getItem('allTasks'));
  const index = allTasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    allTasks[index] = editedTask;
  }
  localStorage.setItem('allTasks', JSON.stringify(allTasks));
  closeEditPopup();
}


/**
 * Generates an edited task object based on the provided taskId and DOM elements.
 * 
 * @param {*} taskId - The ID of the task to be edited.
 * @returns {*} - The edited task object.
 */
function generateEditedTask(taskId) {
  return {
    id: taskId,
    titel: document.getElementById('titel').value,
    description: document.getElementById('description').value,
    dueDate: document.getElementById('dueDate').value,
    category: allTasks.find(task => task.id === taskId).category,
    priority: {
      low: document.getElementById('low').classList.contains('active-low'),
      medium: document.getElementById('medium').classList.contains('active-medium'),
      urgent: document.getElementById('urgent').classList.contains('active-urgent')
    },
    subtask: todos.map(name => ({ name, status: false })),
    userList: selectedUser.map(user => ({
      fname: user.name.split(' ')[0],
      lname: user.name.split(' ')[1],
      backgroundcolor: user.color
    })),
    progressfield: allTasks.find(task => task.id === taskId).progressfield
  };
}


/**
 * this function closes the edit popup
 */
function closeEditPopup() {
  document.getElementById('user-list').classList.add('d-none');
  document.body.classList.remove('popup-open');
  document.getElementById("edit_popup").classList.add("d-none");
  loadAllTasks();
  showAllTasks(allTasks);
}


/**
 * This function is used to update the subtask status
 * 
 * @param {*} taskId 
 * @param {*} subtaskName 
 * @param {*} status 
 */
function updateSubtaskStatus(taskId, subtaskName, status) {
  let task = findTaskById(taskId);
  if (task) {
    let subtask = task.subtask.find(sub => sub.name === subtaskName);
    if (subtask && subtask.status !== status) {
      subtask.status = status;
      let completedSubtasks = task.subtask ? task.subtask.filter(subtask => subtask.status).length : 0;
      let totalSubtasks = task.subtask ? task.subtask.length : 0;
      let progressPercentage = Math.round((completedSubtasks / totalSubtasks) * 100);
      task.progress = progressPercentage;
      saveTasksToLocalStorage(allTasks);
      showAllTasks(allTasks);
    }
  }
}


/**
 * This function is used to find tasks by id
 * 
 * @param {*} taskId 
 */
function findTaskById(taskId) {
  for (let i = 0; i < allTasks.length; i++) {
    if (allTasks[i].id === taskId) {
      return allTasks[i];
    }
  }
  return null;
}


/**
 * This function is used to filter all Tasks from array to render in the correct progressfield
 * 
 * @param {*} allTasks - 
 */
function showAllTasks(allTasks) {
  filterAndRenderTasksForTodo(allTasks);
  filterAndRenderTasksForInProgress(allTasks);
  filterAndRenderTasksAwaitFeedback(allTasks);
  filterAndRenderTasksDone(allTasks);
}


/**
 * This function filter all Tasks for 'todo' progressfield
 * 
 * @param {*} allTasks 
 */
function filterAndRenderTasksForTodo(allTasks) {
  let todo_container = allTasks.filter(
    (t) => t["progressfield"] == "todo_container"
  );
  document.getElementById("todo_container").innerHTML = "";
  if (todo_container.length === 0) {
    document.getElementById('todo_container').innerHTML = renderEmptyProgressfieldTodo();
  } else {
    for (let i = 0; i < todo_container.length; i++) {
      let task = todo_container[i];
      let taskDetails = calculateTaskDetails(task);
      document.getElementById('todo_container').innerHTML += renderAllTasksInProgressfieldTodo(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
    }
  }
}


/**
 * This function filter all Tasks for 'in progress' progressfield
 * 
 * @param {*} allTasks 
 */
function filterAndRenderTasksForInProgress(allTasks) {
  let inprogress_container = allTasks.filter(
    (t) => t["progressfield"] == "inprogress_container"
  );
  document.getElementById("inprogress_container").innerHTML = "";
  if (inprogress_container.length === 0) {
    document.getElementById('inprogress_container').innerHTML = renderEmptyProgressfieldInProgress();
  } else {
  for (let i = 0; i < inprogress_container.length; i++) {
    let task = inprogress_container[i];
    let taskDetails = calculateTaskDetails(task);
    document.getElementById("inprogress_container").innerHTML += renderAllTasksInProgressfieldInProgress(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
  }
}
}


/**
 * This function filter all Tasks for 'await feedback' progressfield
 * 
 * @param {*} allTasks 
 */
function filterAndRenderTasksAwaitFeedback(allTasks) {
  let await_feedback_container = allTasks.filter(
    (t) => t["progressfield"] == "await_feedback_container"
  );
  document.getElementById("await_feedback_container").innerHTML = "";
  if (await_feedback_container.length === 0) {
    document.getElementById('await_feedback_container').innerHTML = renderEmptyProgressfieldAwaitFeedback();
  } else {
  for (let i = 0; i < await_feedback_container.length; i++) {
    let task = await_feedback_container[i];
    let taskDetails = calculateTaskDetails(task);
    document.getElementById("await_feedback_container").innerHTML += renderAllTasksInProgressfieldAwaitFeedback(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
  }
}
}


/**
 * This function filter all Tasks for 'done' progressfield
 * 
 * @param {*} allTasks 
 */
function filterAndRenderTasksDone(allTasks) {
  let done_container = allTasks.filter(
    (t) => t["progressfield"] == "done_container"
  );
  document.getElementById("done_container").innerHTML = "";
  if (done_container.length === 0) {
    document.getElementById('done_container').innerHTML = renderEmptyProgressfieldDone();
  } else {
  for (let i = 0; i < done_container.length; i++) {
    let task = done_container[i];
    let taskDetails = calculateTaskDetails(task);
    document.getElementById("done_container").innerHTML += renderAllTasksInProgressfieldDone(task, taskDetails.urgentSymbolHTML, taskDetails.mediumSymbolHTML, taskDetails.lowSymbolHTML, taskDetails.userInitialsHTML, taskDetails.progressPercentage, taskDetails.completedSubtasks, taskDetails.totalSubtasks);
  }
}
}

/**
 * this function calculates all tasks details
 * 
 * @param {*} task 
 */
function calculateTaskDetails(task) {
  let urgentSymbolHTML = task.priority.urgent ? `<img src="/assets/img/prio-urgent.svg" alt="Urgent">` : "";
  let mediumSymbolHTML = task.priority.medium ? `<img src="/assets/img/prio-medium.svg" alt="Medium">` : "";
  let lowSymbolHTML = task.priority.low ? `<img src="/assets/img/prio-low.svg" alt="Low">` : "";
  let userInitialsHTML = task.userList.map((user) => `<div class="initials-circle" style="background-color: ${user.backgroundcolor};">${user.fname.charAt(0)}${user.lname.charAt(0)}</div>`).join("");
  let completedSubtasks = task.subtask ? task.subtask.filter((subtask) => subtask.status).length : 0;
  let totalSubtasks = task.subtask ? task.subtask.length : 0;
  let progressPercentage = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  return { urgentSymbolHTML, mediumSymbolHTML, lowSymbolHTML, userInitialsHTML, completedSubtasks, totalSubtasks, progressPercentage, };
}


/**
 * this function allows to drag an element
 * 
 * @param {*} index 
 */
function startDragging(index) {
  currentDraggedElement = index;
}


/**
 * this function allows too drop an element
 * 
 * @param {*} ev 
 */
function allowDrop(ev) {
  ev.preventDefault();
}


/**
 * this function moves a task in other progressfields
 * 
 * @param {*} progressfield 
 */
function moveTo(progressfield) {
  const taskIndex = currentDraggedElement - 1;
  allTasks[taskIndex]["progressfield"] = progressfield;
  localStorage.setItem("allTasks", JSON.stringify(allTasks));
  showAllTasks(allTasks);
}


/**
 * this function is used to highlight the progressfield while dragging
 * 
 * @param {*} id 
 */
function highlight(id) {
  document.getElementById(id).classList.add("drag-area-highlight");
}


/**
 * this function removes the highlight when task is dropped
 * 
 * @param {*} id 
 */
function removeHighlight(id) {
  document.getElementById(id).classList.remove("drag-area-highlight");
}


/**
 * this function is used to search tasks 
 */
function findTask() {
  let searchInput = document.getElementById('search').value.toLowerCase();
  let filteredTasks = allTasks.filter(task =>
    task.titel.toLowerCase().includes(searchInput) ||
    task.description.toLowerCase().includes(searchInput) ||
    task.category.toLowerCase().includes(searchInput)
  );
  showAllTasks(filteredTasks);
}


/**
 * this function deletes a task
 * 
 * @param {*} taskId 
 */
function deleteTask(taskId) {
  let allTasks = JSON.parse(localStorage.getItem("allTasks")) || [];
  let taskIndex = allTasks.findIndex(task => task.id === taskId);
  if (taskIndex !== -1) {
    allTasks.splice(taskIndex, 1);
    saveTasksToLocalStorage(allTasks);
    loadAllTasks();
    closeIncomePopup();
    showAllTasks(allTasks);
  } else {
    console.log("Task not found");
  }
}
