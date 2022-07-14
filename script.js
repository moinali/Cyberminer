let query = document.querySelector('.query');
let searchBtn = document.querySelector('.searchBtn');
//var data = require('./bbc_news.json');
//import data from './bbcnews.json';
const userCardTemplate = document.querySelector("[data-user-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let users = []
searchInput.addEventListener("input", e => {
  const value = e.target.value.toLowerCase()
  users.forEach(user => {
    const isVisible =
      user.name.toLowerCase().includes(value) ||
      user.email.toLowerCase().includes(value)
    user.element.classList.toggle("hide", !isVisible)
  })
})

fetch("https://moinali.github.io/Cyberminer/index.json")
  .then(res => res.json())
  .then(data => {
    users = data.map(user => {
      const card = userCardTemplate.content.cloneNode(true).children[0]
      const header = card.querySelector("[data-header]")
      const body = card.querySelector("[data-body]")
      header.textContent = user.title
      body.textContent = user.link
      userCardContainer.append(card)
      return { name: user.title, email: user.link, element: card }
    })
  })

searchBtn.onclick = function (){
  console.log("Hello world!");
  let url ="https://www.google.com/search?q=" + query.value;
  window.open (url,'_self');
  win.focus();
}

