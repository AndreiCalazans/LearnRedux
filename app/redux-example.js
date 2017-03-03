var redux  = require('redux');
var axios = require('axios');
console.log('starting redux example');



//Name reducer and action generators
// ---------------------------------
var nameReducer = (state = 'Anonymous', action) => {
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
    default:
      return state;

  }
};
var changeName = (name) => {
  return {
    type: 'CHANGE_NAME',
    name      // name: name (using only name is a ES6 syntax)
  }
};

//Hobby reducers and action generators
// ---------------------------------
var nextHobbyId = 1;
var hobbiesReducer = (state = [] , action) => {
  switch (action.type) {
    case 'ADD_HOBBY':
      return [
        ...state,
        {
          id: nextHobbyId++,
          hobby: action.hobby
        }
      ];
    case 'REMOVE_HOBBY':
      return state.filter((hobby) => hobby.id !== action.id)
    default:
      return state;
  }
};

var addHobby = (hobby) => {
  return {
    type: 'ADD_HOBBY',
    hobby
  }
};
var removeHobby = (id) => {
  return {
    type: 'REMOVE_HOBBY',
    id
  }
};

//Movie reducers and action generators
// ---------------------------------
var nextMovieId = 1;
var movieReducer = (state = [] , action) => {
  switch (action.type) {
    case 'ADD_MOVIE':
      return [
        ...state,
        {
          id: nextMovieId++,
          ...action.movies
        }
      ];
    case 'REMOVE_MOVIE':
      return state.filter((movie) => movie.id !== action.id);
    default:
      return state;

  }
}

var addMovie = (name , genre) => {
  return {
    type: 'ADD_MOVIE',
    movies: {
      name,
      genre
    }
  }
};
var removeMovie = (id) => {
  return {
    type: 'REMOVE_MOVIE',
    id
  }
};


//Map reducer and action generators
// ---------------------------------
var mapReducer = (state = {isFething: false, url: undefined}, action) => {
  switch (action.type) {
    case 'START_LOCATION_FETCH':
      return {
        isFetching: true,
        url: undefined
      };
    case 'COMPLETE_LOCATION_FETCH':
      return {
        isFetching: false,
        url: action.url
      };
    default:
      return state;

  }
};


var startLocationFetch = () => {
  return {
    type: 'START_LOCATION_FETCH',

  }
};

var completeLocationFetch = (url) => {
  return {
    type: 'COMPLETE_LOCATION_FETCH',
    url
  };
};

var fetchLocation = () => {
  store.dispatch(startLocationFetch());

  axios.get('http://ipinfo.io').then((res) => {
    var loc = res.data.loc;
    var baseUrl = 'http://maps.google.com?q=';

    store.dispatch(completeLocationFetch(baseUrl + loc));
  });
}

// redirecting the use of reducers to each functionality
var reducer = redux.combineReducers({
  name: nameReducer,
  hobbies: hobbiesReducer,
  movies: movieReducer,
  map: mapReducer
});


// creating the store and composing to be able to use chrome dev tools for redux
var store = redux.createStore(reducer, redux.compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
));




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

fetchLocation();

// dispatch with action generators
store.dispatch(changeName('Andrei'));

store.dispatch(addHobby('Running'));

store.dispatch(removeHobby(2));
store.dispatch(changeName('Raysa'));
store.dispatch(addMovie('Nemo', 'adventure'));
store.dispatch(addHobby('walking'));
store.dispatch(addMovie('mad max', 'action'));

store.dispatch(removeMovie(1));

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
