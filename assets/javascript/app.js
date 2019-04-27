/***********************************************
 * Project: Gif-Tastic
 * Developer: Sean Bryan
 * Date: 2019-04-27
 ***********************************************/

$(document).ready(function () {
    // Global Variables
    var topicList = ["Sharks", "Whales", "Dolphins"];
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
                var results = response.data;
                console.log(response);
            });
    }

    // function buildURL(topic, limit) {
    //     var apiURL = "http://api.giphy.com/v1/gifs/search?q=";
    //     apiURL += topic;
    //     // apiURL += "&limit=" + limit;
    //     apiURL += "&api_key=" + apiKey;
    //     console.log(apiURL);
    // }

    $(document).on("click", ".topic-button", retrieveGifs);

    renderButtons();

});