var redux  = require('redux');

console.log('starting redux example');


var actions = require('./actions/index');
var store = require('./store/configureStore').configure();


// Subscribe to CHANGE_SEARCH_TEXT
var unsubscribe = store.subscribe( () => {
  var state = store.getState();


  console.log('New state' , store.getState());

  if(state.map.isFetching) {
    document.getElementById('app').innerHTML = 'Loading...';
  } else if (state.map.url) {
    document.getElementById('app').innerHTML = '<a target="_blank" href="'+ state.map.url+'">View your location</a>';
  }
});
// unsubscribe();

var currentState = store.getState();
console.log('currentState: ', currentState);


// for store.dispatch you can use both formulation of the object using type and name
// or you can use action generator functions like changeName()

store.dispatch(actions.fetchLocation());

// dispatch with action generators
store.dispatch(actions.changeName('Andrei'));

store.dispatch(actions.addHobby('Running'));

store.dispatch(actions.removeHobby(2));
store.dispatch(actions.changeName('Raysa'));
store.dispatch(actions.addMovie('Nemo', 'adventure'));
store.dispatch(actions.addHobby('walking'));
store.dispatch(actions.addMovie('mad max', 'action'));

store.dispatch(actions.removeMovie(1));

// examples of dispatch without action generators
// store.dispatch({
//   type: 'CHANGE_NAME',
//   name: 'John'
// });
// store.dispatch({
//   type:'ADD_HOBBY',
//   hobby: 'walking'
// });
// var stateDefault = {
//   name: 'Anonymous',
//   hobbies: [],
//   movies: []
// };
// var oldreducer = (state = stateDefault, action) => {
//   // state = state || {name: 'Anonymous'};  es5 syntax
//
//   switch (action.type) {
//     case 'CHANGE_NAME':
//       return {
//         ...state,
//         name: action.name
//       };
//     case 'ADD_HOBBY':
//       return {
//         ...state,
//         hobbies: [
//           ...state.hobbies,
//           {
//             id: nextHobbyId++,
//             hobby: action.hobby
//           }
//         ]
//       };
//     case 'REMOVE_HOBBY':
//       return {
//         ...state,
//         hobbies: state.hobbies.filter((hobby) => hobby.id !== action.id)
//       }
//     case 'ADD_MOVIE':
//       return {
//         ...state,
//         movies: [
//           ...state.movies,
//           {
//             id: nextMovieId++,
//             ...action.movies
//           }
//         ]
//       };
//     case 'REMOVE_MOVIE':
//       return {
//         ...state,
//         movies: state.movies.filter((movie) => movie.id !== action.id)
//       };
//     default:
//       return state;
//   }
//   return state;
// };
