/**
 * Initializes the summary view by loading tasks and generating HTML content.
 */
function initSummary() {
    init();
    loadAllTasks();
    let tasksFromLocalStorage = localStorage.getItem("allTasks");
    if (!tasksFromLocalStorage) {
        saveTasksToLocalStorage(allTasks);
    } else {
        allTasks = JSON.parse(tasksFromLocalStorage);
    }

    let todo = [];
    let done = [];
    let urgent = [];
    let inProgress = [];
    let awaitFeedback = [];
    let allTasksCount = allTasks.length;
    let earliestUrgentDueDate = null;
    allTasks.forEach(task => {
        if (task.progressfield === 'todo_container') todo.push(task);
        else if (task.progressfield === 'done_container') done.push(task);
        if (task.priority.urgent) {
            urgent.push(task);
            if (task.dueDate) {
                let dueDate = new Date(task.dueDate);
                if (!earliestUrgentDueDate || dueDate < earliestUrgentDueDate) {
                    earliestUrgentDueDate = dueDate;
                }
            }
        }
        if (task.progressfield === 'inprogress_container') inProgress.push(task);
        else if (task.progressfield === 'await_feedback_container') awaitFeedback.push(task);
    });

    let upcomingDeadline = earliestUrgentDueDate ? earliestUrgentDueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : '';

    document.getElementById('content-summary').innerHTML = generateHtmlForSummary(todo, done, urgent, inProgress, awaitFeedback, allTasksCount, upcomingDeadline);
}


/**
 * Generates HTML content for the summary view based on task categories and counts.
 * @param {Array} todo - Array of tasks in 'To-do' status.
 * @param {Array} done - Array of tasks in 'Done' status.
 * @param {Array} urgent - Array of tasks marked as 'Urgent'.
 * @param {Array} inProgress - Array of tasks in progress.
 * @param {Array} awaitFeedback - Array of tasks awaiting feedback.
 * @param {number} allTasksCount - Total count of all tasks.
 * @param {string} upcomingDeadline - Formatted upcoming deadline date.
 * @returns {string} HTML content for the summary view.
 */
function generateHtmlForSummary(todo, done, urgent, inProgress, awaitFeedback, allTasksCount, upcomingDeadline) {
    return /*html*/`
    <div class="titel-box">
    <div class="summary-title">
        <h1 class="desktop-h1">Join 360</h1>
        <div class="desktop-summary-border"></div>
        <h5>Key Metrics at a Glance</h5>
    </div>
        <div class="mobile-summary-border"><img src="./assets/img/login-border.svg"></div>
    </div>

    <div class="left-and-right-column">
        <div class="left-column">
            <div class="summary-boxes">
                <div class="summary-box-row-1">
                    <a href="./board.html" class="anchor-style box-row-1">
                        <svg class="change-svg" width="69" height="70" viewBox="0 0 69 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group 7">
                            <circle class="svg-color" id="Ellipse 4" cx="34.5" cy="35" r="34.5" fill="#2A3647"/>
                            <g id="edit">
                            <mask id="mask0_130978_6084" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="18" y="19" width="33" height="32">
                            <rect id="Bounding box" x="18.5" y="19" width="32" height="32" fill="#D9D9D9"/>
                            </mask>
                            <g mask="url(#mask0_130978_6084)">
                            <path class="svg-color2" id="edit_2" d="M25.1667 44.3332H27.0333L38.5333 32.8332L36.6667 30.9665L25.1667 42.4665V44.3332ZM44.2333 30.8998L38.5667 25.2998L40.4333 23.4332C40.9444 22.9221 41.5722 22.6665 42.3167 22.6665C43.0611 22.6665 43.6889 22.9221 44.2 23.4332L46.0667 25.2998C46.5778 25.8109 46.8444 26.4276 46.8667 27.1498C46.8889 27.8721 46.6444 28.4887 46.1333 28.9998L44.2333 30.8998ZM42.3 32.8665L28.1667 46.9998H22.5V41.3332L36.6333 27.1998L42.3 32.8665Z" fill="white"/>
                            </g>
                        </svg>
                        <div class="number-and-name">
                            <span>${todo.length}</span>
                            <h5>To-do</h5>
                        </div>
                    </a>
                    <a href="./board.html" class="anchor-style box-row-1">
                        <svg class="change-svg" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g id="Group 7">
                            <circle class="svg-color" id="Ellipse 4" cx="20" cy="20" r="20" fill="#2A3647"/>
                            <path class="svg-color3" id="Vector" d="M11.3203 20.0001L17.8297 26.4151L28.6788 13.585" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                            </g>
                        </svg>                                
                        <div class="number-and-name">
                            <span>${done.length}</span>
                            <h5>Done</h5>
                        </div>
                    </a>
                </div>

                <a href="./board.html" class="anchor-style summary-box-row-2">
                    <div class="urgent-number">
                        <img src="assets/img/urgent_icon.svg">
                        <div class="number-and-name">
                            <span>${urgent.length}</span>
                            <h5>Urgent</h5>
                        </div>
                    </div>
                    <div class="urgent-border"></div>
                    <div class="urgent-data">
                        <span>${upcomingDeadline}</span>
                        <h5>Upcoming Deadline</h5>
                    </div>
                </a>

                <div class="summary-box-row-3">
                    <a href="./board.html" class="anchor-style box-row-3">
                        <span class="number-and-name">${allTasksCount}</span>
                        <h5>Tasks in<br> Board</h5>
                    </a>
                    <a href="./board.html" class="anchor-style box-row-3">
                        <span class="number-and-name">${inProgress.length}</span>
                        <h5>Tasks in<br> Progress</h5>
                    </a>
                    <a href="./board.html" class="anchor-style box-row-3">
                        <span class="number-and-name">${awaitFeedback.length}</span>
                        <h5>Awaiting<br> Feedback</h5>
                    </a>
                </div>
            </div>
        </div>
        <div class="right-column">
            <h2>Good morning,</h2>
            <span id="user-greating-desktop" class="greating-titel"></span>
        </div>
    </div>
    `;
}