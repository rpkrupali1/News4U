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
        var containerEl = document.createElement("div");
        var titleEl = document.createElement("h2");
        titleEl.textContent = articles[i].title;
        containerEl.appendChild(titleEl);

        var descriptionEl = document.createElement("h3");
        descriptionEl.textContent = articles[i].description;
        containerEl.appendChild(descriptionEl);

        var imageEl = document.createElement("img");
        imageEl.src = articles[i].image;
        containerEl.appendChild(imageEl);

        displayresultsEl.appendChild(containerEl)
        //console.log(articles[i].url);        
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

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems, options);
//   });


rightEl.addEventListener("search", resultsHeadlines);
