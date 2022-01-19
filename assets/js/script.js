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
var keyword;
var searchlistEl = document.querySelector("li");
var resultsEl = document.querySelector("#search-history");

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
    displayresultsEl.classList.remove("row");
    filterListEl.style.display = "block";

    var keyword = searchInputEl.value;
    var searchlistEl = document.createElement("li");
    searchlistEl.className = "search-history";
    searchlistEl.textContent = keyword;
    resultsEl.appendChild(searchlistEl); 
     
    var keyword = searchInputEl.value.trim();
    var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=10";
    console.log(searchUrl);
    getNewsByKeyword(searchUrl);

localStorage.setItem("keyword",JSON.stringify(keyword));
}

// handle number of articles to be displayed by user input
var selectArticleHandler = function(event){
    event.preventDefault();
    displayresultsEl.classList.remove("row");
    var numOfArticles = event.target.value;
    clearContents();
    var searchUrl = "https://gnews.io/api/v4/search?q="+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=" + numOfArticles;
    console.log(searchUrl);
    getNewsByKeyword(searchUrl);
    
}

var displayYoutubeVideo = function(data) {
    for (i = 0; i < data.length; i++) {
        videoLink = data[i].snippet.thumbnails.high.url.slice(23, 34)
        console.log(videoLink)
    
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
    
        title.textContent = String(data[i].snippet.title);
        img.src = String(data[i].snippet.thumbnails.high.url);
        link.href = String('https://www.youtube.com/watch?v=' + videoLink)
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
    var youtubeApi = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+ keyword +'&channelId=UCYfdidRxbB8Qhf0Nx7ioOYw&maxResults=10&order=relevance&key=AIzaSyCh6tZ6cxDqLPn9WZxWPz4BatEjNWziSKg'
  
  fetch(youtubeApi).then(function(response){
    if (response.ok){
      response.json().then(function(data){
          
        displayYoutubeVideo(data.items)
      })
    }
  })
  }

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
