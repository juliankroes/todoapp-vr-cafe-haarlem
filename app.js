const LOCAL_STORAGE_TODO_KEY = "todolist"

const textInput = document.getElementById("textInput")
const textInputRequired = document.getElementById("textInputRequired")

const categoryDropdown = document.getElementById("categoryDropdown")
const categoryDropdownRequired = document.getElementById("categoryDropdownRequired")

const submitButton = document.getElementById("submitTodo")
const filterDropdown = document.getElementById("filterDropdown")

function resetForm() {
    textInputRequired.style.display = "none"
    textInput.value.value = ""

    categoryDropdownRequired.style.display = "none"
    categoryDropdown.value = ""
}
function setup() {
    console.log('setup')
    if (!localStorage.getItem(LOCAL_STORAGE_TODO_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_TODO_KEY, "[]")
    }
    loadTodos()
    resetForm()
}
setup()

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


function localSave(todo) {
    const todoArrayString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY)
    let todoArray = JSON.parse(todoArrayString)
    todoArray.push(todo)
    const updatedTodoArrayString = JSON.stringify(todoArray)
    localStorage.setItem(LOCAL_STORAGE_TODO_KEY, updatedTodoArrayString)
}

function getAllTodos() {
    const todoListString = localStorage.getItem(LOCAL_STORAGE_TODO_KEY)
    const todoList = JSON.parse(todoListString)
    const filteredTodoList = filterTodos(todoList, filterDropdown.value)
    return filteredTodoList
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

function filterTodos(todoList, filterMethod) {
    console.log(filterMethod)
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

