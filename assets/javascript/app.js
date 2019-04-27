/***********************************************
 * Project: Gif-Tastic
 * Developer: Sean Bryan
 * Date: 2019-04-27
 ***********************************************/
// Global Variables
var funnyTopics = ["Dogs", "Cats", "Politics"];

/** This function renders Buttons for all entries in the 
 * funnyTopics array */
function renderButtons() {
    $("#buttons-view").empty();
    for (var i = 0; i < funnyTopics.length; i++) {
        var button = $("<button>");
        button.addClass("topic-button");
        button.attr("data-name", funnyTopics[i]);
        button.text(funnyTopics[i]);
        $("#buttons-view").append(button);
    }
}

function retrieveGifs() {
    var topic = $(this).attr("data-name");

    $.ajax({
        url: queryURL,
        method: "GET"
    })
        .then(function (response) {
            var results = response.data;
            console.log(response);
            // for (var i = 0; i < results.length; i++) {
            //     var gifDiv = $("<div>");

            //     var rating = results[i].rating;

            //     var p = $("<p>").text("Rating: " + rating);

            //     var personImage = $("<img>");
            //     personImage.attr("src", results[i].images.fixed_height.url);

            //     gifDiv.prepend(p);
            //     gifDiv.prepend(personImage);

            //     $("#gifs-appear-here").prepend(gifDiv);
            // }
        });
}

$(document).on("click", ".topic-button", retrieveGifs);

renderButtons();