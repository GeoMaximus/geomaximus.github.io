//getting elemens
const body = document.getElementById('body');
const main = document.getElementById('main');

//getting buttons
const addBtn = document.getElementById('button_add');
const cancelBtn = document.getElementById('cancel');
const closeBtn = document.getElementById('close');
let saveBtn = document.getElementById('save');

//getting modal inputs
const inputTitle = document.getElementById('inputTitle');
const inputTag = document.getElementById('inputTag');
const inputAuthor = document.getElementById('inputAuthor');
const inputDate = document.getElementById('inputDate');
const inputImgUrl = document.getElementById('inputImgUrl');
const inputContent = document.getElementById('inputContent');

addBtn.addEventListener('click', openAddModal);
cancelBtn.addEventListener('click', closeModal);
closeBtn.addEventListener('click', closeModal);


//FETCH ARTICLES FROM SERVER
async function getArticlesFromServer() {
  const response = await fetch('http://localhost:3000/articles', {
    method: "GET",
    headers: {
      "Content-type": "application/json"
    }
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  await response.json().then((response) => {
    renderArticles(response);
  });
};

//POST article to server
async function addArticleToServer() {
  const article = {
    title: inputTitle.value,
    tag: inputTag.value,
    author: inputAuthor.value,
    date: inputDate.value,
    imgUrl: inputImgUrl.value,
    content: inputContent.value,
    summary: computeSummary(inputContent.value)
  }

  const response = await fetch('http://localhost:3000/articles', {
    method: "POST",
    headers: {
      "Content-type": "application/json"
    },
    body: JSON.stringify(article)
  });

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }

  await response.json().then(() => {
    getArticlesFromServer();
    resetForm();
    closeModal();
  });
}

//DELETE ARTICLE FROM SERVER
async function deleteArticleFromServer(id) {
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
    getArticlesFromServer();
  });
}

//UPDATE ARTICLE FROM SERVER
async function updateArticleToServer(id) {
  const article = {
    title: inputTitle.value,
    tag: inputTag.value,
    author: inputAuthor.value,
    date: inputDate.value,
    imgUrl: inputImgUrl.value,
    content: inputContent.value,
    summary: computeSummary(inputContent.value)
  }

  const response = await fetch('http://localhost:3000/articles/' + id, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(article)
  });
  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  await response.json().then(() => {
    getArticlesFromServer();
    resetForm();
    closeModal();
  });
}

function openAddModal() {
  clearSaveButtonEvents();
  saveBtn.addEventListener('click', function () {
    addArticleToServer()
  });

  body.className = 'show-modal';
}

function openEditModal(article) {
  inputTitle.value = article.title;
  inputTag.value = article.tag;
  inputAuthor.value = article.author;
  inputDate.value = article.date;
  inputImgUrl.value = article.imgUrl;
  inputContent.value = article.content;

  clearSaveButtonEvents();

  saveBtn.addEventListener('click', function () {
    updateArticleToServer(article.id);
  });

  body.className = 'show-modal';
}

function removeOldArticles() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
}

function createArticle(article) {
  //create article node
  const articleHTML = document.createElement('article');
  articleHTML.className = 'article-container';

  //create title
  const title = document.createElement('h1');
  title.textContent = article.title;

  //create ul element for info
  const ul = document.createElement('ul');
  ul.className = 'info';

  //create tag
  const liTag = document.createElement('li');
  liTag.className = 'info_item';
  liTag.textContent = article.tag;

  //create added by
  const liText = document.createElement('li');
  liText.className = 'info_item';
  liText.textContent = "Added by ";

  //create author
  const spanAuthor = document.createElement('span');
  spanAuthor.textContent = article.author;
  spanAuthor.className = 'info_mark';

  //create date
  const liDate = document.createElement('li');
  liDate.textContent = article.date;
  liDate.className = 'info_item';

  liText.appendChild(spanAuthor);
  ul.appendChild(liTag);
  ul.appendChild(liText);
  ul.appendChild(liDate);

  //div for buttons
  const btnDiv = document.createElement('div');
  btnDiv.className = 'action_buttons';


  //edit button
  const editBtn = document.createElement('button');
  editBtn.className = 'action_btn';
  editBtn.textContent = 'EDIT';
  editBtn.addEventListener('click', function () {
    openEditModal(article);
  });

  //delete button
  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'action_btn';
  deleteBtn.textContent = 'DELETE';
  deleteBtn.addEventListener('click', function () {
    deleteArticleFromServer(article.id);
  });

  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(deleteBtn);

  //add image
  const img = document.createElement('img');
  img.setAttribute('src', article.imgUrl);

  //add paragraph
  const contentDiv = document.createElement('div');
  contentDiv.className = 'content';
  const content = document.createElement('p');
  content.className = 'article-container';
  content.textContent = computeSummary(article.content);
  contentDiv.appendChild(content);

  articleHTML.appendChild(title);
  articleHTML.appendChild(ul);
  articleHTML.appendChild(btnDiv);
  articleHTML.appendChild(img);
  articleHTML.appendChild(contentDiv);

  return articleHTML;

}


function renderArticles(articles) {
  removeOldArticles();

  articles.forEach(article => {
    let articleNode = createArticle(article);
    main.appendChild(articleNode);
  })
}

function resetForm() {
  inputTitle.value = "";
  inputTag.value = "";
  inputAuthor.value = "";
  inputDate.value = "";
  inputImgUrl.value = "";
  inputContent.value = "";
}

function clearSaveButtonEvents() {
  let newUpdateButton = saveBtn.cloneNode(true);
  saveBtn.parentNode.replaceChild(newUpdateButton, saveBtn);
  saveBtn = document.getElementById('save');
}

function closeModal() {
  body.className = '';
}

function computeSummary(content) {
  return content.substring(1, 1000);
}


getArticlesFromServer();