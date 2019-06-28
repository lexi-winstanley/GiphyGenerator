let queryButtonText = ['dog', 'cat', 'fish', 'bird', 'moose', 'hamster', 'aardvark', 'elephant', 'wolf', 'polar bear'];
let offset = 0;
let storedQuery;

let onFavoriteClick = function(displayTitle, title, imageStill, imageAnimate, rating) {
    return function() {
        $('#emptyMessage').attr('class', 'displayNone');
        let newFavorite = $('<div>');
        newFavorite.attr('class', 'favoriteGif');

        let favTitle = $('<h2>');
        favTitle.attr('class', 'sentenceCase');
        favTitle.text(displayTitle);

        let favImage = $('<img>');
        favImage.attr('class', 'gifFav');
        favImage.attr('src', imageStill);
        favImage.attr('alt', title);
        favImage.attr('data-still', imageStill);
        favImage.attr('data-animate', imageAnimate);
        favImage.attr('data-state', 'still');
        favImage.on('click', onGifClick);

        let favRating = $('<p>');
        favRating.html('Rating: <span class="uppercase">' + rating + '</span>');

        newFavorite.append(favTitle);
        newFavorite.append(favImage);
        newFavorite.append(favRating);
        $('#favoritesHolder').append(newFavorite);
    }
};

let addMoreGifs = function() {
    offset = offset + 10;
    let moreQueryUrl =  'https://api.giphy.com/v1/gifs/search?q=' + storedQuery + '&api_key=xQqwDwfX3RpdlQRPcKDmsoVWja2bn34A&limit=10&offset=' + offset;
    console.log('stored ' + moreQueryUrl);
    getData(moreQueryUrl);
};



let onButtonClick = function(event) {
    event.preventDefault();
    let query = $(this).text();
    storedQuery = $(this).text();
    console.log(storedQuery);
    let queryUrl =  'https://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=xQqwDwfX3RpdlQRPcKDmsoVWja2bn34A&limit=10';
    getData(queryUrl);
    addMoreButton();
};


let onGifClick = function() {
    let state = $(this).attr('data-state');
    console.log(state);
    console.log('click');
    if (state === 'still') {
        console.log('still');
        $(this).attr('data-state', 'animate');
        $(this).attr('src', $(this).attr('data-animate'));
    } else {
        console.log('animate');
        $(this).attr('data-state', 'still');
        $(this).attr('src', $(this).attr('data-still'));
    }
};

function createButtons() {
    $('#buttonHolder').html('');
    for (let i = 0; i < queryButtonText.length; i++) {
        let queryButton = $('<button>');
        queryButton.attr('class', 'button');
        queryButton.text(queryButtonText[i]);
        queryButton.on('click', onButtonClick);
        $('#buttonHolder').append(queryButton);
    }
    $('#newButton').val('');
}

function addMoreButton() {
    $('#addMoreHolder').html('');
    let addMoreButton = $('<button>');
    addMoreButton.attr('id', 'addMoreButton');
    addMoreButton.html('Get More <span class="sentenceCase">' + storedQuery + '</span> GIFs');
    addMoreButton.on('click', addMoreGifs);
    $('#addMoreHolder').append(addMoreButton);
    offset = 0;
}
 function getData(dataUrl) {
     $.ajax({url : dataUrl, method : 'GET', error: function() {
             let newGifGroup = $('<div>');
             newGifGroup.attr('class', 'gifGroup');
             let errorMessage = $('<div>');
             errorMessage.attr('class', 'fullWidth');
             errorMessage.text('Something went wrong with that API call. Try again with a different button.');
             newGifGroup.append(errorMessage);
             $('#resultGifs').prepend(newGifGroup);
         }}).then(function(response) {
         let results = response.data;
         console.log(results);
         let newGifGroup = $('<div>');
         newGifGroup.attr('class', 'gifGroup');
         for (let j = 0; j < results.length; j++) {
             let gifHolder = $('<div>');
             gifHolder.attr('class', 'gifHolder');
             let gifRating = $('<p>');
             gifRating.html('Rating: <span class="uppercase">' + results[j].rating + '</span>');

             let gifTitle = $('<h2>');
             gifTitle.attr('class', 'sentenceCase');
             let title = results[j].title;
             let numTitleChar = title.length;
             let displayTitle;
             if (title.charAt(title.length -1) === 'F' && title.charAt(title.length - 2) === 'I' && title.charAt(title.length - 3) === 'G') {
                 displayTitle = title.substr(0, numTitleChar - 3);
             } else {
                 displayTitle = title;
             }
             gifTitle.text(displayTitle);

             let gifImage = $('<img>');
             gifImage.attr('class', 'gif');
             gifImage.attr('src', results[j].images.fixed_height_still.url);
             gifImage.attr('alt', results[j].title);
             gifImage.attr('data-still', results[j].images.fixed_height_still.url);
             gifImage.attr('data-animate', results[j].images.fixed_height.url);
             gifImage.attr('data-state', 'still');
             gifImage.on('click', onGifClick);

             let gifFavorite = $('<button>');
             gifFavorite.attr('class', 'addFavorite');
             gifFavorite.text('Add to Favorites');
             gifFavorite.on('click', onFavoriteClick(displayTitle, title, results[j].images.fixed_height_still.url, results[j].images.fixed_height.url, results[j].rating));

             let bottomText = $('<div>');
             bottomText.attr('class', 'bottomText');
             bottomText.append(gifRating);
             bottomText.append(gifFavorite);

             gifHolder.append(gifTitle);
             gifHolder.append(gifImage);
             gifHolder.append(bottomText);

             newGifGroup.append(gifHolder);
         }

         $('#resultGifs').prepend(newGifGroup);
     });
 }

$('#createNew').on('click', function(event) {
    event.preventDefault();
    queryButtonText.push($('#newButton').val().trim());
    console.log(queryButtonText);
    createButtons();
});

$('#favLabel').on('click', function(event) {
    event.preventDefault();
    if ($(this).attr('data-toggle') === 'closed') {
        $('#favoritesHolder').attr('class', 'display');
        $('#favToggle').attr('src', 'assets/images/collapseFavs.svg');
        $('#favToggle').attr('alt', 'collapse section arrow');
        $(this).attr('data-toggle', 'open');
    } else {
        $('#favoritesHolder').attr('class', 'displayNone');
        $('#favToggle').attr('src', 'assets/images/expandFavs.svg');
        $('#favToggle').attr('alt', 'expand section arrow');
        $(this).attr('data-toggle', 'closed');
    }

});

createButtons();
