const LOCAL_STORAGE_TODO_KEY = "todolist"

const textInput = document.getElementById("textInput")
const categoryDropdown = document.getElementById("categoryDropdown")
const submitButton = document.getElementById("submitTodo")

function setup() {
    console.log('setup')
    if (!localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_TODO_KEY, "[]")
    }
    loadTodos()
}
setup()

submitButton.addEventListener("click", () => {
    if (textInput.value.length <= 0) {
        console.log("NO TODO ENTERED")
        return
    }

    if (categoryDropdown.value === "") {
        console.log("NO CATEGORY ENTERED")
        return
    }

    todo = {
        id: crypto.randomUUID(),
        todoItem: textInput.value,
        category: categoryDropdown.value,
        creationTime: Date.now(),
        completed: false
    }

    localSave(todo)
    loadTodos()
})


function localSave(todo) {
    const todoArrayString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY)
    let todoArray = JSON.parse(todoArrayString)
    todoArray.push(todo)
    const updatedTodoArrayString = JSON.stringify(todoArray)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoArrayString)
}

function getAllTodos() {
    const todoArrayString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY)
    const todoArray = JSON.parse(todoArrayString)
    return todoArray
}

function deleteTodoById(id) {
    let todoList = getAllTodos()
    todoList = todoList.filter(todo => todo.id !== id)
    const updatedTodoArrayString = JSON.stringify(todoList)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoArrayString)
    loadTodos()
}

function completeTodoById(id) {
    let todoList = getAllTodos()
    
    // hier doen we gewoon een linear search omdat er realistisch gezien nooit meer dan 20 todo's zullen zijn 
    for (todo of todoList) {
        if (todo.id === id && !todo.completed) {
            todo.completed = true;
        } else if (todo.id === id && todo.completed) {
            deleteTodoById(id)
            return
        }

    }

    const updatedTodoArrayString = JSON.stringify(todoList)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoArrayString)
    loadTodos()
}


function loadTodos() {
    todoList = document.getElementById("todoList")
    todoList.innerHTML = ''
    for (let todo of getAllTodos()) {
        // create div with inline
        inlineItem = document.createElement('div')
        inlineItem.className = "inline-item"

        // create li, add to div
        todoItem = document.createElement('li')
        todoItem.innerText = todo.todoItem;
        todoItem.className = 'todo-item'
        if (todo.completed) {
            todoItem.className += ' completed'
        }
        todoItem.addEventListener('click', () => {completeTodoById(todo.id)})

        inlineItem.appendChild(todoItem)

        // create span, add to div
        categoryChip = document.createElement('span')
        categoryChip.innerText = todo.category;
        categoryChip.className = "chip"

        inlineItem.appendChild(categoryChip)

        // append both to todolist
        todoList.appendChild(inlineItem)

    }
}

