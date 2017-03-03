var redux  = require('redux');

console.log('starting redux example');

var stateDefault = {
  name: 'Anonymous',
  hobbies: [],
  movies: []
};

var nextHobbyId = 1;
var nextMovieId = 1;
var reducer = (state = stateDefault, action) => {
  // state = state || {name: 'Anonymous'};  es5 syntax

  switch (action.type) {
    case 'CHANGE_NAME':
      return {
        ...state,
        name: action.name
      };
    case 'ADD_HOBBY':
      return {
        ...state,
        hobbies: [
          ...state.hobbies,
          {
            id: nextHobbyId++,
            hobby: action.hobby
          }
        ]
      };
    case 'REMOVE_HOBBY':
      return {
        ...state,
        hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
      }
    case 'ADD_MOVIE':
      return {
        ...state,
        movies: [
          ...state.movies,
          {
            id: nextMovieId++,
            ...action.movies
          }
        ]
      };
    case 'REMOVE_MOVIE':
      return {
        ...state,
        movies: state.movies.filter((movie) => movie.id !== action.id)
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

  console.log('New state' , store.getState());
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
  type:'ADD_HOBBY',
  hobby: 'Running'
});
store.dispatch({
  type:'ADD_HOBBY',
  hobby: 'walking'
});
store.dispatch({
  type: 'REMOVE_HOBBY',
  id:2
});

store.dispatch({
  type: 'ADD_MOVIE',
  movies: {
    name: 'spiderman',
    genre: 'action'
  }
})

store.dispatch({
  type: 'CHANGE_NAME',
  name: 'John'
});

store.dispatch({
  type: 'ADD_MOVIE',
  movies: {
    name: 'mad max',
    genre: 'action'
  }
});

store.dispatch({
  type:'REMOVE_MOVIE',
  id: 1
});
