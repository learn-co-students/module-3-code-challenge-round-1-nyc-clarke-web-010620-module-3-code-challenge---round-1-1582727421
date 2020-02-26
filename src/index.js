let imageId = 4667; //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`;
const likeURL = `https://randopic.herokuapp.com/likes/`;
const commentsURL = `https://randopic.herokuapp.com/comments/`;

document.addEventListener('DOMContentLoaded', () => {
  // console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetch(imageURL).then(resp=> resp.json()).then(
    image => {
      loadcontent(image);
  });

  document.addEventListener("click",e => {
    switch(true){
      case(e.target.id === "like_button"):
        addLike();
        break;
      case(e.target.id === "unlike_button"):
        unLike();
        break;
      case(e.target.id === "delete_button"):
          e.preventDefault();
          let id = e.target.parentNode.dataset.id;
          deleteComment(id);
          e.target.parentNode.remove();
        break;
      case(e.target.type === "submit"):
        e.preventDefault();
        createComment();
        e.target.parentNode.children[0].value = "";
        break;
    };
    
  })//end of click listener

})  //end of DOMContentLoaded listener




//helper functions below:


function loadcontent(imageJSON){
  let img = document.querySelector("img");
  img.src = imageJSON.url;

  let title = document.getElementById("name");
  title.innerText = imageJSON.name;

  let likes = document.getElementById("likes");
  likes.innerText = "Likes: " + imageJSON.like_count;

  let comments = imageJSON.comments;
  let ul = document.getElementById("comments");
  for (i=0; i < comments.length; i++){
    loadComments(comments[i], ul);
  };

}


function loadComments(comment, tag){
  let li = document.createElement("li");
  li.innerText = comment.content ;
  li.dataset.id = comment.id;
  button = createButton();
  li.append(button);
  tag.append(li);
}
 
 function addLike(){
  let likes = document.getElementById("likes");
  let num = parseInt(likes.innerText.split(" ")[1])
  num++;
  likes.innerText = "Likes: " + num;

  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: imageId})
  })
}

function unLike(){
  let likes = document.getElementById("likes");
  let num = parseInt(likes.innerText.split(" ")[1])
  num--;
  likes.innerText = "Likes: " + num;

  fetch(likeURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({image_id: imageId})
  })
}
 
 function createComment(){
  let commentbox = document.getElementById("comment_input");
  let words = commentbox.value;

  fetch(commentsURL, {
    method: "POST",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      image_id: imageId,
      content: words
    })
  }).then(resp => resp.json()).then(comment =>{
    let ul = document.getElementById("comments");
    loadComments(comment, ul);
  })

}

function createButton(){
  let button = document.createElement("button");
  button.id = "delete_button";
  button.innerText ="Delete";
  return button;
}

function deleteComment(id) {
  fetch(`${commentsURL}/${id}`, {
    method: "DELETE"});
}