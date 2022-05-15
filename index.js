const conainter = document.querySelector('.main');
//GET REQUEST
const renderArticles = async () => {
  let uri = 'http://localhost:3000/articles';
  const res = await fetch(uri);
  const articles = await res.json();
  
  let template ='';
  articles.forEach(article => {
    template += `
    <article>
    <h1>${article.title}</h1>
    <ul class="info">
        <li class="info_item">${article.tag}</li>
        <li class="info_item">Added by <span class="info_mark">${article.author}</span></li>
        <li class="info_item">${article.date}</li>
    </ul>
    <div class="action_buttons">
        <button type="button" class="action_btn edit_btn">Edit</button>
        <button type="button" id="deleteBtn" class="action_btn">Delete</button>
    </div>
    <img src=${article.imgUrl} alt="Article image">
    <div class="article_content">
        <p>${article.summary}</p>
        <a href="/article-details.html?id=${article.id}">read more...</a>
    </div>
</article>
    `
  })

  conainter.innerHTML = template;

}

window.addEventListener('DOMContentLoaded', () => renderArticles());

//POST REQUEST
const form = document.querySelector('.modal-content');

const addArticle = async (e) => {
  e.preventDefault();

  const article = {
    title: form.title.value,
    tag: form.tag.value,
    author: form.author.value,
    date: form.date.value,
    imgUrl: form.imgUrl.value,
    content: form.content.value
  }

  await fetch('http:localhost:3000//articles', {
    method: 'POST',
    body: JSON.stringify(article),
    headers: {'Content-Type': 'application/json'}
});

    window.location.replace('/index.html');

}

form.addEventListener('submit', addArticle);

//DELETE REQUEST









// // Get the modal
// var modal = document.getElementById("myModal");

// // Get the button that opens the modal
// var editBtn = document.getElementsByClassName("edit_btn");
// // Get the <span> element that closes the modal
// var span = document.getElementsByClassName("close")[0];

// // When the user clicks on the button, open the modal
// editBtn[0].addEventListener('click', function() {
//   modal.style.display = "block";
// })


// editBtn[1].onclick = function() {
//   modal.style.display = "block";
// }


// editBtn[2].onclick = function() {
//   modal.style.display = "block";
// }

// editBtn[3].onclick = function() {
//   modal.style.display = "block";
// }

// // When the user clicks on <span> (x), close the modal
// span.onclick = function() {
//   modal.style.display = "none";
// }

// // When the user clicks anywhere outside of the modal, close it
// window.onclick = function(event) {
//   if (event.target == modal) {
//     modal.style.display = "none";
//   }
// }