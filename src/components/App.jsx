import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactDOM from 'react-dom';
import { Route, Link } from 'react-router-dom';
import Landing from './Landing.jsx';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
        <Route exact path='/' component={ Landing } />
      </div>
    )
  }
};
export default App;
