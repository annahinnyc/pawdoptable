import React, { Component, Fragment } from 'react';
import styled from 'styled-components';
import ReactDOM from "react-dom";

const App = () => {
  return (
    <div>
      <p>React here!</p>
      <p>And I'm here too!</p>
    </div>
  );
};
export default App;
ReactDOM.render(<App />, document.getElementById("app"));