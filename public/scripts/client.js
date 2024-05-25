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

const loadTweets = function() {
  $.ajax({
      url: '/tweets',
      method: 'GET',
      success: function(tweets) {
          renderTweets(tweets);
      }
  });
};
loadTweets();

$('form').on('submit', function(event) {
  event.preventDefault(); // Prevent the default form submission

  const tweetText = $('#tweet-text').val().trim();

  // Basic validation
  if (!tweetText) {
      alert("Tweet cannot be empty!");
      return;
  }
  if (tweetText.length > 140) {
      alert("Tweet cannot exceed 140 characters!");
      return;
  }

  // Post the tweet using AJAX
  $.ajax({
      url: '/tweets',
      method: 'POST',
      data: $(this).serialize(),
      success: function() {
          loadTweets(); // Reload tweets after posting
          $('#tweet-text').val(''); // Clear the text area
          $('.counter').text(140); // Reset the character counter
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