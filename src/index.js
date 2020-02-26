document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4674 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
  .then(resp => resp.json())
  .then (image => {
    let picture = document.getElementById('image')
    let name = document.getElementById('name')
    let likes = document.getElementById('likes')
    
    picture.src = image.url
    name.innerText = image.name
    likes.innerText = image['like_count']
    
    image.comments.forEach(addComment)
  })
  
  function addComment(comment){
    let ul = document.getElementById('comments')
    let li = document.createElement('li')
    li.id = comment.id

    li.innerHTML = `
    ${comment.content} <button class="delete"> Delete </delete>
    `

    ul.append(li)
  }

  document.addEventListener('click', event => {
    if (event.target.id === "like_button"){
      let likes = document.getElementById('likes')
      likes.innerText++

      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 4674
        })
      })
      .then(resp => resp.json)
      .then(like => console.log(like))
    }

    if (event.target.className === "delete"){
      fetch(commentsURL + `+${event.target.parentElement.id}`, {
        method: "DELETE",
      })
      .then(resp => resp.json)
      .then(event.target.parentNode.remove())
    }
  })

  document.addEventListener('submit', event =>{
    event.preventDefault()
    let comment = event.target.comment.value
  
    fetch(commentsURL, {
      method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_id: 4674,
          content: comment
        })
    })
    .then(resp => resp.json())
    .then(comment => addComment(comment))

    document.getElementById("comment_form").reset()
  })


})
