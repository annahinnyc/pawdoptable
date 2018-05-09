import React, { Component, Fragment } from 'react';

class App extends Component {
  constructor(props) {
    super(props);
      this.state = {
        hello: 'world'
      }
  }

  render() {
    return (
    <div>
      <h1>Hello World</h1>;
    </div>
  }
}

export default App;