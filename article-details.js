const id = new URLSearchParams(window.location.search).get('id');
const conainter = document.querySelector('.main');

const renderArticle = async () => {
    const res = await fetch('http://localhost:3000/articles/' + id);
    const article = await res.json();
    console.log(article);

    let template = `
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
        <p>${article.content}</p>
        <h3>${article.saying}</h3>
    </div>
</article>
      `
  
    conainter.innerHTML = template;
}

window.addEventListener('DOMContentLoaded', () => renderArticle());