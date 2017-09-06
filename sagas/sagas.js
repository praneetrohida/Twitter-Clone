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

const fetchUserTweets = function* fetchUserTweets() {
  //temporary implementation. Take username/userID and fetch tweets accordingly
  yield put({ type: "FETCH_USER_TWEETS_STARTED" });
  try {
    const tweets = yield call(fetchUserTweetsData);
    yield put({ type: "FETCH_USER_TWEETS_FULFILLED", payload: tweets });
  } catch (error) {
    yield put({ type: "FETCH_USER_TWEETS_REJECTED", payload: error });
  }
};

const watchFetchUserTweets = function* watchFetchUserTweets() {
  yield takeEvery("FETCH_USER_TWEETS", fetchUserTweets);
};

const setUsername = function* setUsername(action) {
  yield put({ type: "SET_USERNAME_STARTED", payload: action.payload });
};

const watchSetUsername = function* watchSetUsername() {
  yield takeEvery("SET_USERNAME", setUsername);
};

const setPassword = function* setPassword(action) {
  yield put({ type: "SET_PASSWORD_STARTED", payload: action.payload });
};

const watchSetPassword = function* watchSetPassword() {
  yield takeEvery("SET_PASSWORD", setPassword);
};

const watchLogin = function* watchLogin() {
  yield takeEvery("DO_LOGIN", function*(action) {
    yield put({ type: "DO_LOGIN_STARTED" });
    try {
      const loginData = yield call(attemptLogin);
      if (
        loginData.username === action.payload.username &&
        loginData.password === action.payload.password
      )
        yield put({ type: "DO_LOGIN_SUCCESS" });
      else yield put({ type: "DO_LOGIN_FAILED" });
    } catch (error) {
      yield put({ type: "DO_LOGIN_FAILED" });
    }
  });
};

const rootSaga = function* rootSaga() {
  console.log("into root saga");
  yield all([
    watchFetchTweets(),
    watchFetchUserTweets(),
    watchSetUsername(),
    watchSetPassword(),
    watchLogin()
  ]);
};

export default rootSaga;

const fetchTweetsData = () => {
  return axios.get("http://10.0.1.75:3000/tweets").then(response => {
    console.log(response);
    return response.data;
  });
};

const fetchUserTweetsData = () => {
  return axios.get("http://10.0.1.75:3000/userTweets").then(response => {
    console.log(response);
    return response.data;
  });
};

const attemptLogin = () => {
  return axios.get("http://10.0.1.75:3000/login").then(response => {
    return response.data;
  });
};

// const helloSaga = function* helloSaga() {
//   console.log("Hello Sagas!");
// };

// export default helloSaga;
