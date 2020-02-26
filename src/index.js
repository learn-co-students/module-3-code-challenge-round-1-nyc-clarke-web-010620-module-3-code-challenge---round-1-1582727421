document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4671 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const titleH4 = document.getElementById("name")
  const imageCard = document.getElementById("image_card").children[0]
  const liker = document.getElementById("like_button")
  const likeSpan = document.getElementById("likes")
  const commentForm = document.getElementById("comment_form")
  let ul = imageCard.parentNode.querySelector("ul")
  
  function fetchImg(imageURL) {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => {
      console.log(image)
      imageCard.setAttribute("src","`${img.url}`")
      titleH4.innerText = `${image.name}`
      liker.setAttribute("data-likes",`${image.like_count}`)
      likeSpan.innerText = `${image.like_count}`
      ul.innerHTML = `${loopComments(image).innerText}`
      
    })//.THENS
  }// FETCH IMAGE()

  fetchImg(imageURL)//FETCH IMAGE()

  function loopComments(image){
  let tempUl = document.createElement("ul") 
  console.log(image.comments)
  image.comments.forEach(comment => {
  tempUl.innerHTML += `<li>${comment.content}</li>`
  return tempUl
  })//FOR LOOP
  console.log(tempUl)
  }//LOOP COMMENTS



  document.addEventListener("click", event =>{
    switch(event.target.id){
      case "like_button":
      let newLikes = parseInt(event.target.dataset.likes++)
      likeSpan.innerText = newLikes 
      updateLikes(newLikes)
    }//SWITCH STATEMENT
  })//EVENT LISTENER

  function updateLikes(newLikes) {
    let data = {image_id: 4671}
    fetch(likeURL, {
    method: "PATCH",
    headers: {"content-type":"application/json",
    accepts: "application/json" },
    body: JSON.stringify(data)
    })//FETCH PATCH 
    // .then(resp => resp.json())
    // .then(resp => console.log(resp))
  }//UPDATE LIKES ()
  
  commentForm.addEventListener("submit",event => {
  event.preventDefault()
  ul.innerHTML += `
  <li>${commentForm.comment.value}</li>    
  `
  commentForm.reset()
  data = {image_id: 4671}
  fetch(commentsURL, {
    method: "PATCH",
    headers: {"content-type":"application/json",
    accepts: "application/json" },
    body: JSON.stringify(data)
    })//FETCH PATCH 

  })



})//DOM Content Loaded
