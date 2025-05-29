const LOCAL_STORAGE_DISPLAY_MODE_KEY = "displaymode"
const displayToggle = document.getElementById("displayToggle")

displayToggle.addEventListener('click', toggleDisplayMode)

function setup() {
    console.log('setup')
    if (!localStorage.getItem(LOCAL_STORAGE_DISPLAY_MODE_KEY)) {
        localStorage.setItem(LOCAL_STORAGE_DISPLAY_MODE_KEY, "dark mode")
    }
}
setup()


function toggleDisplayMode() {
    console.log('click')
    currentMode = localStorage.getItem(LOCAL_STORAGE_DISPLAY_MODE_KEY)
    if (currentMode === "dark mode") {
        localStorage.setItem(LOCAL_STORAGE_DISPLAY_MODE_KEY, "light mode")
        setLightMode()
    } else {
        localStorage.setItem(LOCAL_STORAGE_DISPLAY_MODE_KEY, "dark mode")
        setDarkMode()
    }
    displayToggle.innerText = localStorage.getItem(LOCAL_STORAGE_DISPLAY_MODE_KEY);
}

function setDarkMode() {
  const root = document.documentElement.style
  root.setProperty('--background', '#1d1921')
  root.setProperty('--surface', '#63108e')
  root.setProperty('--primary', '#ffffff')
  root.setProperty('--call-to-action', '#35f2aa')
  root.setProperty('--alternative-call-to-action', '#fd3d81')
}


function setLightMode() {
  const root = document.documentElement.style
  root.setProperty('--background', '#ffffff')
  root.setProperty('--surface', '#108e30')
  root.setProperty('--primary', '#1d1921')
  root.setProperty('--call-to-action', '#ba49f2')
  root.setProperty('--alternative-call-to-action', '#108e30')
}
