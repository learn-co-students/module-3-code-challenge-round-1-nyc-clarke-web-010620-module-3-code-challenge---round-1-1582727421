document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4681 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let img = fetch(imageURL)
            .then(resp => resp.json())
            .then(displayImg); 

  const imgObj = document.getElementById("image");
  const imgName = document.getElementById("name");
  const imgLikes = document.getElementById("likes");
  const commentUl = document.getElementById("comments")
  // console.log(imgSrc)

  function displayImg(resp) {
    imgObj.src = resp.url;  //change src to new url
    imgObj.dataset.id = resp.id; //change id to image id

    imgName.innerText = resp.name; //change inner text to the title of picture
    imgLikes.innerText = resp.like_count; //change like count to match

    addComments(resp.comments); //create a function to add comments
  }

  function addComments(comments){
    comments.forEach(function(comment) {
      let entry = document.createElement("li");
     
      if (comment.content) {
      entry.innerText = `${comment.content}`; 
      }
      else {
        entry.innerText = comment
      }

      commentUl.append(entry);
   })
  }

  const likeButton = document.getElementById("like_button"); //find the button, so we can add listener to it
  
  likeButton.addEventListener("click", event => {
    imgLikes.innerText++ // optimistically change the likes
    postLikes() //create a function to change database

  })

  //this function posts the likes to the survey
  function postLikes() {
    fetch(likeURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId})
  })
  .then(resp => resp.json())
  .then(console.log("posted likes"))
  }
  
  const commentForm = document.getElementById("comment_form").elements //find the form
  commentForm[1].type = "button" //change it to a button

 
  commentForm[1].addEventListener("click", event => {
    console.log("click works")
    let commentContent = commentForm[0].value; //obtain the text
    
    addComments([commentContent]); // needed to modify function to accept single comment
    postComment(commentContent); //create function to post comment
  })

  //this function posts the likes to the survey
  function postComment(commentContent) {
    fetch(commentsURL, {
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: imageId,
        content: commentContent})
  })
  .then(resp => resp.json())
  .then(console.log("posted comments"))
  }

})
