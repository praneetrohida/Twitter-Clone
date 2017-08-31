export default function reducer(
  state = {
    username: ""
  },
  action
) {
  switch (action.type) {
    case "SET_USERNAME": {
      console.log("In set username reducer");
      return { ...state, username: action.payload.username };
      break;
    }
    default: {
      return state;
    }
  }
}
