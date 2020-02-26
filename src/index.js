document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4675 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => display(image))

  //display
  function display(image){
    const imageSlot = document.getElementById('image')
    imageSlot.src = `${image.url}`
    const imageTitle = document.getElementById('name')
    imageTitle.innerText = image.name
    const likesSlot = document.getElementsByTagName('span')[0]
    likesSlot.innerText = `Likes: ${image.like_count}`
    const commentsList = document.getElementById('comments')
        //extra
        commentsList.innerHTML = '<h4>Comments:</h4>'
    image.comments.forEach(comment => addComment(comment))

  //comments
  function addComment(comment){
  let newComment = document.createElement('li')
  newComment.innerText = comment.content
      //bonus part 1
      let deleteButton = document.createElement('button')
      deleteButton.className = 'btn-danger'
      deleteButton.innerText = 'Delete'
      deleteButton.dataset.id = comment.id
      deleteButton.addEventListener('click', (e) => deleteComment(e))
      newComment.append(deleteButton)
  commentsList.append(newComment)
  }

  //like
  const likeButton = document.getElementById('like_button')
      //extra
      likeButton.className = 'btn-success'
  likeButton.addEventListener('click', () => {
    let numLikes = parseInt(likesSlot.innerText.split(" ")[1])
    numLikes++
    likesSlot.innerText = `Likes: ${numLikes}`
    fetch(likeURL,{
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({'image_id':image.id})
    })
  })

  //comment form
  const form = document.getElementById('comment_form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    let newComment = {"content": form.comment.value}
    addComment(newComment)
    fetch(commentsURL,{
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "application/json"
      },
      body: JSON.stringify({'image_id':image.id, 'content':form.comment.value})
    })
  })
  }
  //bonus part 2
  function deleteComment(e){
    fetch(`${commentsURL}/${e.target.dataset.id}`,{method: 'Delete'})
    .then(e.target.parentNode.remove())
  }
})
