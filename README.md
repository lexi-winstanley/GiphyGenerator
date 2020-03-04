# Giphy Generator
[View Live](https://lexi-winstanley.github.io/giphyGenerator/)

## Motivation 
Use the Giphy API to search for GIFs matching a certain search query. Allow users to use pre-defined buttons or create their own. Display results attractively. 

## Summary
Press the buttons to search for animal GIFs. You can add your own buttons to create custom searches. Each search will return 10 GIFs but you can press the 'Get More' button after the initial search to return additional GIFs in that category. You can expand or collapse the favorites section by pressing the arrow and you can press any 'Add to Favorites' button to add that GIF to the section. 

## Details
Logic was written to capture user text input to create new buttons that can then be clicked (click event listeners) to call the Giphy API with the search query. A response is received from the Giphy API and the JSON data is used to display the GIFs on the page. If the API call is not successful, an error is shown.  

## Role
Sole developer responsible for design, code and creation of custom graphics. Functionality requirements provided by UW Coding Bootcamp/Trilogy Education Services.

## Technologies
HTML
<br/>CSS
<br/>JavaScript
<br/>jQuery
<br/>Giphy API
