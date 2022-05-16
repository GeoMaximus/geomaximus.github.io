const body = document.getElementById('body');
const main = document.getElementById('main');
const modal = document.getElementById('modal');
const addBtn = document.getElementById('button_add');
const cancelBtn = document.getElementById('cancel');
const closeBtn = document.getElementById('close');

//MODAL
function openAddModal() {
  body.className = 'show-modal';
}
function closeModal() {
  body.className = '';
}
addBtn.addEventListener('click', openAddModal);
cancelBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);

fetchArticles();

//CRUD AND FETCH
 function fetchArticles() {
  fetch('http://localhost:3000/articles').then(function (res) {
    res.json().then(function (articles) {
      renderArticles(articles);
    });
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
  ul.className = 'info';
  const liTag = document.createElement('li');
  liTag.className = 'info_item';
  liTag.textContent = article.tag;
  const liText = document.createElement('li');
  liText.className = 'info_item';
  liText.textContent = "Added by ";
  const spanAuthor = document.createElement('span');
  spanAuthor.textContent = article.author;
  spanAuthor.className = 'info_mark';
  const liDate = document.createElement('li');
  liDate.textContent = article.date;
  liDate.className = 'info_item';

  liText.appendChild(spanAuthor);
  ul.appendChild(liTag);
  ul.appendChild(liText);
  ul.appendChild(liDate);

  const btnDiv = document.createElement('div');
  btnDiv.className = 'action_buttons';

  const editBtn = document.createElement('button');
  editBtn.className = 'action_btn';
  editBtn.textContent = 'EDIT';
  editBtn.addEventListener('click', () => {
    updateArticleToServer(article);
  });


  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action_btn';
  deleteBtn.textContent = 'DELETE';
  deleteBtn.addEventListener('click', () => {
    deleteArticleFromServer(article);
  });

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  const img = document.createElement('img');
  img.src = article.imgUrl;

  const content = document.createElement('p');
  content.className = 'article_container';
  content.textContent = article.summary;

  articleHTML.appendChild(title);
  articleHTML.appendChild(ul);
  articleHTML.appendChild(btnDiv);
  articleHTML.appendChild(img);
  articleHTML.appendChild(content);

  main.appendChild(articleHTML);

}

async function deleteArticleFromServer(id) {
  //check if it works, before it was article instead of id and article.id
  const response = await fetch('http://localhost:3000/articles/' + id, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    },
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  await response.json().then(() => {
    fetchArticles();
  });
}

async function updateArticleToServer(id) {

}

async function addArticleToServer() {

}

function resetForm() {

}

