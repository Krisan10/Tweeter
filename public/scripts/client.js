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

const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

//checks if the tweet is submittable
const isTweetValid = function(tweetText) {
  const $errorContainer = $('.error-container');
  $errorContainer.text('').slideUp();

  if (!tweetText) {
      $errorContainer.text("Tweet cannot be empty!").slideDown();
      return false;
  }
  if (tweetText.length > 140) {
      $errorContainer.text("Tweet cannot exceed 140 characters!").slideDown();
      return false;
  }
  return true;
};


loadTweets(); // Initial load of tweets

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



const renderTweets = (tweets) => {
  // loops through tweets
  for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweet-container').prepend($tweet);
  }
};