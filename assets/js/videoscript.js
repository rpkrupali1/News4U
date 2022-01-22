var displayresultsEl = document.querySelector("#displayresult");
var headlinesKeyword = document.querySelector("#keyword");
var rightEl = document.querySelector(".right");
var topicInputEl = document.querySelector("#search");
var apiKey = "AIzaSyAXys1kMFJOPaa7WQ0ePBzFjDbH2N_rG-Q";
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");
var displayresultSubtitleEl = document.querySelector("#displayresult-subtitle");
var filterListEl = document.querySelector("#filter-list");
var selectNumOfArticlesEl = document.querySelector("#select-numofarticles");
var keyword;
var numberOfArticles = 10;
var checkboxEls = document.querySelectorAll("input[type=checkbox]");
var searchHistoryEls = document.querySelector("#search-history");
var keyword = localStorage.getItem("globalKeyword")
var keyword = JSON.parse(keyword)

var displayYoutubeVideo = function(data) {
    for (i = 0; i < data.length; i++) {
        videoLink = data[i].snippet.thumbnails.high.url.slice(23, 34)
    
        var container = document.createElement('div')
        var column = document.createElement('div')
        var card = document.createElement('div')
        var cardImg = document.createElement('div')
        var img = document.createElement('img')
        var content = document.createElement('div')
        var link = document.createElement('a')
        var title = document.createElement('h6')
        
        displayresultsEl.classList.add("row");

        container.className = "col s6";
        column.className = "";
        card.className = "card";
        cardImg.className = "card-image"
        content.className = "card-action";

        title.style.height = "40px"
        title.style.color = "black";
    
        title.textContent = String(data[i].snippet.title);
        img.src = String(data[i].snippet.thumbnails.high.url);
        link.href = String('https://www.youtube.com/watch?v=' + videoLink) 
        link.setAttribute("target","_blank"); //Opens Youtube videos in new tab
        img.style.padding = '0px auto';
    
        link.appendChild(title);
        content.appendChild(link);
        card.appendChild(img);
        card.appendChild(content);
        column.appendChild(card);
        container.appendChild(column); 
        displayresultsEl.appendChild(container)
    }
}


/*This get youtube video based on their keyword*/
var getYoutube = function(keyword) {
    console.log(keyword)
    var youtubeApi = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+ keyword +'&channelId=UCYfdidRxbB8Qhf0Nx7ioOYw&maxResults=10&order=relevance&key=AIzaSyCh6tZ6cxDqLPn9WZxWPz4BatEjNWziSKg'
  
  fetch(youtubeApi).then(function(response){
    if (response.ok){
      response.json().then(function(data){
        if(keyword)
            saveKeywords(); // When valid response comes then result will be saved in local storage
        displayYoutubeVideo(data.items);
      });
    }
  });
}

//save data in local storage
var saveKeywords = function(){
    var newsSearchHistory = JSON.parse(window.localStorage.getItem("videokeywords")) || [];
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
        localStorage.setItem("videokeywords",JSON.stringify(newsSearchHistory));
    }
}

// load data from local storage to search history
var loadHistory = function(){
    searchHistoryEls.textContent = "";
    searchHistoryEls.textContent = "Video Search History";
    var newsSearchHistory = JSON.parse(window.localStorage.getItem("videokeywords"));
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
    //var searchUrl = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+'&channelId=UCYfdidRxbB8Qhf0Nx7ioOYw&maxResults=10&order=relevance&key=' + apiKey + keyword;
    //getNewsByKeyword(searchUrl);
    //getNewsByKeyword(keyword);
    getYoutube(keyword);
}

// handle number of articles to be displayed by user input
var selectArticleHandler = function(event){
    event.preventDefault();
    numberOfArticles = event.target.value;
    clearContents();
    var searchUrl = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles;
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
        url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles + "&in=title,description";
    else if(includeInTitle && !includeInDescription)
        url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q=="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles + "&in=title";
    else if(includeInDescription && !includeInTitle)
        url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles + "&in=description";
    else
        url = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numberOfArticles;
    console.log(url);
    getNewsByKeyword(url);
}

var buttonClickHandler = function(event){
    clearContents();
    keyword = event.target.getAttribute("id");
    if(keyword){
        getYoutube(searchUrl);
    }
}


loadHistory();
//Display top stories by default
getYoutube(keyword)

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




