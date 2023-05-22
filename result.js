const show = new URLSearchParams(window.location.search).get("show");

console.log(show);
$.getJSON("https://www.omdbapi.com/?i="+show+"&apikey=API_KEY_HERE",function(data){
    const season = Math.floor(Math.random()*data.totalSeasons)+1;
    const showTitle = data.Title;
    const poster = data.Poster;
    $.getJSON("https://www.omdbapi.com/?i="+show+"&apikey=API_KEY_HERE&Season="+season,function(data){
        const episodes = data.Episodes;
        const episode = Math.floor(Math.random()*episodes.length);
        const episodeID = episodes[episode].imdbID;
        $.getJSON("https://www.omdbapi.com/?i="+episodeID+"&apikey=API_KEY_HERE",function(data){
            document.getElementById("poster").src = poster;
            document.getElementById("poster").alt = showTitle+" Poster";

            document.getElementById("showTitle").innerText = showTitle;
            document.getElementById("episodeTitle").innerText = data.Title;
            document.getElementById("season-episode").innerText = "Season "+data.Season+", Episode "+data.Episode;
            document.getElementById("plot").innerText = data.Plot;
            document.getElementById("refresh").focus();
        });
    });

});

$(document).keydown(
    function(e)
    {    
        if (e.keyCode == 39) {      
            $(".move:focus").next().focus();
   
        }
        if (e.keyCode == 37) {      
            $(".move:focus").prev().focus();
   
        }
    }
);

