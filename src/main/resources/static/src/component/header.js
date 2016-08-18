import React, { Component } from 'react';

class Header extends Component {
  render() {
    var style = {
      "margin-bottom": 0
    }
    return (
      <div className="row border-bottom">
        <nav className="navbar navbar-static-top white-bg" role="navigation" style={style}>
          <div className="navbar-header">
            <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
          </div>
          <ul className="nav navbar-top-links navbar-right">
            <li>
              <a href="login.html">
                  <i className="fa fa-sign-out"></i> Log out
              </a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Header;