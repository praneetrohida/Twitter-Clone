export default function reducer(
  state = {
    tweets: [],
    fetching: false,
    fetched: false,
    error: null
  },
  action
) {
  switch (action.type) {
    case "FETCH_TWEETS": {
      return { ...state, fetching: true };
      break;
    }
    case "FETCH_TWEETS_REJECTED": {
      return { ...state, fetching: false, error: action.payload };
      break;
    }
    case "FETCH_TWEETS_FULFILLED": {
      return {
        ...state,
        fetched: true,
        fetching: false,
        tweets: action.payload,
        error: null
      };
      break;
    }
    default: {
      return state;
    }
  }
}
