//getting elemens
const body = document.getElementById('body');
const main = document.getElementById('main');

async function getArticleFromServer(id) {
    const response = await fetch(`http://localhost:3000/articles/` + id, {
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
        renderArticle(response);
    });
};

function renderArticle(id) {
    let articleNode = createArticle(article);
    main.appendChild(articleNode);

}

getArticleFromServer();