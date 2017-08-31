import { combineReducers } from "redux";

import tweets from "./tweetsReducer";
import login from "./loginReducer";

export default combineReducers({
  tweets,
  login
});
