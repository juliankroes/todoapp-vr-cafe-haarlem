const LOCAL_STORAGE_KEY = "todolist"

const textInput = document.getElementById("textInput")
const categoryDropdown = document.getElementById("categoryDropdown")
const submitButton = document.getElementById("submitTodo")

function setup() {
    console.log('setup')
    if (!localStorage.getItem(LOCAL_STORAGE_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_KEY, "[]")
    }
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
        todoItem: textInput.value,
        category: categoryDropdown.value,
        creationTime: Date.now(),
        completed: false
    }

    localSave(todo)
})


function localSave(todo) {
    const todoArrayString = localStorage.getItem(LOCAL_STORAGE_KEY)
    let todoArray = JSON.parse(todoArrayString);
    todoArray.push(todo)
    const updatedTodoArrayString = JSON.stringify(todoArray)
    localStorage.setItem(LOCAL_STORAGE_KEY, updatedTodoArrayString)
}

function getAllTodos() {
    const todoArrayString = localStorage.getItem(LOCAL_STORAGE_KEY)
    const todoArray = JSON.parse(todoArrayString);
    return todoArray
}
