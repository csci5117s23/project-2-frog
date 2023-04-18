const burger = document.querySelector('#burger')
const navbarMenu = document.querySelector('#nav-links')
console.log(burger)
burger.addEventListener('click', () => {
  navbarMenu.classList.toggle('is-active')
})