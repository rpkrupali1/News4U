var displayresultsEl = document.querySelector("#displayresult");
var headlinesKeyword = document.querySelector("#keyword");
var rightEl = document.querySelector(".right");
var topicInputEl = document.querySelector("#search");
var apiKey = "7db1ebc8ade84f368699836c6a49d189"

var resultsHeadlines = function(event) {
    event.preventDefault();

    var topic = topicInputEl.value.trim();

    if(topic) {
        getTopHeadlines(topic);

        displayresultsEl.textContent = "";
        topicInputEl.value = "";
    }

}

var getTopHeadlines = function() {

    var topHeadlinesUrl = "https://newsapi.org/v2/top-headlines?country=us&category=business&=" + apiKey;
    //var topHeadlinesUrl = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=" + apiKey;
    fetch(topHeadlinesUrl).then(function(response){
        if(response.ok){
            console.log(response);
            response.json().then(function(data){
                displayData(headlines, keyword);
            })
        }
    })
    .catch(function(error){
        alert("something went wrong: looks like news api is down");
    })
}

var displayData = function(headlines, keyword){
    if(headlines.length === 0) {
        displayresultsEl.textContent = "No news found.";
        return;
    }


headlinesKeyword.textContent = keyword;

// loop
for (var i = 0; i <headlines.length; i++) {
    var headlinesName = headlines[i];
    

    var headlinesEl = document.createElement("div");
    headlinesEl.classList = "list-item";

    var newsEl = document.createElement("span");
    newsEl.textContent = headlinesName;

    headlinesEl.appendChild(newsEl);



    displayresultsEl.appendChild(headlinesEl);
}

getTopHeadlines();

// document.addEventListener('DOMContentLoaded', function() {
//     var elems = document.querySelectorAll('select');
//     var instances = M.FormSelect.init(elems, options);
//   });
}

rightEl.addEventListener("search", resultsHeadlines);
