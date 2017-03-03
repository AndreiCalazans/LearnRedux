import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory} from 'react-router';


//Load foundations-sites
// require("foundation-sites/dist/css/foundation.min.css");
$(document).foundation();

//App css
require('app.scss');


ReactDOM.render(
  <div>BoilerPlate 3</div>,
  document.getElementById('app')
);

require('./redux-example.js');
// require('./redux-todo-example.js');
