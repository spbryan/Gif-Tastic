# Gif-Tastic
    Gif-tastic is a dynamic page that interacts with an API to display/play 10+ gifs based on user input

## URL:
https://spbryan.github.io/Gif-Tastic/

## How does it work?
    - This application makes a call to the Giphy API and displays 10 resulting gif images.
    - User can either use one of the pre-create buttons or can create one themselves by entering a topic in the text field and clicking "Create Button"
    - User can create and click as many topics as they like.  Each click results in a new array of 10 gifs appended to the previous one
    - User may select one or more "favorites" from the displayed gif.  This will result in the renderinf of a "display" and "clear" button for the resulting gifs
    - Clicking on the dispaly favorites result in the clearing of all gifs and the displaying of just those marked as favorite (the system makes fresh API calls using the id)
    - Selecting clear removes all gifs

## What is the goal of this project?
    To exercise new skills in jQuery, javaScript, css, bootstrap, and html, and ajax
