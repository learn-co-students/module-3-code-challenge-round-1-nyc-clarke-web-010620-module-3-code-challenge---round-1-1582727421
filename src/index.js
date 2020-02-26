let imageId = 4676
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
let imageCard = document.getElementById("image_card")
imageCard.dataset.id = imageId

let form = document.getElementById("comment_form")
form.dataset.id = imageId

document.addEventListener('DOMContentLoaded', () => {
fetch(imageURL)
.then(resp => resp.json())
.then(image => renderImages(image))

let likes = document.getElementById("likes")
likes.dataset.id = imageId
likes.innerText = 0
let button = document.getElementById("like_button")


button.addEventListener("click", function(event){

let imgId = imageId
likes.innerText++


let data = {
  image_id: imgId
}

fetch(`${likeURL}`, {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})

})//ends button

let form = document.getElementById("comment_form")
  form.dataset.id = imageId

document.addEventListener("submit", function(event){
  event.preventDefault()
  let imageId = 4676
  let input = document.getElementById("comment_input")
  let li = document.createElement("li")
 
  li.innerText = input.value
  form.append(li)

// let input = document.getElementById("comment_input")
let img = document.getElementById("image")
let imgId = img.dataset.id

let data = {
  image_id: imgId,
  content: input.value
}// ends data 

fetch(`${commentsURL}`, {
  method: "POST",
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})// ends fetch 
})// ends form 
}) // ends DOM
function renderImages(image){
    let img = document.getElementById("image")
    img.dataset.id = image.id
    img.src = image.url
    let title = document.getElementById("name")
    title.innerHTML = `
    <h1> ${image.name} </h1>
    `
}// ends function