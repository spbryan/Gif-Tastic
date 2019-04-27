/***********************************************
 * Project: Gif-Tastic
 * Developer: Sean Bryan
 * Date: 2019-04-27
 ***********************************************/

$(document).ready(function () {
    // Global Variables
    var topicList = ["Sharks", "Whales", "Dolphins"];
    var gifList = [];
    var apiKey = "TVW4zQpM1grLNNbe5y6eEuSnr6CD1Adm";

    /** This function renders Buttons for all entries in the 
     * funnyTopics array */
    function renderButtons() {
        $("#buttons-view").empty();
        for (var i = 0; i < topicList.length; i++) {
            var button = $("<button>");
            button.addClass("topic-button");
            button.attr("data-name", topicList[i]);
            button.text(topicList[i]);
            $("#buttons-view").append(button);
        }
    }

    /**
     * Makes the call to the Giphy API to retrieve gifs based on topic
     */
    function retrieveGifs() {
        var topic = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            topic + "&api_key=" + apiKey;

        $.ajax({
            // url: buildURL(topic,"20"),
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(response);
                populateGifList(response);
                displayGifs();
            });
    }

    function clearGifs() {
        $(".gif-display").empty();
    }

    // function buildURL(topic, limit) {
    //     var apiURL = "http://api.giphy.com/v1/gifs/search?q=";
    //     apiURL += topic;
    //     // apiURL += "&limit=" + limit;
    //     apiURL += "&api_key=" + apiKey;
    //     console.log(apiURL);
    // }

    /**
     * Grab 10 structures (or, if less than 10, the number returned) and
     * add them to the gif list
     * @param response 
     */
    function populateGifList(response) {
        var results = response.data;
        var indexSize = 10;
        if (results.length < 10) {
            indexSize = results.length - 1;
        }

        for(var i=0; i < indexSize; i++) {
            gifList.push(results[i]);
        }
    }

    function displayGifs() {
        for (var i = 0; i < gifList.length; i++) {
            // var gifDiv = $("<div>");
            var rating = gifList[i].rating;
            // var p = $("<p>").text("Rating: " + rating);
            var image = $("<img>");
            image.attr("src", gifList[i].images.fixed_height.url);
            // gifDiv.prepend(p);
            // gifDiv.prepend(image);
            $(".gif-display").prepend(image);
          }
    }

    /** On-Click for topic buttons */
    $(document).on("click", ".topic-button", retrieveGifs);

    /** On-Click for clear gif button */
    $(document).on("click", ".clear-button", clearGifs);

    renderButtons();

});