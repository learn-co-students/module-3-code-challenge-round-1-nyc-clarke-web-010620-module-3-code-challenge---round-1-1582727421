//brought these to global scope 
//so I can use them in my helper functions
let imageId = 4670 
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

//likesSlot and commentsSlot used twice.
const likesSlot = document.getElementById("likes")
const commentsSlot = document.getElementById("comments")


document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  
  //get image and title and render
  //get any likes or comments and render
  fetch(imageURL)
    .then(response => response.json())
      .then(body => {
        renderImage(body)})

  
  //grab like button then update dom on click
  //then post database for number of likes
  const likeButton = document.getElementById("like_button")
  likeButton.addEventListener("click", increaseLikes)

  //create a new comment
  //post to database
  commentForm = document.getElementById("comment_form")
  commentForm.addEventListener("submit", createComment)


  commentsSlot.addEventListener("click", deleteComment)     

})

//renders image, likes and comments
function renderImage(body){
  const imageSlot = document.getElementById("image")  
  const titleSlot = document.getElementById("name")

  imageSlot.src = body.url
  titleSlot.innerText = body.name
  likesSlot.innerText = body.like_count

  body.comments.forEach(comment => {
    let newLi = document.createElement("li")
    newLi.innerText = comment.content
    newLi.dataset["id"] = comment.id

    let newButton = document.createElement("BUTTON")
    newButton.dataset["id"] = comment.id
    newButton.innerText = "Delete"
    
    newLi.append(newButton)
    commentsSlot.append(newLi)
  })

}

function increaseLikes(e){
  let currentLikes = parseInt(likesSlot.innerText)
  
  likesSlot.innerText = currentLikes + 1 

  fetch(likeURL, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId
    })
  })
}

function createComment(e){
  e.preventDefault()
  const inputBox = document.getElementById("comment_input")
  const comment = inputBox.value
  let newLi = document.createElement("li")
  newLi.innerText = comment
  

  fetch(commentsURL, {
    method: "post",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: comment
    })
  }).then(response => response.json())
    .then(body => {
      //once the comment is created it will attach the 
      //delete button with the proper comment id.
      let newButton = document.createElement("BUTTON")
      newButton.dataset["id"] = body.id
      newButton.innerText = "Delete"
      newLi.append(newButton)})


  commentsSlot.append(newLi)
  commentForm.reset()
}

function deleteComment(e){
    if (e.target.tagName === "BUTTON"){
        let thisCommentId = e.target.dataset.id
        
        fetch(`${commentsURL}/${thisCommentId}`,{
          method: "delete"
        }).then( e.target.parentNode.remove())
    }
}