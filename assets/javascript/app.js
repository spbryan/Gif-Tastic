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
                gifList = [];
                populateGifList(response);
                displayGifs();
            });
    }

    function clearGifs() {
        $(".gif-display").empty();
        $(".clear-button").hide();
    }

    function addToFavorites() {
        if ($(".favorites-list").is(":hidden")) {
            $(".favorites-list").show();
            // var labelElement = $("<h4>");
            // labelElement.attr("id", "favorite-header");
            // labelElement.text("Favorites List:");
            // $(".favorites-list").append(labelElement);
        }
        var id = $(this).attr("data-id");
        var title = $(this).attr("data-title");
        var option = $("<option>");
        option.attr("class", "favorite-item");
        option.attr("data-id", id);
        option.text(title);
        $(".favorites-list").append(option);
    }

    function getFavorite() {
        console.log(this);
        var id = $(this).attr("data-id");
        alert(id);
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

        for (var i = 0; i < indexSize; i++) {
            gifList.push(results[i]);
        }
    }

    /**
     * display retrieved gif images and details using a grid of four
     * images per column
     */
    function displayGifs() {
        $(".clear-button").show();
        var columnCtr = 1;
        var rowDiv = "";
        for (var i = 0; i < gifList.length; i++) {
            if (columnCtr === 1) {
                rowDiv = createRowElement();
            }
            var colDiv = createColumnElement(rowDiv);
            var cardDiv = createCardElement(colDiv);
            createImageElement(cardDiv, gifList[i].images.fixed_height.url);
            var cardBody = createCardBody(cardDiv);
            displayRating(cardBody, gifList[i].rating);
            createFavoritesButton(cardBody, gifList[i].id, gifList[i].title);

            ++columnCtr;
            if (columnCtr > 4) {
                columnCtr = 1;
            }
        }
    }

    /**
     * Display the rating returned from the API on the card body
     * @param cardBody 
     * @param rating 
     */
    function displayRating(cardBody, rating) {
        var ratingElement = $("<p>");
        ratingElement.addClass("card-text");
        ratingElement.text("Rated: " + rating);
        cardBody.append(ratingElement);
    }

    /**
     * Creates a button for a new topic
     */
    function createNewButton() {
        event.preventDefault();
        var topic = $("#input-topic").val().trim();
        topicList.push(topic);
        renderButtons();
        // Clear the textbox when done
        $("#input-topic").val("");
    }

    /**
     * Creates and returns a row element to house the return gifs
     */
    function createRowElement() {
        var rowDiv = $("<div>");
        rowDiv.addClass("row");
        $(".gif-display").append(rowDiv);
        return rowDiv;
    }

    /**
     * Creates, displays, and returns the column element that will 
     * house the gif details
     * @param rowDiv 
     */
    function createColumnElement(rowDiv) {
        var colDiv = $("<div>");
        colDiv.addClass("card-column");
        colDiv.addClass("col-sm-3");
        // colDiv.addClass("mr-3");
        rowDiv.append(colDiv);
        return colDiv;
    }

    /**
     * Creates, displays, and returns a card element that will serve 
     * as the wrapper for the gif image and details
     * @param colDiv 
     */
    function createCardElement(colDiv) {
        var cardDiv = $("<div>");
        cardDiv.addClass("card");
        cardDiv.addClass("mt-3");
        // cardDiv.addClass("mr-3");
        cardDiv.attr("style", "width: 15rem;");
        // cardDiv.attr("style", "width: 18rem;");
        colDiv.append(cardDiv);
        return cardDiv;
    }

    /**
     * Adds the gif from the passed url to the card element
     * @param cardDiv 
     * @param url 
     */
    function createImageElement(cardDiv, url) {
        var image = $("<img>");
        image.addClass("card-img-top");
        image.attr("src", url);
        image.attr("alt", "TBD");
        image.attr("style", "height: 70%;");
        cardDiv.append(image);
    }

    /**
     * Creates, displays, and returns a card body element that will
     * house the text detail for the gif
     * @param cardDiv 
     */
    function createCardBody(cardDiv) {
        var cardBody = $("<div>");
        cardBody.addClass("card-body");
        cardDiv.append(cardBody);
        return cardBody;
    }

    function createFavoritesButton(cardBody, id, title) {
        var button = $("<button>");
        button.addClass("favorite-button");
        button.attr("data-id", id);
        button.attr("data-title", title);
        button.text("Add to Favorites");
        $(cardBody).append(button);
    }

    /** On-Click for topic buttons */
    $(document).on("click", ".topic-button", retrieveGifs);

    /** On-Click for clear gif button */
    $(document).on("click", ".clear-button", clearGifs);

    /** On-Click for new topic button */
    $(document).on("click", ".new-button", createNewButton);

    /** On-Click for favorites button */
    $(document).on("click", ".favorite-button", addToFavorites);

    /** On-Change for favorites dropdown option */
    $(document).on("change", ".selectpicker", getFavorite);
    // $(".selectpicker").on("change", ".favorite-item", getFavorite);

    $(".favorites-list").hide();
    $(".clear-button").hide();
    renderButtons();
});