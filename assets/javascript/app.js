/***********************************************
 * Project: Gif-Tastic
 * Developer: Sean Bryan
 * Date: 2019-04-27
 ***********************************************/

$(document).ready(function () {
    // Global Variables
    var topicList = ["Sharks", "Whales", "Dolphins", "Starfish", "Stingray", "Crab"];
    var gifList = [];
    var favoriteList = [];
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
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                // console.log(response);
                gifList = [];
                populateGifList(response);
                displayGifs(false);
            });
    }

    /**
     * Clears the current gif image display
     */
    function clearGifs() {
        $(".gif-display").empty();
        $(".clear-button").hide();
    }

    /**
     * Stops and Start the annimation of a selected gif
     */
    function startStopGif() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        }
    }

    /**
     * Add a selected gif to a list of favorites
     */
    function addToFavorites() {
        if ($(".show-favorite-button").is(":hidden")) {
            $(".show-favorite-button").show();
            $(".clear-favorite-button").show();
        }

        console.log(this);
        $(this).hide();

        var id = $(this).attr("data-id");
        var queryURL = "https://api.giphy.com/v1/gifs/" +
            id + "?api_key=" + apiKey;
        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                favoriteList.push(response.data);
            });
    }

    /**
     * Show gifs for any that are listed as a favorite
     */
    function showFavorites() {
        if (favoriteList.length > 0) {
            // console.log(favoriteList);
            $(".gif-display").empty();
            gifList = favoriteList;
            displayGifs(true);
        }
        else {
            $(".show-favorite-button").hide();
            $(".clear-favorite-button").hide();
        }
    }

    /**
     * Clear gifs from favorites
     */
    function clearFavorites() {
        // $(".gif-display").empty();
        clearGifs();
        $(".show-favorite-button").hide();
        $(".clear-favorite-button").hide();
        favoriteList = [];
    }

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
    function displayGifs(isFavorites) {
        $(".clear-button").show();
        var columnCtr = 1;
        var rowDiv = "";
        for (var i = 0; i < gifList.length; i++) {
            if (columnCtr === 1) {
                rowDiv = createRowElement();
            }
            var colDiv = createColumnElement(rowDiv);
            var cardDiv = createCardElement(colDiv);
            createImageElement(cardDiv,
                gifList[i].images.fixed_height.url,
                gifList[i].images.fixed_height_still.url);
            var cardBody = createCardBody(cardDiv);
            displayRating(cardBody, gifList[i].rating);
            if (!isFavorites) {
                createFavoritesButton(cardBody, gifList[i].id, gifList[i].title);
            }

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
        if (topic !== "") {
            topicList.push(topic);
            renderButtons();
            $("#input-topic").val("");
        }
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
        cardDiv.attr("style", "width: 15rem;");
        colDiv.append(cardDiv);
        return cardDiv;
    }

    /**
     * Adds the gif from the passed url to the card element
     * @param cardDiv 
     * @param url 
     * @param still_url
     */
    function createImageElement(cardDiv, url, still_url) {
        var image = $("<img>");
        image.addClass("card-img-top");
        image.attr("data-state", "animate");
        image.attr("src", url);
        image.attr("data-animate", url);
        image.attr("data-still", still_url)
        image.attr("alt", "gif image");
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

    /**
     * Create a favorites button that will add gif to favorites list
     * @param cardBody 
     * @param id 
     * @param title 
     */
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

    /** On-Click to start and stop the image */
    $(document).on("click", ".card-img-top", startStopGif);

    /** On-Click for show favorites button */
    $(document).on("click", ".show-favorite-button", showFavorites);

    /** On-Click for show favorites button */
    $(document).on("click", ".clear-favorite-button", clearFavorites);

    $(".show-favorite-button").hide();
    $(".clear-favorite-button").hide();
    $(".clear-button").hide();
    renderButtons();
});