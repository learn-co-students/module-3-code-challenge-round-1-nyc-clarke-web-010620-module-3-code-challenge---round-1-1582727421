

document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4668

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`



  loadImage()



function loadImage(){
  return fetch(imageURL)
  .then(resp=>resp.json())
  .then(image=>renderImage(image))
}

function renderImage(image){
  let imageTitle = document.getElementById('name')
  imageTitle.innerHTML = `${image.name}`

  let likes = document.getElementById('likes')
  likes.innerText = `${image.like_count}`

  // do below for like button
  // likes.dataset.id = `${image.id}`


  let imageCard = document.getElementById('image-card')
  // imageCard.children[0].setAttribute
  // imageCard.dataset.id = `${image.id}`
  let setImage = document.createAttribute('IMG')
  // img.innerHTML = `<img src='${image.url}'>`
  setImage.setAttribute("src", `"${image.url}"`)
  imageCard.append(setImage)

  let comments = document.getElementById('comment-form')
  let ul = document.createElement('ul')
  
  image.comments.forEach(comment=>{
    `${comment.content}`
  })
  
  comments.append(ul)


  

  // let newImage = document.getElementById('image')
  // imageCard.innerHTML = `
  // <h1>${image.name}</h1>
  // <img src='${image.url}'>

  // `
  // imageCard.append(newImage)
}

// function addLikes(){

// }

document.addEventListener('click', function(e){
  if(e.target.id === 'like_button'){
    // let likeButton = document.getElementById('like_button')
    // likeButton.dataset.id = image.id
    num = e.target.parentElement.querySelector('') 
    num++
  }
 

})

////////
})