document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4610 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`


  fetch(imageURL)
  .then((response) => {
    return response.json();
  })
  .then((body) => {
    body.array.forEach((image => {
      let imageCard = document.getElementById("image_card")
      let title = imageCard.querySelector("#name").innerText = "`${image.name}`"
      imageCard.append(title)
    };
  });
  

})//dom
