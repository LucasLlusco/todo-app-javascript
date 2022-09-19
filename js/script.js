const inputTask = document.getElementById("inputTask");
const btnAddTask = document.getElementById("btnAddTask");
const containerTareas = document.getElementById("containerTareas");
const todoContainer = document.getElementById("todoContainer");
const filters = document.querySelectorAll(".filters");
const inputContainer = document.getElementById("inputContainer");
let todos = JSON.parse(localStorage.getItem("todo-list")) || []; 


btnAddTask.addEventListener("click", () => {
    let inputValue = inputTask.value.trim() 
    if(inputValue) { 
        const taskInfo = {
            name: inputValue,
            status: "active"
        }
    
        todos.push(taskInfo)
        localStorage.setItem("todo-list", JSON.stringify(todos));
        let filterActive = document.querySelector("button.btn-active");
        if(filterActive.id == "all") { 
            showTodoList("all") 
        } else {
            showTodoList("active") 
        }
        inputTask.value = "" 
    }
})

filters.forEach(btnClicked => {
    btnClicked.addEventListener("click", () => {
        document.querySelector("button.btn-active").classList.remove("btn-active");
        btnClicked.classList.add("btn-active"); 
        if (btnClicked.id == "completed") { 
            inputContainer.classList.add("hidden");
        } else { 
            inputContainer.classList.remove("hidden");
        }
        showTodoList(btnClicked.id);
    })
})

const showTodoList = (filter) => {
    todoContainer.innerHTML = "" 
    let btnDeleteAll = filter == "completed"? `<button onclick="deleteAll()" class="btn btn-red flex-end"><span><i class="fas fa-trash"></i></span> delete all</button>` : "";
    let li = ""; 
    todos.forEach(function (todo,id) { 
        let isCompleted = todo.status == "completed"? "checked" : "";
        
        let btnDeleteTask = filter == "completed"? `<button onclick="deleteTask(${id})" class="btn btn-delete"><span><i class="fas fa-trash"></i></span></button>` : "";
        if(filter == todo.status || filter == "all") { 
            li += ` 
            <li class="todo-item">
                <div class="todo"> 
                    <input type="checkbox" onclick="updateStatus(this)" ${isCompleted} id="${id}">
                    <label class="${isCompleted}">${todo.name}</label>
                </div>
                ${btnDeleteTask}
            </li>`
        }
    })
    todoContainer.innerHTML = li || `<span class="text-center">You don't have any task here</span>`;
    todoContainer.innerHTML += btnDeleteAll 
}
showTodoList("all")

const updateStatus = (selectedTask) => { 
    let taskName = selectedTask.parentElement.lastElementChild;
    if (selectedTask.checked) { 
        taskName.classList.add("checked")
        todos[selectedTask.id].status = "completed"; 
      
    } else { 
        taskName.classList.remove("checked")
        todos[selectedTask.id].status = "active";
    }
    localStorage.setItem("todo-list", JSON.stringify(todos));
}


const deleteTask = (deleteId) => { 
    todos.splice(deleteId, 1);     
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodoList("completed")
}
const deleteAll = () => { 
    const todosFiltered = todos.filter((todo) => todo.status !== "completed");
    todos = [...todosFiltered]; 
    localStorage.setItem("todo-list", JSON.stringify(todos)); 
    showTodoList("completed")
}
