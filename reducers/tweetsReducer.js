const _ = require("lodash");

export default function reducer(
  state = {
    tweets: [],
    userTweets: [],
    tweetReplies: [],
    fetchingTweets: false,
    fetchedTweets: false,
    fetchingTweetReplies: false,
    fetchedTweetReplies: false,
    fetchingUserTweets: false,
    fetchedUserTweets: false,
    error: null,
    tweetPosted: "uninitiated",
    newTweetModalOpen: false
  },
  action
) {
  switch (action.type) {
    case "FETCH_TWEETS_STARTED": {
      return { ...state, fetchingTweets: true };
      break;
    }
    case "FETCH_TWEETS_REJECTED": {
      return { ...state, fetchingTweets: false, error: action.payload };
      break;
    }
    case "FETCH_TWEETS_FULFILLED": {
      var sortedTweets = _.orderBy(action.payload, ["time"], ["desc"]);

      return {
        ...state,
        fetchedTweets: true,
        fetchingTweets: false,
        tweets: sortedTweets,
        error: null
      };
      break;
    }
    case "FETCH_USER_TWEETS_STARTED": {
      return { ...state, fetchingUserTweets: true };
      break;
    }
    case "FETCH_USER_TWEETS_REJECTED": {
      return { ...state, fetchingUserTweets: false, error: action.payload };
      break;
    }
    case "FETCH_USER_TWEETS_FULFILLED": {
      return {
        ...state,
        fetchedUserTweets: true,
        fetchingUserTweets: false,
        userTweets: action.payload,
        error: null
      };
      break;
    }
    case "POST_TWEET_STARTED": {
      return { ...state, tweetPosted: "ongoing" };
      break;
    }
    case "POST_TWEET_SUCCESS": {
      return { ...state, tweetPosted: "success" };
      break;
    }
    case "POST_TWEET_FAILED": {
      return { ...state, tweetPosted: "failed" };
      break;
    }
    case "NEW_TWEET_MODAL_OPEN": {
      return { ...state, newTweetModalOpen: true };
      break;
    }
    case "NEW_TWEET_MODAL_CLOSE": {
      return { ...state, newTweetModalOpen: false };
      break;
    }
    case "FETCH_TWEET_REPLIES_STARTED": {
      return { ...state, fetchingTweetReplies: true };
      break;
    }
    case "FETCH_TWEET_REPLIES_REJECTED": {
      return { ...state, fetchingTweetReplies: false, error: action.payload };
      break;
    }
    case "FETCH_TWEET_REPLIES_FULFILLED": {
      var sortedTweets = _.orderBy(action.payload, ["time"], ["desc"]);

      return {
        ...state,
        fetchedTweetReplies: true,
        fetchingTweetReplies: false,
        tweetReplies: sortedTweets,
        error: null
      };
      break;
    }
    default: {
      return state;
    }
  }
}
