var displayresultsEl = document.querySelector("#displayresult");
var headlinesKeyword = document.querySelector("#keyword");
var rightEl = document.querySelector(".right");
var topicInputEl = document.querySelector("#search");
var apiKeys = ["AIzaSyAXys1kMFJOPaa7WQ0ePBzFjDbH2N_rG-Q","AIzaSyCveLoP8L-hrOnox4JL8Pvl5XDO8efcgbo"];
var apiKey = "AIzaSyAXys1kMFJOPaa7WQ0ePBzFjDbH2N_rG-Q";
var searchFormEl = document.querySelector("#search-form");
var searchInputEl = document.querySelector("#search-input");
var filterListEl = document.querySelector("#filter-list");
var selectNumOfArticlesEl = document.querySelector("#select-numofarticles");
var keyword;
var maxResults = 10;
var searchHistoryEls = document.querySelector("#search-history");

//display you tube videos on screen
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
  var youtubeApi;
  if(!keyword)
    youtubeApi = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCYfdidRxbB8Qhf0Nx7ioOYw&regionCode=US&maxResults=' + maxResults + '&order=relevance&key=' + apiKey;
  else
    youtubeApi = 'https://youtube.googleapis.com/youtube/v3/search?part=snippet&q='+ keyword +'&channelId=UCYfdidRxbB8Qhf0Nx7ioOYw&maxResults=' + maxResults + '&order=relevance&key=' + apiKey;
  
  fetch(youtubeApi).then(function(response){
    if (response.ok){
      response.json().then(function(data){
        if(keyword)
            saveKeywords(); // When valid response comes then result will be saved in local storage
        displayYoutubeVideo(data.items);
        loadHistory();
      });
    }
    else {
        // open model when you get an error
        var modalHeadline = "YouTube Quota exceeded";
        var modalContent = "The request cannot be completed because you have exceeded your maximum Youtube Quota and your key is not valid any more.";
        var modals = document.querySelector('#modal1');
        var instances = M.Modal.init(modals);
        instances.open();
    }    
  })
  .catch(function(error){
    // open model when you get an error
    var modals = document.querySelector('#modal1');
    var instances = M.Modal.init(modals);
    instances.open();
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
    getYoutube(keyword);
}

// handle number of videos to be displayed by user input
var selectArticleHandler = function(event){
    event.preventDefault();
    maxResults = event.target.value;
    clearContents();    
    getYoutube(keyword);
}


var buttonClickHandler = function(event){
    clearContents();
    keyword = event.target.getAttribute("id");
    if(keyword){
        getYoutube(keyword);
    }
}

//Display top stories by default
getYoutube(keyword)
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
searchHistoryEls.addEventListener("click", buttonClickHandler);