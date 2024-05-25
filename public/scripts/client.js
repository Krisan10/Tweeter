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

const createNewTweet = function(tweet) {
  
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


const renderTweets = (tweets) => {
  // loops through tweets
  for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet);
      $('.tweets-container').prepend($tweet);
  }
};