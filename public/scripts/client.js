/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const createTweetElement = function(tweet) {
  let $tweet = `<article>
    <header class="tweet">
      <img src=${tweet.user.avatars} >
        <div>
          <h4 class="name">${tweet.user.name}</h4>
          <h4 class="handle">${tweet.user.handle}</h4>
        </div>
    </header>
    <p>${escape(tweet.content.text)}</p>
    <footer>
      <p>${timeago.format(tweet["created_at"])}</p>
      <div>
      <i class="fa-solid fa-flag"></i>
      <i class="fa-solid fa-retweet"></i>
      <i class="fa-regular fa-heart"></i>
      </div>
    </footer>
  </article>`;
  return $tweet;
};

$(document).ready(function() {
  const createTweetElement = function(tweet) {
      let $tweet = `<article class="tweet">
          <header>
              <img src="${tweet.user.avatars}" alt="Profile Picture" class="profile-picture">
              <div>
                  <h4 class="name">${tweet.user.name}</h4>
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
      $('.tweet-container').empty();
      for (const tweet of tweets) {
          const $tweet = createTweetElement(tweet);
          $('.tweet-container').prepend($tweet);
      }
  };

  const escape = function(str) {
      let div = document.createElement("div");
      div.appendChild(document.createTextNode(str));
      return div.innerHTML;
  };

  const loadTweets = function() {
      $.ajax({
          url: '/tweets',
          method: 'GET',
          success: function(tweets) {
              renderTweets(tweets);
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

  loadTweets(); 

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
              loadTweets(); 
              $('#tweet-text').val(''); 
              $('.counter').text(140); 
          }
      });
  });
});
