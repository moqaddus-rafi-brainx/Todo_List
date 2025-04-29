//Adding task on Enter
document.getElementById("task-input").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask(); //Function to add task called when key pressed
    }
});


//Function for deleting the task
function deleteTask(task) {
    let liElement = task.parentElement.parentElement;
    liElement.remove();
}

//Function for adding the task
function addTask() {
    let taskInput = document.getElementById("task-input");
    let list = document.getElementById('task-list');
    if (taskInput.value.trim() != "") {
        let taskText = taskInput.value.trim();

        let listElement = document.createElement('li');
        listElement.innerHTML = `<div class="task-left">
                  <input type="checkbox" class="checked" onclick="completedTask(this)"/>
                  <input type="text" class="hide update-input"/>
                  <span class='task-text'>${taskText}</span>
              </div>
              <div class="task-right">
                  <i class="bi bi-pencil-square" onclick="updateTask(this)"></i>
                  <i class="bi bi-trash" onclick="deleteTask(this)"></i>
              </div>`
        list.appendChild(listElement);

    }
    taskInput.value = "";
}

//Marks and unmarks task as completed on checkbox click
function completedTask(taskCheck) {
    console.log("Inside");
    let parentDiv = taskCheck.parentElement;
    let taskSpan = parentDiv.querySelector('.task-text');
    if (taskSpan.classList.contains('completed')) {
        taskSpan.classList.remove('completed');
    }
    else {
        taskSpan.classList.add('completed');
    }



}

//Update the task

let activeUpdateInput = null;

function updateTask(task) {
    //Enabling the Update Input Element
    parentLi = task.parentElement.parentElement;
    parentDiv = parentLi.querySelector('.task-left');
    updateInput = parentDiv.querySelector('.update-input');
    updateSpan = parentDiv.querySelector('.task-text');

    //If any input is already active, we blur it first,saving it.
    if (activeUpdateInput && activeUpdateInput !== updateInput) {
        activeUpdateInput.blur(); 
    }

    updateInput.classList.remove('hide');
    updateInput.value = updateSpan.innerText;
    updateSpan.classList.add('hide');
    updateInput.focus();

    //Update global variable
    activeUpdateInput = updateInput;


    //Save changes after Enter pressed(blur event triggered)
    updateInput.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            updateInput.blur();
        }
    });

    //Blur listener
    updateInput.onblur = function() {
        saveUpdatedTask(updateInput, updateSpan);
        activeUpdateInput = null;
    };


}

//Changes saved in span element
function saveUpdatedTask(updateInput, updateSpan) {
    let updatedText = updateInput.value;
    updateSpan.innerText = updatedText;
    updateInput.classList.add('hide');
    updateSpan.classList.remove('hide');
}