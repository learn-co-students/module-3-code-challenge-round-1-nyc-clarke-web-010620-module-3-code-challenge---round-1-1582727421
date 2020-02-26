const imageDiv = document.getElementById("image_card")
const theImage = document.getElementById("image")
const commentForm = document.getElementById("comment_form")
const theComments = document.getElementById("comments")
const theLikes = document.getElementById("likes")
const likeButton = document.getElementById("like_button")
const submitButton = document.getElementById("submit-button")


document.addEventListener('DOMContentLoaded', () => {
  let imageId = 4680

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(resp=>resp.json())
  .then(image=>addImage(image))
  
  const addImage = image => {
    theImage.scr = `${image.url}`
    theImage.id = image.id
    imageDiv.children[1].innerText = image.name
    theLikes.innerText = image.like_count
    theComments.innerHTML = image.comments.map(addComments).join("")
    // console.log(image.comments)
  }
  
  const addComments = comment => {
    return `<li data-comment-id="${comment.image_id}">${comment.content} <button data-comment-id="${comment.id}" id="delete_button">x</button></li>`
  }
  // add an event listener for clicks that does likes and submit

  document.addEventListener("click", e =>{
    // console.log(e.target)
    if (e.target === likeButton) {
      const image = {image_id: (imageId)}
      fetch(`${likeURL}`,{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
      })
      theLikes.innerText++
    } else if (e.target === submitButton){
      let li = document.createElement("li")
      // const button = document.createElement("button")
      // button.id = "delete_button"
      // button.innerText = "x"
      // button.dataset.commentId = need to nest inside the fetch request.
      const response = commentForm.children[0].value
      li.innerText = response
      theComments.append(li)
      const image = {image_id: (imageId), content: response }
      fetch(commentsURL,{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(image)
      })
      commentForm.children[0].value = ""
    } else if (e.target.id === "delete_button") {
      const commentId = e.target.dataset.commentId
      e.target.parentNode.remove()
      fetch(`${commentsURL}/${commentId}`, {method: "DELETE"})
    }
  })

})


