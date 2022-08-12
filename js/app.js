// Categoy List for Cloud Words

let selectCategories = function() {
    fetch("https://127.0.0.1:8000/api/categories", { method: "GET"})
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonResponse) {
        categories = document.querySelector("#categories");
        jsonResponse["hydra:member"].forEach(function(category) {
          categoryList = document.createElement("li")
          categoryList.innerHTML = `<a href="${category.name}" data-weight="${size}">${category.name}</a>`;

          var articleInCategory = category.articles.length;
          if(articleInCategory >= category.articles.length * (1/10) 
                                  && articleInCategory <= category.articles.length * (2/10)){
              var size = 1;
              
          } else if(articleInCategory >= category.articles.length * (3/10) 
                                       && articleInCategory <= category.articles.length * (5/10)){
              var size = 2;

          } else if(articleInCategory >= category.articles.length * (6/10) 
                                        && articleInCategory <= category.articles.length * (8/10)){
              var size = 3;

          } else if(articleInCategory >= category.articles.length * (9/10) 
                                      && articleInCategory <= category.articles.length * (1/10)){
            var size = 4;

          } else {
              var size = 0;
          }

        
          categories.appendChild(categoryList);
        });
        })
    }

selectCategories();


// Tag List for Cloud Words
let selectTags = function() {
    fetch("https://127.0.0.1:8000/api/tags", { method: "GET"})
    .then(function (response) {
        return response.json();
    })
    .then(function (jsonResponse) {
        tags = document.querySelector("#tags");
        jsonResponse["hydra:member"].forEach(function(tag) {
          tagList = document.createElement("li")
          tagList.innerHTML = `<a href="${tag.name}" data-weight="${size}">${tag.name}</a>`;

          var tagArticle = tag.articles.length;
          if(tagArticle >= tag.articles.length * (1/10) 
                                  && tagArticle <= tag.articles.length * (2/10)){
              var size = 1;
              
          } else if(tagArticle >= tag.articles.length * (3/10) 
                      && tagArticle <= tag.articles.length * (5/10)){
              var size = 2;

          } else if(tagArticle >= tag.articles.length * (6/10) 
                      && tagArticle <= tag.articles.length * (8/10)){
              var size = 3;

          } else if(tagArticle >= tag.articles.length * (9/10) 
                      && tagArticle <= tag.articles.length * (10/10)){
              var size = 4;

          } else {
              var size = 0;
          }

        
          tags.appendChild(tagList);
        });
        })
    }

selectTags();