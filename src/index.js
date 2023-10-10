// index.js or App.js (root component)
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Replace this with the path to your root component

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
