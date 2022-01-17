var displayresultsEl = document.querySelector("#displayresult");
var headlinesKeyword = document.querySelector("#keyword");
var rightEl = document.querySelector(".right");
var topicInputEl = document.querySelector("#search");
var apiKey = "7f4103b7675c7b27aace6b600c18c3c4";
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");
var displayresultSubtitleEl = document.querySelector("#displayresult-subtitle");
var filterListEl = document.querySelector("#filter-list");
var selectNumOfArticlesEl = document.querySelector("#select-numofarticles");
var keyword = { 
    keyword: searchInputEl.value.trim()
};


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
            response.json().then(function(data){
                console.log(data);
                displayresultSubtitleEl.textContent = "Top 10 news for " + keyword + " in US";
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
    var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=10";
    console.log(searchUrl);
    getNewsByKeyword(searchUrl);
localStorage.setItem("keyword",JSON.stringify(keyword));
}




// handle number of articles to be displayed by user input
var selectArticleHandler = function(event){
    event.preventDefault();
    var numOfArticles = event.target.value;
    clearContents();
    var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numOfArticles;
    console.log(searchUrl);
    getNewsByKeyword(searchUrl);
}
var youtubeApi = function() {
fetch("https://youtube-v31.p.rapidapi.com/search?q=news&part=snippet%2Cid&regionCode=US&maxResults=50&order=date", {
	"method": "GET",
	"headers": {
		"x-rapidapi-host": "youtube-v31.p.rapidapi.com",
		"x-rapidapi-key": "bdbf0b8d16msha71b0d16f73c768p16e649jsnefa08120e0c5"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});
}
youtubeApi();

// Get top 10 headlines for US in english as soon as page is loaded
getTopHeadlines();

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
