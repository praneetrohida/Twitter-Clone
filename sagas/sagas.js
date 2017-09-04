import { put, takeEvery, all, call } from "redux-saga/effects";
import axios from "axios";

const fetchTweets = function* fetchTweets() {
  console.log("into fetch tweets saga");
  yield put({ type: "FETCH_TWEETS_STARTED" });
  try {
    const tweets = yield call(fetchTweetsData);
    yield put({ type: "FETCH_TWEETS_FULFILLED", payload: tweets });
  } catch (error) {
    yield put({ type: "FETCH_TWEETS_REJECTED", payload: error });
  }
};

const watchFetchTweets = function* watchFetchTweets() {
  yield takeEvery("FETCH_TWEETS", fetchTweets);
};

const rootSaga = function* rootSaga() {
  console.log("into root saga");
  yield all([watchFetchTweets()]);
};

export default rootSaga;

const fetchTweetsData = () => {
  return axios.get("http://10.0.1.75:3000/tweets").then(response => {
    console.log(response);
    return response.data;
  });
};

// const helloSaga = function* helloSaga() {
//   console.log("Hello Sagas!");
// };

// export default helloSaga;
