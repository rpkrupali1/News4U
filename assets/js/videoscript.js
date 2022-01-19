
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
