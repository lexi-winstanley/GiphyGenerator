let queryButtonText = ['dog', 'cat', 'fish', 'bird', 'moose'];

$('#createNew').on('click', function(event) {
    event.preventDefault();
    queryButtonText.push($('#newButton').val().trim());
    createButtons();
});

function createButtons() {
    $('#buttonHolder').html('');
    for (let i = 0; i < queryButtonText.length; i++) {
        let queryButton = $('<button>');
        queryButton.attr('class', 'button');
        queryButton.text(queryButtonText[i]);
        $('#buttonHolder').append(queryButton);
    }
}

createButtons();

$('.button').on('click', function(event) {
    event.preventDefault();
    let query = $(this).val().trim();
    let queryUrl =  'https://api.giphy.com/v1/gifs/search?q=' + query + '&api_key=xQqwDwfX3RpdlQRPcKDmsoVWja2bn34A&limit=10';

    $.ajax({url : queryUrl, method : 'GET'}).then(function(response) {
        let results = response.data;
        let newGifGroup = $('<div>');
        for (let j = 0; j < results.length; j++) {
            let gifHolder = $('<div>');
            let gifRating = $('<p>');
            gifRating.text(results[j].rating);
            let gifImage = $('<img>');
            gifImage.attr('src', results[j].images.fixed_height_still.url);
            gifImage.attr('alt', results[j].title);
            gifImage.attr('data-animate', results[j].images.fixed_height.url);
            gifImage.attr('data-state', 'still');
            gifHolder.append(gifImage);
            gifHolder.append(gifRating);
            newGifGroup.append(gifHolder);
        }
        $('#allGifsHolder').append(newGifGroup);
    });
});
