document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input-field");
    const addTask = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTask.addEventListener("click", addNewTask);

    // Add event listener for pressing "Enter" key
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addNewTask();
        }
    });

    function addNewTask() {
        const taskValue = inputField.value.trim();
        if (taskValue === "") return;

        const newTask = {
            id: Date.now(),
            text: taskValue,
        };

        tasks.push(newTask);
        saveTasksLocally();
        renderTask(newTask);
        inputField.value = "";
    }

    function saveTasksLocally() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTask(task) {
        const newElement = document.createElement("li");
        newElement.innerHTML = `
            ${task.text}
            <button class="delete-btn">Delete</button>
        `;
        taskList.appendChild(newElement);

        const deleteButton = newElement.querySelector(".delete-btn");
        deleteButton.addEventListener("click", function () {
            taskList.removeChild(newElement);
            tasks = tasks.filter((t) => t.id !== task.id);
            saveTasksLocally();
        });
    }
});
