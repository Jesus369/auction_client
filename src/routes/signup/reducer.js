import { createStore, combineReducers, applyMiddleware, compose } from "redux";

const initialState = {
  email: "",
  username: "",
  password: ""
};

const userFields = (state = initialState, action) => {
  switch (action.type) {
    case "EMAIL_INPUT_CHANGE":
      return Object.assign({}, state, {
        email: action.text
      });
    case "EMAIL_INPUT_CHANGE":
      return Object.assign({}, state, {
        username: action.text
      });
    case "EMAIL_INPUT_CHANGE":
      return Object.assign({}, state, {
        password: action.text
      });
    default:
      return state;
      console.log(state);
  }
  return state;
};

const store = createStore(userFields);

export default store;
