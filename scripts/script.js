const enterTask = document.getElementById("enterTask");
const addTask = document.getElementById("addTask");
const taskListUI = document.getElementById("taskList");
const toastUI = document.getElementById("toast");
var taskList = [], taskCount = 0;
addTask.addEventListener("click", event => { addUserTask(); }, false); 
document.querySelector("form").addEventListener("submit", event => { event.preventDefault(); addUserTask(); }, false);
function addUserTask() {
    let taskName = enterTask.value.trim();
    if(taskName == '' || taskName === ``) { toast( "Can't Add Empty Task." ); return false; }
    taskCount++;
    console.log(taskName);
    let newElement = document.createElement("div");
    newElement.setAttribute("class", "task form-check col-12 d-flex flex-sm-nowrap flex-wrap justify-content-around align-items-center ps-3 p-2 mb-3");
    newElement.innerHTML = `<input id="check-${taskCount}" class="col-2 complete form-check-input p-3 m-0" type="checkbox">
                            <label for="check-${taskCount}" class="col-10 form-check-label p-2">${taskName}</label>
                            <div class="col-12 input-group task-options d-flex ps-2 pe-2">
                                <input id="editTask-${taskCount}" class="edit p-2 me-1" type="button" value="     "> 
                                <input id="deleteTask-${taskCount}" class="delete flex-grow-1 p-2" type="button" value="     " style="border-left: 1.5px solid rgba(0, 0, 0, 0.25);">
                            </div>`;
    taskList.push( { 'taskNumber': taskCount, 'name': taskName, 'completed': 0, 'element': newElement } );
    enterTask.value = "";
    updateListner(taskList[taskList.length-1]);
    updateTaskList();
    return false;
}
Array.prototype.removeElement = function(taskNum) {
    for(let i = 0; i < taskList.length; i++) 
        if(taskList[i]['taskNumber'] == taskNum)  
            taskList.splice(i, 1); 
    return false;
}
function updateListner(task) {
    task['element'].querySelector(".complete").addEventListener("click", event => { 
        if ( task['completed'] == 0 ) task['completed'] = 1;
        else task['completed'] = 0;
        updateTaskList();
    });
    task['element'].querySelector(".delete").addEventListener("click", event => { 
        task['element'].remove(); 
        taskList.removeElement(task['taskNumber']); 
    });
    task['element'].querySelector(".edit").addEventListener("click", event => { 
        let change = getPopupInput(task['name']); 
        task['name'] = change; 
        task['element'].querySelector("label").innerHTML = change ; 
        updateTaskList(); 
        console.log(taskList); 
    });
    return false;
}
function updateTaskList() {
    taskListUI.innerHTML = "";
    taskList.forEach( task => { if(task['completed'] == 0) { 
        taskListUI.prepend(task['element']);
    } } );
    taskList.forEach( task => { if(task['completed'] == 1) { 
        taskListUI.append(task['element']);
     } } );
    return false;
}
function getPopupInput(current) {
    let userInput = prompt("Change Your Task Name:", current);
    if (userInput == null || userInput == "") {
        toast( "Can't Add Empty Task." ); 
        userInput = current;
    } return userInput;
}
function toast(message) {
    toastUI.innerHTML = message;
    toastUI.style.animation = 'toast 2.5s ease-in';
    setTimeout(()=>{toastUI.style.animation = 'none';}, 2500);
    return false;
}