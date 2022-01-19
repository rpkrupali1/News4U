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



document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
  });

document.addEventListener('DOMContentLoaded', function() {
    var sidenavEl = document.querySelectorAll('.sidenav');
    M.Sidenav.init(sidenavEl);
  });
