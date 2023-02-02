// selecteurs
const todoinput = document.querySelector(".Todo-input")
const todobutton = document.querySelector(".todo-button")
const todolist = document.querySelector(".todo-list")
const filterOption = document.querySelector(".filter-todo")
// ecouteurs
document.addEventListener("DOMContentLoaded", getTodos);
todobutton.addEventListener("click", addtodo)
todolist.addEventListener("click", deleteCheck)
filterOption.addEventListener("input", filtertodo)
// function
function addtodo(event){
    event.preventDefault();
    console.log("Hello World");
    //TodoDiv
    const TodoDiv = document.createElement("div");
    TodoDiv.classList.add("todo");
    //créer le li
    const newtodo = document.createElement("li")
    newtodo.innerText = todoinput.value;
    newtodo.classList.add("todo-item");
    TodoDiv.appendChild(newtodo);
    //Ajouter la todo au localstorage
    saveLocalTodos(todoinput.value);
    // Button Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    TodoDiv.appendChild(completedButton);
    //Button supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("complete-trash");
    TodoDiv.appendChild(trashButton);
    //Ajouter notre TODO à notre TODO-LIST
    todolist.appendChild(TodoDiv);
    todoinput.value = "";
}
function deleteCheck(e){
    const item = e.target;
    //Delete TODO
    if (item.classList[0] == "complete-trash") {
        const todo = item.parentElement;
        todo.classList.add("fall")
        removeLocalTodos(todo)
        todo.addEventListener("transitionnend", function(){
            todo.remove();
        });
    }
    //Check Mark
    if (item.classList[0] == "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}
function filtertodo(e){
    const todos = todolist.childNodes;
    todos.forEach(function(todo){
        switch(e.target.value){
            case"all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }
                else{
                    todo.style.display = "none"
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")){
                    todo.style.display = "flex"
                }
                else{
                    todo.style.display = "none"
                }
                break;
        }
    });
}
function saveLocalTodos(todo){
    //checker s'il y'a des items éxistants
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos))
}
function getTodos(){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    todos.forEach(function(todo){
    //TodoDiv
    const TodoDiv = document.createElement("div");
    TodoDiv.classList.add("todo");
    //créer le li
    const newtodo = document.createElement("li")
    newtodo.innerText = todoinput.value;
    newtodo.classList.add("todo-item");
    TodoDiv.appendChild(newtodo);
    // Button Check
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class= "fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    TodoDiv.appendChild(completedButton);
    //Button supprimer
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class= "fas fa-trash"></i>';
    trashButton.classList.add("complete-trash");
    TodoDiv.appendChild(trashButton);
    //Ajouter notre TODO à notre TODO-LIST
    todolist.appendChild(TodoDiv);
    })
}
function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem("todos") === null){
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"))
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexof(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}
