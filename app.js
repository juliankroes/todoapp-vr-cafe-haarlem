const LOCAL_STORAGE_TODO_KEY = "todolist"


// initialise HTML elements

const textInput = document.getElementById("textInput")
const textInputRequired = document.getElementById("textInputRequired")

const categoryDropdown = document.getElementById("categoryDropdown")
const categoryDropdownRequired = document.getElementById("categoryDropdownRequired")

const submitButton = document.getElementById("submitTodo")
const filterDropdown = document.getElementById("filterDropdown")


function setup() {
    console.log('setup')
    if (!localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_TODO_KEY, "[]")
    }
    loadTodos()
    resetForm()
}
setup()

// adding events to elements

filterDropdown.addEventListener('change', loadTodos)

submitButton.addEventListener("click", () => {
    if (textInput.value.length <= 0) {
        console.log("NO TODO ENTERED")
        textInputRequired.style.display = "block"
        return
    }

    if (categoryDropdown.value === "") {
        console.log("NO CATEGORY ENTERED")
        categoryDropdownRequired.style.display = "block"
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
    resetForm()
})

function resetForm() {
    textInputRequired.style.display = "none"
    textInput.value = ""

    categoryDropdownRequired.style.display = "none"
    categoryDropdown.value = ""
}



// basic CRUD operations

// CREATE
function localSave(todo) {
    const todoListString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY)
    let todoList = JSON.parse(todoListString)
    todoList.push(todo)
    const updatedTodoListString = JSON.stringify(todoList)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoListString)
}


// READ

function getAllTodos() {
    const todoListString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY)
    const todoList = JSON.parse(todoListString)
    const filteredTodoList = filterTodos(todoList, filterDropdown.value)
    return filteredTodoList
}

// UPDATE

function completeTodoById(id) {
    let todoList = getAllTodos()
    
    // Linear search, since there will realistically never be more than 20 todos
    for (todo of todoList) {
        if (todo.id === id && !todo.completed) {
            todo.completed = true;
        } else if (todo.id === id && todo.completed) {
            deleteTodoById(id) // deletes the todo if it was already deleted
            return
        }
    }
    const updatedTodoListString = JSON.stringify(todoList)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoListString)
    loadTodos()
}

// DELETE

function deleteTodoById(id) {
    let todoList = getAllTodos()
    todoList = todoList.filter(todo => todo.id !== id)
    const updatedTodoListString = JSON.stringify(todoList)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoListString)
    loadTodos()
}


// helper functions

function filterTodos(todoList, filterMethod) {
    switch (filterMethod) {
        case 'category':
            return todoList.sort((a, b) => a.category.localeCompare(b.category))
        case 'oldest':
            return todoList.sort((a, b) => a.creationTime - b.creationTime)
        case 'newest':
            return todoList.sort((a, b) => b.creationTime - a.creationTime)
        default:
            return todoList
    }
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

