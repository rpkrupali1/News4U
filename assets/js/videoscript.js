var keyword;

var selectNumOfArticlesEl = document.querySelector("#select-numofarticles");

var getYoutubeHeadlines = function() {
    var topYoutubeUrl = "" + apiKey + "&lang=en&country=us&max=10";
    fetch(topYoutubeUrl).then(function(response){
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
    //var searchUrl = ""+ keyword + "&token=" + apiKey + "&lang=en&country=us&max=10";
    fetch(url).then(function(response){
        if(response.ok){       
            response.json().then(function(data){
                console.log(data);
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


document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });

document.addEventListener('DOMContentLoaded', function() {
    var sidenavEl = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavEl);
  });
