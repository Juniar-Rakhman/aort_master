import React, { Component } from 'react';
import logo from '../logo.svg';

class Home extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-lg-12">
          <div className="text-center m-t-lg">
            <img src={logo} className="App-logo" alt="logo" />
            <h1>
                Welcome in Academic Observation Recording Tool Front Page
            </h1>
          </div>
          <div id='example'>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;