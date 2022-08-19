//AFFICHAGE DE TOUT LES ARTICLES 
let displayArticles = function() {
    fetch("https://127.0.0.1:8000/api/articles", { method: "GET"})
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonResponse) {
        articlesDiv = document.querySelector("#articles");

        jsonResponse["hydra:member"].forEach(function(article) {

          articleList = document.createElement("div")
          articleH2 = document.createElement("h2");
          articleBody = document.createElement("p");
          articlePublished_at = document.createElement("p");


          articleList.className = "divArticle";
          articleH2.innerHTML = article["title"]
          articleBody.innerHTML = article["body"]
          articlePublished_at.innerHTML = article["published_at"]

          
          articleList.appendChild(articleH2)
          articleList.appendChild(articleBody)
          articleList.appendChild(articlePublished_at)
          articlesDiv.appendChild(articleList)

          if (articlePublished_at.innerHTML == "undefined") {
            articlePublished_at.innerHTML = "Date non précisée"
          }

          updateButton = document.createElement("button")
          updateButton.innerHTML = "Modifier"
          titleInput = document.createElement("input")
          titleInput.value = article["title"]
          bodyInput = document.createElement("textarea")
          bodyInput.innerHTML = article["body"]
          bodyInput.className = "bodyInput"
          

          articlesDiv.appendChild(updateButton)
          articlesDiv.appendChild(titleInput)
          articlesDiv.appendChild(bodyInput)
          



          var updateArticle = function() {
              var requestParameters = {
                "title": titleInput.value,
                "body" : bodyInput.value
            }
            fetch("https://127.0.0.1:8000/api/articles" + "/" + article["id"], {
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(requestParameters)
                })
                // .then((response) => {
                //     if (response.status == 200) {
                //         infoZoneDiv.textContent = "Modification du titre effectuée";
                //         readTags();
                //     } else {
                //         infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la modification du titre";
                //     }
                // })
          
          }
          
          updateButton.addEventListener("click", updateArticle);

        });
        })
    }

displayArticles();

// Creation d'article - Partie a terminer 
var mainDiv = document.querySelector("#main");
var createButton = document.createElement("button");
createButton.innerText = "Créer un article"
mainDiv.appendChild(createButton);

createTitleInput = document.createElement("input")
createBodyInput = document.createElement("textarea")
mainDiv.appendChild(createTitleInput)
mainDiv.appendChild(createBodyInput)

var createArticle = function() {

    var requestParameters = {
        "title": createtitleInput.value,
        "body" : createbodyInput.value
        }
        
    fetch("https://127.0.0.1:8000/api/articles", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestParameters)
        })
        // .then((response) => {
        //     if (response.status == 201) {
        //         infoZoneDiv.textContent = "Création de l'article effectué";
            
        //     } else {
        //         infoZoneDiv.textContent = "⚠ Une erreur est survenue lors de la création de l'article";
        //     }
        // })
        createButton.addEventListener("click", createArticle);
}