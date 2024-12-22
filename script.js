document.addEventListener("DOMContentLoaded", () => {
    const inputField = document.getElementById("input-field");
    const addTask = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task) => renderTask(task));

    addTask.addEventListener("click", function () {
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
    });

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
            // updating task array
            tasks = tasks.filter((t) => t.id !== task.id);
            //updating local storage so that deletion is permanent
            saveTasksLocally();
        });
    }
});
