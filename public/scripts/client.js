const loadInitialTweets = function() {
  $.ajax({
    url: '/initial-tweets',  // Endpoint to fetch initial tweets
    method: 'GET',
    success: function(tweets) {
      renderTweets(tweets);
    },
    error: function(xhr, status, error) {
      console.error('Error fetching initial tweets:', error);
    }
  });
};

$(document).ready(function() {
  
  // Load new tweets on page load
  loadTweets();

  // Call loadInitialTweets function on page load
  loadInitialTweets();

  // Event listener for new tweet form submission
  $('form').on('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    const tweetText = $('#tweet-text').val().trim();
    
    // Validate the tweet before sending
    if (!isTweetValid(tweetText)) {
      return;
    }

    // Post the tweet using AJAX
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {
        // Clear the tweet container and load tweets again to display the newly posted tweet
        loadTweets();
        $('#tweet-text').val(''); // Clear the text area
        $('.counter').text(140); // Reset the character counter
      }
    });
  });
});

const createTweetElement = function(tweet) {
  let $tweet = `<article class="tweet">
      <header>
          <div class="user">
              <img src="${tweet.user.avatars}" alt="Profile Picture" class="profile-picture"> 
              <h4 class="name">${tweet.user.name}</h4>
          </div>
          <div>
              <h4 class="handle">${tweet.user.handle}</h4>
          </div>
      </header>
      <section class="tweet-text">
          <p>${escape(tweet.content.text)}</p>
      </section>
      <footer>
          <span class="timestamp">${timeago.format(tweet.created_at)}</span>
          <div class="actions">
              <span><i class="fa-solid fa-flag"></i></span>
              <span><i class="fa-solid fa-retweet"></i></span>
              <span><i class="fa-regular fa-heart"></i></span>
          </div>
      </footer>
  </article>`;
  return $tweet;
};

const renderTweets = function(tweets) {
  const $tweetContainer = $('.tweet-container');
  $tweetContainer.empty(); // Clear existing tweets

  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $tweetContainer.prepend($tweet);
  }
};

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const loadTweets = function() {
  $.ajax({
    url: '/tweets',  // Endpoint to fetch tweets
    method: 'GET',
    success: function(tweets) {
      renderTweets(tweets);
    },
    error: function(xhr, status, error) {
      console.error('Error fetching tweets:', error);
    }
  });
};

const displayErrorMessage = function(message) {
  const $errorContainer = $('.error-container');
  $errorContainer.text(message).slideDown();
};

const hideErrorMessage = function() {
  const $errorContainer = $('.error-container');
  $errorContainer.slideUp();
};

const isTweetValid = function(tweetText) {
  hideErrorMessage();

  if (!tweetText) {
    displayErrorMessage("Tweet cannot be empty!");
    return false;
  }
  if (tweetText.length > 140) {
    displayErrorMessage("Tweet cannot exceed 140 characters!");
    return false;
  }
  return true;
};
