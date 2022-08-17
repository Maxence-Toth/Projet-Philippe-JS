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



let selectArticles = function() {
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
    
        });
        })
    }

selectArticles();
