export function setUsername(username) {
  return function(dispatch) {
    console.log("In set username reducer");
    dispatch({ type: "SET_USERNAME", payload: { username: username } });
  };
}
