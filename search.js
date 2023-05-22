function getResults(){
    var query = document.getElementById("searchInput").value.trim();
    $.getJSON("https://www.omdbapi.com/?apikey=API_KEY_HERE&type=series&s="+query,function(data){
        var results = document.getElementById("resultSpace");
            while(results.firstChild){
                results.removeChild(results.firstChild);
            }
    
        var message = document.getElementById("messageParagraph");
        message.innerText = "";
        if(data.Response == "True"){
            for(i = 0; i < data.Search.length; i++){
                var show = data.Search[i];
                var result = document.createElement("button");
                result.className = "result move";
                result.innerText = show.Title;

                result.onclick = function (idk) {return function() {myFunc(idk)};}(show.imdbID);

                results.appendChild(result);

            }
            if(data.Search.length < data.totalResults){
                document.getElementById("messageParagraph").innerText = "+"+(data.totalResults-data.Search.length)+" more results."
            }
        }
        else{
            var message = document.getElementById("messageParagraph");
            if(data.Error === "Series not found!"){
                message.innerText = data.Error+"\nDid you finish typing?";
            }

        }
    });

}


function myFunc(title){
    document.getElementById("form").show.value = title;
    document.getElementById("form").submit();
}
