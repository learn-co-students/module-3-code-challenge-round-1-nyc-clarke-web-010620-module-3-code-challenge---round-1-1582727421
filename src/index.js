let imageId = 4679
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`
const spanTag = document.getElementById('likes')
//√1 fetch image //√locate the html div id 'image-card'//√its child is img id 'image'//√h4 id 'name'//√span id likes  //the image url// the image name// the number of likes// any comments in an unordered list// the image has array of comments //√ 2 locate likes button// √increase it by patch fetch // √increase the number of likes // √span for likes // √button for like with id 'like_button'// √add event Linstner 
const showDiv = document.getElementById('image-card')
const commentsUl = document.getElementById('comments')
  document.addEventListener('DOMContentLoaded', () => {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(image => renderImage(image)) // end Get Fetch for Image 
  
  document.addEventListener('click', function(event) {
    if (event.target.id === 'like_button') {
      let imgID = event.target.parentNode.querySelector('img').dataset.id 
      const spanTag = document.getElementById('likes')
      let likes = parseInt(spanTag.innerText)
      let newLikes = likes + 1
      spanTag.innerText = newLikes

      data = {image_id: imgID}
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accepts': 'application/json'
        },
        body: JSON.stringify(data)
      })    
    }
    else if (event.target.type === 'submit') {
      event.preventDefault()
      const cForm = document.getElementById('comment_form')
      const commentsUl = document.getElementById('comments')
      let commentInput = document.getElementById('comment_input')
      let comment = cForm.comment.value 
      renderComment(comment)
      cForm.comment.value = ''
      

      const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
      data = {image_id: 4679, content: comment}
      // debugger
      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'accepts': 'application/json'
        },
        body: JSON.stringify(data)
      })    
    }
      
    

    

  })// end of click listner 

}) //End DOMContent


function renderImage(image) {
  const showDiv = document.getElementById('image-card')
  const imgTag = document.getElementById('image') //<img src="" id="image" data-id=""/> 
  const h4Tag = document.getElementById('name') //<h4 id="name">Title of image goes here</h4>
  const spanTag = document.getElementById('likes')
  imgTag.src = image.url 
  imgTag.dataset.id = image.id 
  h4Tag.innerText = image.name 
  spanTag.innerText = image.like_count

  
}// End function renderImage

function renderComment(comment) {
  const commentsUl = document.getElementById('comments')
  let li = document.createElement('li')
  li.innerText = comment 
  commentsUl.append(li)
}