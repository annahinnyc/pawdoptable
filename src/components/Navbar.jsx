import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Hey, I'm your Navbar.</h1>
      </div>
    )
  }
}

module.exports = Navbar;