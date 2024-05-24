$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    // Calculate the number of characters left
    var textLength = $(this).val().length;
    var charactersLeft = 140 - textLength;

    console.log('Characters left:', charactersLeft);
  });
});