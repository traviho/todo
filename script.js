const todoList = document.getElementById("todo-list");
const newTodoInput = document.getElementById("new-todo-input");
const newTodoForm = document.getElementById("new-todo-form");

// adds the todo text as a list item (with styling, radio button) into the DOM
function addTodo(text) {
    console.log("Adding todo...", text);
    if (text == "") {
        return;
    }
    const newListItem = document.createElement("li");

    const listItemContainer = document.createElement("div");
    listItemContainer.classList.add("list-item-container");

    const listItemButton = document.createElement("input");
    listItemButton.type = "radio";
    listItemButton.classList.add("list-item-button");
    listItemButton.onchange = e => {
        e.target.parentElement.parentElement.remove();
        // remove todo from local storage
        const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
        const index = savedTodos.indexOf("text");
        savedTodos.splice(index, 1);
        localStorage.setItem("todos", JSON.stringify(savedTodos));
    }
    listItemContainer.appendChild(listItemButton);

    const listItemText = document.createElement("span");
    listItemText.textContent = text;
    listItemText.classList.add("list-item-text");
    listItemContainer.appendChild(listItemText);

    newListItem.appendChild(listItemContainer);
    todoList.appendChild(newListItem);
}

window.onload = e => {
    // load todos from local storage into DOM
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    for (todoText of todos) {
        addTodo(todoText);
    }
}

newTodoForm.onsubmit = e => {
    e.preventDefault();
    const newTodoText = newTodoInput.value;
    // add new todo to todo list DOM
    addTodo(newTodoText);

    // save new todo to local storage
    const savedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    savedTodos.push(newTodoText)
    localStorage.setItem("todos", JSON.stringify(savedTodos));

    // reset form
    newTodoInput.value = "";
}

