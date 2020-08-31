import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import Router from './router';
//等同于 
// import { default as Router } from './router';

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li><a href = "\">Home</a></li>
        <li><a href = "\login">Login</a></li>
        <li><a href = "\Register">Register</a></li>
      </ul>
      <Router></Router>
    </BrowserRouter>
  );
}

export default App;