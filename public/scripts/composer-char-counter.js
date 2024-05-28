$(document).ready(function() {
  $('.new-tweet textarea').on('input', function() {
    // Calculate the number of characters left
    let textLength = $(this).val().length;
    let charactersLeft = 140 - textLength;
    
    // Update the counter in the HTML
    let counterElement = $(this).siblings('div').find('.counter');
    counterElement.text(charactersLeft);
    
    // Change the counter color and prevent further input if limit is reached
    if (charactersLeft < 0) {
      counterElement.css('color', 'red');
    } else {
      counterElement.css('color', '');
    }
  });
});
