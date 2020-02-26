document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4664 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  //get fetch image 
  fetch(imageURL)
  .then(resp => resp.json())
  .then(image => {
    addImage(image)
  })

})

 //add image to dom 
 function addImage(image) {
   console.log(image)
    const imageDiv = document.getElementById("image_card")

    const imageDivChildren = imageDiv.children
    let imageUrl = imageDivChildren[0]
    imageUrl.src = image.url 
    let imageTitle = imageDivChildren[1]
    imageTitle.innerText = image.name 
    let imageLikes = imageDiv.children[2].children[0]
    imageLikes.innerText = image.like_count
    let imageUl = document.getElementById("comments")
    image.comments.forEach(function(comment){
    let newLi = document.createElement("li")
    newLi.innerText = comment.content
    imageUl.append(newLi)
    })
  }

  //add likes on dom 
  const imageDiv = document.getElementById("image_card")
  imageDiv.addEventListener("click", function(event){
    event.preventDefault()
    if(event.target.id === "like_button"){
      let likesSpan = event.target.parentNode.children[2].children[0]
      likesSpan.innerText = parseInt(likesSpan.innerText) + 1
      
        //add likes to database ?????
      fetch(`https://randopic.herokuapp.com/likes`, {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          image_id: "4664"
        })
      })
    }
    //add comments to DOM 
    if(event.target.id === "submit-btn"){
      console.log(event.target.parentNode.children[0])
      let newComment = event.target.parentNode.children[0].value
      let imageUl = document.getElementById("comments")
      let newLi = document.createElement("li")

      // //add delete button to comments
      // const deleteButton = document.createElement("button")
      // deleteButton.id = "delete-btn"
      // deleteButton.innerText = "Delete"
      // newLi.append(deleteButton)
      
      newLi.innerText = newComment 
      imageUl.append(newLi)
      event.target.parentNode.reset()
      //add comments to database ???/
      fetch('https://randopic.herokuapp.com/comments', {
        method: "POST", 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify({
          image_id: 4664,
          content: newComment
        }) 
      })
    }

    if(event.target.id === "delete-btn"){
      console.log(event.target.parentNode)
    }

  })
