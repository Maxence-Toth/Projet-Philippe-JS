// console.log("hello world");

// let articleDisplay = document.querySelector("#Articledisplay")

// let articles = `https://127.0.0.1:8000/api/articles`

// let tags = `https://127.0.0.1:8000/api/tags`

// let api = `https://127.0.0.1:8000`

// function fetchApi(){
//     fetch(articles,
//         { method: "GET" })
//         .then(function(response) { 
//         return response.json() })
//         .then((responseJSON) => {
//             responseJSON["hydra:member"].forEach(article => {
//                 //on créer une div
//                 displayArticle = document.createElement("div")
//                 // la div précédement crée aura pour ID l'id de l'article
//                 displayArticle.id = "article" + article["id"]
//                 //on créer les H2 qui vont etre les futurs catégories
//                 displayArticleTitle = document.createElement("h2");
//                 // dans cette div on va venir écrire le titre de l'article
//                 displayArticleTitle.innerHTML = article["title"]
//                 //on vient recréer une div qui va contenir le body des articles
//                 displayArticleBody = document.createElement("div")
//                 // on écrit les 100 premiers caractère du body dans la div qu'on vient de créer
//                 displayArticleBody.innerHTML = article["body"].substr(0,100)
//                 // on créer la div qui va contenir les tags
//                 displayArticleTag = document.createElement("div")
//                 // on rajoute la div qui contient le titre dans le main
//                 displayArticle.appendChild(displayArticleTitle)
//                 // on rajoute la div qui contient le body à la div qui contient le titre
//                 displayArticle.appendChild(displayArticleBody)
//                 // on rajoute la div article dans la div présent dans le HTML
//                 articleDisplay.appendChild(displayArticle)

//                 modifierButton = document.createElement("button")
//                 modifierButton.innerHTML = "Modifier"
//                 displayArticle.appendChild(modifierButton)
//                 supprimerButton = document.createElement("button")
//                 supprimerButton.onclick = deleteArticle
//                 supprimerButton.innerHTML = "Supprimer"
//                 displayArticle.appendChild(supprimerButton)

//                 function deleteArticle() {
//                     let yesOrNo = confirm(" Voulez vous supprimer cet Article ? (Y/N) ")
//                         if (yesOrNo) {
//                             fetch(articles +"/"+ article["id"] ,
//                                 { method: "DELETE"})
//                                 .then((response) => {
//                                     if(response.status == 204) {
//                                         alert("L'article est bien supprimé")
//                                     }
//                                     else {
//                                         alert("Une erreur est survenue lors de la suppréssion")
//                                     }
//                                 })
//                             } 
//                             else {
//                             }
//                 }
//                 article.tags.forEach(function(tag){
//                     fetch(tags,
//                         {method: "GET"})
//                         .then(function(responseTag){
//                             return responseTag.json() })
//                             .then((responseTagJSON) => {
//                                 selectTag = document.createElement("select")
//                                 selectTag.value = tag["id"]
//                                     responseTagJSON["hydra:member"].forEach(tag => {
//                                     displayTag = document.createElement("option")
//                                     displayTag.innerHTML = tag["name"]
//                                     displayTag.value = tag["id"]
//                                     displayTag.id = "option-" + article["id"]
//                                     selectTag.appendChild(displayTag)
//                                 })
//                                 displayArticle.appendChild(selectTag)
//                                 document.querySelector("#article" + article["id"]).appendChild(selectTag)
//                         })
//                         // fixer le bug sur le nombre de select qui ressort 
//                 })
//             })
//         })
// }

// fetchApi()


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