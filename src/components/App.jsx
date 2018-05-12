import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        hello: 'world'
      }
  }

  render() {
    return (
    <Fragment>
      <div>
        <h1>Pawdoptable</h1>;
      </div>
      <div>
        <h3>This will be the first page where we test out our queries</h3>
      </div>
      <div>
        <h3>DATA</h3>
        <p></p>
        <p></p>
        <p></p>
        <p></p>
      </div>
    </Fragment>
  }
}

export default App;