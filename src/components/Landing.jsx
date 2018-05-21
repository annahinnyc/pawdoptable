import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

class Landing extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('adoptable pets loading...');
  }

  render() {
    return (
       <div>
        <Navbar link="Login" linkurl="/login"/>
        <Footer />
      </div>
    )
  }
}

module.exports = Landing;