document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  fetchIndex()
  likeCount()
  addComment()



  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})

 // Page Data Render Functions:  //

function fetchIndex() {
  return fetch('https://randopic.herokuapp.com/images/4673')
         .then(resp => resp.json())
         .then(img => renderImg(img))
}

function renderImg(img) {
  const image = document.getElementById('image')
  const h4 = document.getElementById('name')
  const span = document.getElementById('likes')
  const button = document.getElementById('like_button')
  button.dataset.id = `${img.id}`
  image.src = `${img.url}`
  image.id = `${img.id}`
  h4.innerText = `${img.name}`
  span.innerText = `${img.like_count}`
}

// Like Button functionality, front+backend:

function likeCount() {
  const button = document.getElementById('like_button')
  button.addEventListener('click', function(e) {
    const span = document.getElementById('likes')
    span.innerText++
    likeCountFetch(e.target.dataset.id)
  })
}

function likeCountFetch(imageId) {
  return fetch('https://randopic.herokuapp.com/likes', {
    method: 'POST', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "image_id": `${imageId}`
    }),
  })
}

// Comment functions:

function commentFetch(data) {
  return fetch('https://randopic.herokuapp.com/comments', {
  method: 'POST', 
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
  })
  .then((response) => response.json())
.then((data) => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});
}


function addComment() {
  const form = document.getElementById('comment_form')
  form.addEventListener('submit', function(e) {
    e.preventDefault()
    const input = document.getElementById('comment_input')
    const ul = document.getElementById('comments')
    const li = document.createElement('li')
    li.innerText = input.value 
    ul.appendChild(li)
    form.reset() 
    const button = document.getElementById('like_button')
    let imageId = button.dataset.id
    let content = li.innerText 
    const data = { "image_id": imageId,
                  "content": content } 
    commentFetch(data)
  })
}

