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
async function fetchArticles() {
  const res = await fetch('http://localhost:3000/articles');
  if (!res.ok) {
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
    updateArticleToServer(article);
  });


  const deleteBtn = document.createElement('button');
  editBtn.className = 'action_btn';
  editBtn.textContent = 'DELETE';
  deleteBtn.addEventListener('click', () => {
    deleteArticleFromServer(article);
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

