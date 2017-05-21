$(document).ready(function(){
    var buttonList = [];

      $("#submit").on("click", function(){
        var val = $("#search").val().trim()
        if(buttonList.indexOf(val) < 0){
          var newButton = $("<button>");
          newButton.addClass("button");
          newButton.attr("data-animal", val)
          newButton.append(val)
          $("#buttons").append(newButton)
          buttonList.push(val);
          console.log(buttonList)
        }
          
      })

       function renderResults() {
        $("#giphy").empty();
            var animal = $(this).attr("data-animal");
            var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
              animal + "&api_key=dc6zaTOxFJmzC&limit=10";
              console.log(this)

            $.ajax({
              url: queryURL,
              method: "GET"
            }).done(function(response) {

                var results = response.data;
                console.log(results)
                for (i=0; i < results.length; i++){
                  var gifDiv = $("<div class = 'item'>");
                  var rating = results[i].rating;
                  var p = $("<p>").text("rating:"+rating);
                  var animalImg = $("<img>")
                  animalImg.attr("src", results[i].images.fixed_height_small_still.url) 
                  animalImg.attr("data-still", results[i].images.fixed_height_small_still.url)
                  animalImg.attr("data-animate", results[i].images.fixed_height_small.url)
                  animalImg.attr("data-state", "still")     
                  gifDiv.prepend(p);
                  gifDiv.prepend(animalImg);
 

                    $("#giphy").prepend(gifDiv);

                };

            });
      };
function animationControl(){
    var img = $(this).children('img')
      var state = img.attr("data-state");

      if ( state === "still"){
      $(img).attr("src", $(img).attr("data-animate"))
      $(img).attr("data-state", "animate")
      }
      if ( state !== 'still'){
      $(img).attr("src", $(img).attr("data-still"))
      $(img).attr("data-state", "still")
      }
      console.log(state)
}

      $(document).on("click", ".item", animationControl);
      $(document).on("click", ".button", renderResults);

});


