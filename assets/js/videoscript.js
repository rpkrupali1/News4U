var displayresultsEl = document.querySelector("#displayresult");
var headlinesKeyword = document.querySelector("#keyword");
var rightEl = document.querySelector(".right");
var topicInputEl = document.querySelector("#search");
var apiKey = "AIzaSyCh6tZ6cxDqLPn9WZxWPz4BatEjNWziSKg";
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");
var displayresultSubtitleEl = document.querySelector("#displayresult-subtitle");
var filterListEl = document.querySelector("#filter-list");
var selectNumOfArticlesEl = document.querySelector("#select-numofarticles");
var keyword;
var numberOfArticles = 10;
var checkboxEls = document.querySelectorAll("input[type=checkbox]");
var searchHistoryEls = document.querySelector("#search-history");

//get top 10 headlines
var getTopHeadlines = function() {
    var topHeadlinesUrl = "https://gnews.io/api/v4/top-headlines?token=" + apiKey + "&lang=en&country=us&max=10";
    fetch(topHeadlinesUrl).then(function(response){
        if(response.ok){         
                response.json().then(function(data){
                displayresultSubtitleEl.textContent = "Top 10 US Headlines:";
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

//get news based on url
var getNewsByKeyword = function(url){
    //var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=10";
    fetch(url).then(function(response){
        if(response.ok){       
            saveKeywords(keyword) ;     
            response.json().then(function(data){
                console.log(data);
                displayresultSubtitleEl.textContent = "Top 10 news for " + keyword + " in US";
                displayData(data);
                loadHistory();
            })
        }
        else
            alert("APi does not work");
    })
    .catch(function(error){
        alert("something went wrong: looks like news api is down");
    })
}

// display srticles in main screens based on given data
var displayData = function(data){    
    var articles = data.articles;
    for (let i = 0; i < articles.length; i++) {
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

        var imageEl = document.createElement("img");
        imageEl.src = articles[i].image;
        imageEl.classList = "col s4";        

        parentArticleEl.appendChild(containerEl);
        parentArticleEl.appendChild(imageEl);

        displayresultsEl.appendChild(parentArticleEl);
    }
}

//save data in local storage
var saveKeywords = function(keyword){
    var newsSearchHistory = JSON.parse(window.localStorage.getItem("keywords")) || [];
    var newKeyword = true;
    if(newsSearchHistory){
        for (let i = 0; i < newsSearchHistory.length; i++) {
            if(newsSearchHistory[i]===keyword){
                newKeyword = false;
                break;
            }           
        }
    }
    if(newKeyword){
        newsSearchHistory.push(keyword);
        localStorage.setItem("keywords",JSON.stringify(newsSearchHistory));
    }
}

// load data from local storage to search history
var loadHistory = function(){
    searchHistoryEls.textContent = "";
    searchHistoryEls.textContent = "News Search History";
    var newsSearchHistory = JSON.parse(window.localStorage.getItem("keywords"));
    if(newsSearchHistory){
        for (let i = 0; i < newsSearchHistory.length; i++) {
            var searchHistoryEl  = document.createElement("button");
            searchHistoryEl.textContent = newsSearchHistory[i];
            searchHistoryEl.id = newsSearchHistory[i];
            searchHistoryEl.classList = "text-capitalize col s12 searchHistory";
            searchHistoryEls.appendChild(searchHistoryEl);
        }
    }
}

var clearContents = function(){
    //clear news display
    displayresultsEl.textContent = "";
}

// Handle display articles based on users keyword
var searchFormHandler = function(event){
    event.preventDefault();
    clearContents();
    filterListEl.style.display = "block";
    keyword = searchInputEl.value.trim();
    var searchUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+ keyword +'&channelId=UCYfdidRxbB8Qhf0Nx7ioOYw&maxResults=10&order=relevance&key=' + apiKey;
    getNewsByKeyword(searchUrl);
}

// handle number of articles to be displayed by user input
var selectArticleHandler = function(event){
    event.preventDefault();
    numberOfArticles = event.target.value;
    clearContents();
    var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles;
    getNewsByKeyword(searchUrl);
}

//handle articles displayed based on checkbox value
var checkboxHandler = function(event){
    event.preventDefault();
    clearContents();
    var includeInTitle = document.querySelector("#title-input").checked;
    var includeInDescription = document.querySelector("#description-input").checked ;
    var url;
    if(includeInTitle && includeInDescription)
        url = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles + "&in=title,description";
    else if(includeInTitle && !includeInDescription)
        url = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles + "&in=title";
    else if(includeInDescription && !includeInTitle)
        url = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles + "&in=description";
    else
        url = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles;
    console.log(url);
    getNewsByKeyword(url);
}

var buttonClickHandler = function(event){
    clearContents();
    keyword = event.target.getAttribute("id");
    if(keyword){
        var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles;
        console.log(searchUrl);
        getNewsByKeyword(searchUrl);
    }
}

// Get top 10 headlines for US in english as soon as page is loaded
getTopHeadlines();
loadHistory();

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });

document.addEventListener('DOMContentLoaded', function() {
    var sidenavEl = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavEl);
  });

searchFormEl.addEventListener("submit",searchFormHandler);
selectNumOfArticlesEl.addEventListener("change", selectArticleHandler);
for (let i = 0; i < checkboxEls.length; i++) {
    checkboxEls[i].addEventListener("change",checkboxHandler);    
}
searchHistoryEls.addEventListener("click", buttonClickHandler);