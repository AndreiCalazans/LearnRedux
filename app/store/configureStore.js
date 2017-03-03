var redux = require('redux');
var {nameReducer, hobbiesReducer, movieReducer, mapReducer} = require('./../reducers/index');
var thunk = require('redux-thunk').default;

export var configure = () => {
  // redirecting the use of reducers to each functionality
  var reducer = redux.combineReducers({
    name: nameReducer,
    hobbies: hobbiesReducer,
    movies: movieReducer,
    map: mapReducer
  });

  // creating the store and composing to be able to use chrome dev tools for redux
  var store = redux.createStore(reducer, redux.compose(
    redux.applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  ));

  return store;
}
