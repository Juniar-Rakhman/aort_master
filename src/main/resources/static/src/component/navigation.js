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
    this.props.handlePageNav('entry', {});
  }

  handleObservationView() {
    this.props.handlePageNav('view')
  }

  handleUserRoleSearch() {
    this.props.handlePageNav('userRoleSearch')
  }

  handleStrengthImprovementSearch() {
    this.props.handlePageNav('strengthImprovementSearch');
  }

  handleRatingSearch() {
    this.props.handlePageNav('ratingSearch');
  }

  handlePositionSearch() {
    this.props.handlePageNav('positionSearch');
  }

  handleCampusSearch(){
    this.props.handlePageNav('campusSearch');
  }

  handleDepartmentSearch(){
    this.props.handlePageNav('departmentSearch');
  }

  handleSessionSearch(){
    this.props.handlePageNav('sessionSearch');
  }

  handleReport(){
    this.props.handlePageNav('reportSearch');
  }

  handleExport(){
    this.props.handlePageNav('exportParam');
  }

  setMenu() {
      var role = this.props.role;
      if(role.addObservation) {
        return(
          <li>
            <a href="#"><i className="fa fa-book"></i> <span className="nav-label">Observation Record</span> </a>
            <ul className="nav nav-second-level">
              <li><a href="#" onClick={this.handleObservationSearch.bind(this)}>Data Search</a></li>
              <li><a href="#" onClick={this.handleEntry.bind(this)}>Data Entry</a></li>
            </ul>
          </li>
        );
      }
      else if(role.general || role.qualityAssurance) {
        var row = [];
        row.push(
            <li>
              <a href="#"><i className="fa fa-book"></i> <span className="nav-label">Observation Record</span> </a>
              <ul className="nav nav-second-level">
                <li><a href="#" onClick={this.handleObservationSearch.bind(this)}>Data Search</a></li>
              </ul>
            </li>
        );
        row.push(
            <li>
              <a href="#"><i className="fa fa-print"></i> <span className="nav-label">Reporting</span></a>
              <ul className="nav nav-second-level">
                <li><a href="#" onClick={this.handleReport.bind(this)}>Report</a></li>
              </ul>
            </li>
        );

        return row;
      }
      else if(role.systemAdmin) {
        var row = [];
        row.push(
          <li>
            <a href="#"><i className="fa fa-user"></i> <span className="nav-label">System Administration</span></a>
            <ul className="nav nav-second-level">
              <li><a href="#" onClick={this.handleStaffSearch.bind(this)}>User Management</a></li>
              <li><a href="#" onClick={this.handleUserRoleSearch.bind(this)}>Role Management</a></li>
              <li><a href="#" onClick={this.handlePositionSearch.bind(this)}>Position Management</a></li>
              <li><a href="#" onClick={this.handleStrengthImprovementSearch.bind(this)}>Strength Improvement Management</a></li>
              <li><a href="#" onClick={this.handleRatingSearch.bind(this)}>Rating Management</a></li>
              <li><a href="#" onClick={this.handleCampusSearch.bind(this)}>Campus Management</a></li>
              <li><a href="#" onClick={this.handleDepartmentSearch.bind(this)}>Department Management</a></li>
              <li><a href="#" onClick={this.handleSessionSearch.bind(this)}>Session Management</a></li>
            </ul>
          </li>
        );
        row.push(
          <li>
            <a href="#"><i className="fa fa-book"></i> <span className="nav-label">Observation Record</span> </a>
            <ul className="nav nav-second-level">
              <li><a href="#" onClick={this.handleObservationSearch.bind(this)}>Data Search</a></li>
              <li><a href="#" onClick={this.handleEntry.bind(this)}>Data Entry</a></li>
            </ul>
          </li>
        );
        row.push(
            <li>
              <a href="#"><i className="fa fa-print"></i> <span className="nav-label">Reporting</span></a>
              <ul className="nav nav-second-level">
                <li><a href="#" onClick={this.handleReport.bind(this)}>Report</a></li>
                <li><a href="#" onClick={this.handleExport.bind(this)}>Export</a></li>
              </ul>
            </li>
        );

        return row;
      }
  }

  render() {
    return (
      <nav className="navbar-default navbar-static-side" role="navigation">
        <div className="sidebar-collapse">
          <ul className="nav metismenu" id="side-menu">
            <li className="nav-header">
              <div className="dropdown profile-element">
                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">{this.props.staff.firstName + ' ' + this.props.staff.lastName}</strong>
                 </span> </span> </a>
                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                    <li><a href="/logout">Logout</a></li>
                </ul>
              </div>
                <div className="logo-element">
                </div>
            </li>
            <li>
              <a href="#"><i className="fa fa-home"></i> <span className="nav-label">Dashboard</span></a>
              <ul className="nav nav-second-level">
                <li><a href="#" onClick={this.handleBackHome.bind(this)}>Home</a></li>
              </ul>
            </li>
            {this.setMenu()}
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navigation;