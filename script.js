const inputField = document.getElementById("input-field");
const addTask = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

addTask.addEventListener("click", function () {
  if (inputField.value === "") return;

  const newElement = document.createElement("li");
  const newElementButton = document.createElement("button");

  newElement.textContent = inputField.value;
  newElementButton.textContent = "Delete";

  newElement.appendChild(newElementButton);
  taskList.appendChild(newElement);

  newElementButton.addEventListener("click", function () {
    taskList.removeChild(newElement);
  });

  inputField.value = "";
});
