var redux  = require('redux');

console.log('starting todo redux example');

var stateDefault = {
  searchText: '',
  showCompleted:false,
  todos: []
};

var reducer = (state = stateDefault, action) => {
  // state = state || {name: 'Anonymous'};  es5 syntax

  switch (action.type) {
    case 'CHANGE_SEARCH_TEXT':
      return {
        ...state,
        searchText: action.searchText
      }
    default:
      return state;
  }
  return state;
};
var store = redux.createStore(reducer, redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));


// subscribe to changes
store.subscribe(() => {
  var state = store.getState();

  console.log('searchText change: ', state.searchText);
  document.getElementById('app').innerHTML = state.searchText;
});



console.log("currentState: ",store.getState());

// create an action to change the search text
store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'change me'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'second change me'
});

store.dispatch({
  type: 'CHANGE_SEARCH_TEXT',
  searchText: 'third change me'
});
