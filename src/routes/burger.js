const toggleButton = document.getElementsByClassName('toggle-button')[0]
const headerContents = document.getElementsByClassName('header-contents')[0]

toggleButton.addEventListener('click', () => {
    headerContents.classList.toggle('.active')
})