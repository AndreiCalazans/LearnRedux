var redux  = require('redux');

console.log('starting redux example');

var reducer = (state = {name: 'Anonymous'}, action) => {
  // state = state || {name: 'Anonymous'};  es5 syntax

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    default:
      return state;
  }
  return state;
};
var store = redux.createStore(reducer, redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));




// Subscribe to CHANGE_SEARCH_TEXT
var unsubscribe = store.subscribe( () => {
  var state = store.getState();

  console.log('Name is', state.name);
  document.getElementById('app').innerHTML   = state.name;
});
// unsubscribe();

var currentState = store.getState();
console.log('currentState: ', currentState);

var action = {
  type: 'CHANGE_NAME',
  name: 'Andrei'
};
store.dispatch(action);



store.dispatch({
  type: 'CHANGE_NAME',
  name: 'John'
});
