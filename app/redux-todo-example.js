var redux  = require('redux');

console.log('starting todo redux example');

var stateDefault = {
  searchText: '',
  showCompleted:false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  // state = state || {name: 'Anonymous'};  es5 syntax
  return state;
};
var store = redux.createStore(reducer);


console.log("currentState: ",store.getState());
