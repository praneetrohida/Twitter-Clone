export default function reducer(
  state = {
    tweets: [],
    userTweets: [],
    fetchingTweets: false,
    fetchedTweets: false,
    fetchingUserTweets: false,
    fetchedUserTweets: false,
    error: null
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
      return {
        ...state,
        fetchedTweets: true,
        fetchingTweets: false,
        tweets: action.payload,
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
    default: {
      return state;
    }
  }
}
