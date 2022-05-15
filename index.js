const main = document.getElementsByClassName('main')[0];
const modal = document.getElementById('modal');
const addBtn = document.getElementById('button_add');
const cancelBtn = document.getElementsByClassName('btn')[0];

//MODAL
addBtn.addEventListener('click', function (e) {
  e.preventDefault();
  modal.classList.remove("modal");
});

window.onclick = function(e) {
  e.preventDefault();
  if(e.target == modal) {
    modal.style.display = 'none';
  }
}

fetchArticles();

//CRUD AND FETCH
async function fetchArticles() {
  const res = await fetch('http://localhost:3000/articles');
  if(!res.ok) {
    const message = `An error occures: ${res.status}`;
    throw new Error(message);
  }

  const articlePromise = await res.json().then((res) => {
    renderArticles(res);
  });
}

function renderArticles(articles) {
  console.log(articles);
  articles.forEach(article => {
    createArticle(article);
  })
}

function createArticle(article) {
  const articleHTML = document.createElement('article');
  const title = document.createElement('h1');
  title.textContent = article.title;
  const ul = document.createElement('ul');
  const liTag = document.createElement('li');
  liTag.textContent = article.tag;
  const spanText = document.createElement('span');
  spanText.textContent = "Added by ";
  const liAuthor = document.createElement('li');
  liAuthor.textContent = article.author;
  const liDate = document.createElement('li');
  liDate.textContent = article.date;

  ul.appendChild(liTag);
  liAuthor.appendChild(spanText);
  ul.appendChild(liAuthor);
  ul.appendChild(liDate);

  const btnDiv = document.createElement('div');
  btnDiv.className = 'action_buttons';

  const editBtn = document.createElement('button');
  editBtn.className = 'action_btn';
  editBtn.textContent = 'EDIT';
  editBtn.addEventListener('click', () => {
    editArticle(article);
  });


  const deleteBtn = document.createElement('button');
  editBtn.className = 'action_btn';
  editBtn.textContent = 'DELETE';
deleteBtn.addEventListener('click', () => {
  deleteArticle(article);
});

btnDiv.appendChild(editBtn);
btnDiv.appendChild(deleteBtn);

const img = document.createElement('img');
img.src = article.imgUrl;

const content = document.createElement('p');
content.textContent = article.summary;

articleHTML.appendChild(title);
articleHTML.appendChild(ul);
articleHTML.appendChild(btnDiv);
articleHTML.appendChild(img);
articleHTML.appendChild(content);

main.appendChild(articleHTML);

}

