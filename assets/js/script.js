var displayresultsEl = document.querySelector("#displayresult");
var headlinesKeyword = document.querySelector("#keyword");
var rightEl = document.querySelector(".right");
var topicInputEl = document.querySelector("#search");
var apiKey = "08c09a0a9d776ef2eba4f3713f19ff9e"

var getTopHeadlines = function() {

    var topHeadlinesUrl = "https://gnews.io/api/v4/top-headlines?token=" + apiKey + "&lang=en&country=us&max=10";
    fetch(topHeadlinesUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                displayData(data);
            })
        }
        else
            alert("APi does not work");
    })
    .catch(function(error){
        alert("something went wrong: looks like news api is down");
    })
}

var displayData = function(data){
    console.log(data);
    var articles = data.articles;
    for (let i = 0; i < 10; i++) {
        var parentArticleEl = document.createElement("div");
        parentArticleEl.classList = "row articleborder";

        var containerEl = document.createElement("div");
        containerEl.classList = "col s8 container";
        
        var titleEl = document.createElement("h4");
        titleEl.classList = "row title";
        titleLinkEl = document.createElement("a");
        titleLinkEl.href = articles[i].url;
        titleLinkEl.textContent = articles[i].title;
        titleLinkEl.setAttribute("target","_blank");
        titleEl.appendChild(titleLinkEl);
        containerEl.appendChild(titleEl);


        var descriptionEl = document.createElement("h6");
        descriptionEl.textContent = articles[i].description;
        descriptionEl.classList = "row subtitle";
        containerEl.appendChild(descriptionEl);

        var contentEl = document.createElement("p");
        contentEl.textContent = articles[i].content;
        contentEl.classList = "row";
        containerEl.appendChild(contentEl);

        //var imageDivEl = document.createElement("div");
        //imageDivEl.classList = "col s4";
        var imageEl = document.createElement("img");
        imageEl.src = articles[i].image;
        imageEl.classList = "col s4";
        //imageDivEl.appendChild(imageEl);
        

        parentArticleEl.appendChild(containerEl);
        parentArticleEl.appendChild(imageEl);

        displayresultsEl.appendChild(parentArticleEl);
    }
}
    

var resultsHeadlines = function(event) {
    event.preventDefault();

    var topic = topicInputEl.value.trim();

    if(topic) {
        getTopHeadlines(topic);

        displayresultsEl.textContent = "";
        topicInputEl.value = "";
    }
}

getTopHeadlines();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });

document.addEventListener('DOMContentLoaded', function() {
    var sidenavEl = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavEl);
  });

rightEl.addEventListener("search", resultsHeadlines);
