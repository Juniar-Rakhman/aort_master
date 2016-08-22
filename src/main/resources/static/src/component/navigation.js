import React, { Component } from 'react';

class Navigation extends Component {
  handlePage(page) {
    this.props.handlePageNav('entry');
  }

  handleObservationSearch() {
    this.props.handlePageNav('observationSearch');
  }

  handleBackHome() {
    this.props.handlePageNav('')
  }

  handleStaffSearch() {
    this.props.handlePageNav('staffSearch');
  }

  handleEntry() {
    this.props.handlePageNav('entry');
  }

  handleObservationView(){
    this.props.handlePageNav('view')
  }

  handleUserRoleSearch() {
    this.props.handlePageNav('userRoleSearch')
  }

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">John Connotr</strong>
                 </span> <span className="text-muted text-xs block">Administrator <b className="caret"></b></span> </span> </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                    <li><a href="#">Logout</a></li>
                </ul>
              </div>
                <div className="logo-element">
                  <h1> ARA </h1>
                </div>
            </li>
            <li className="active">
              <a href="#"><i className="fa-tachometer"></i> <span className="nav-label">Dashboard</span></a>
              <ul className="nav nav-second-level collapse">
                <li><a href="#" onClick={this.handleBackHome.bind(this)}>Home</a></li>
              </ul>
            </li>
            <li>
              <a href="#"><i className="fa fa-user"></i> <span className="nav-label">System Administration</span></a>
              <ul className="nav nav-second-level collapse">
                <li><a href="#" onClick={this.handleStaffSearch.bind(this)}>Users Management</a></li>
                <li><a href="#" onClick={this.handleUserRoleSearch.bind(this)}>Roles Management</a></li>
              </ul>
            </li>
            <li>
              <a href="#"><i className="fa fa-book"></i> <span className="nav-label">Observation Record</span> </a>
              <ul className="nav nav-second-level collapse">
                <li><a href="#" onClick={this.handleObservationSearch.bind(this)}>Data Search</a></li>
                <li><a href="#" onClick={this.handleEntry.bind(this)}>Data Entry</a></li>
              </ul>
            </li>
            <li>
              <a href="#"><i className="fa fa-print"></i> <span className="nav-label">Reporting</span> </a>
              <ul className="nav nav-second-level collapse">
                <li><a href="#">Print Report</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;