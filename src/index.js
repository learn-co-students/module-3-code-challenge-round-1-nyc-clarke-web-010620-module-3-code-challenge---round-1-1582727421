document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4675 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => display(image))

  function display(image){
    const imageSlot = document.getElementById('image')
    imageSlot.src = `${image.url}`
    const imageTitle = document.getElementById('name')
    imageTitle.innerText = image.name
    const likesSlot = document.getElementsByTagName('span')[0]
    likesSlot.innerText = `Likes: ${image.like_count}`
    const commentsList = document.getElementById('comments')
    commentsList.innerText = "Comments:"
    image.comments.forEach(comment => addComment(comment))

  function addComment(comment){
  let newComment = document.createElement('li')
  newComment.innerText = comment.content
  commentsList.append(newComment)
  }

  const likeButton = document.getElementById('like_button')
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
})
