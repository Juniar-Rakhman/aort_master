import React, { Component } from 'react';
import './container.css';
import Navigation from './navigation'
import Home from './home'
import Header from './header'
import Entry from "./entry"
import StaffSearch from "./staffSearch"
import ObservationSearch from "./observationSearch"
import View from "./view"
import UserRoleSearch from "./userRoleSearch"
import ViewUserRole from "./viewUserRole"

class Container extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      page: '',
      data: null
    };

    this.handlePageNav = this.handlePageNav.bind(this);
  };

  handlePageNav(state, data = null) {
    this.setState({
      page: state,
      data: data
    });
  }

  renderContent() {
    var content;
    if (this.state.page === '') {
      content = <Home />;
    } else if (this.state.page === 'entry') {
      content = <Entry title='Create' redirectTo={this.handlePageNav}/>;
    } else if (this.state.page === 'staffSearch') {
      content = <StaffSearch />
    } else if (this.state.page === 'observationSearch') {
      content = <ObservationSearch handlePageNav={this.handlePageNav} />
    } else if (this.state.page === 'view') {
      content = <View observationId = {this.state.data} />
    } else if (this.state.page === 'userRoleSearch') {
      content = <UserRoleSearch handlePageNav={this.handlePageNav} />
    } else if (this.state.page === 'viewUserRole') {
      content = <ViewUserRole userRole = {this.state.data} />
    } else if (this.state.page === 'editentry') {
      content = <Entry title='Edit' observation={this.state.data} redirectTo={this.handlePageNav}/>;
    }

    return content;
  }

  renderFooter() {
    return (
      <div className="footer">
        <div>
          <strong>Copyright</strong> Company &copy; 2016
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="main-content">
        <Navigation
          handlePageNav={this.handlePageNav}
          role={this.props.role}
          />
        <div id="page-wrapper" className="gray-bg">
          <Header />
          {this.renderContent() }
          {this.renderFooter() }
        </div>
      </div>
    );
  }
}

export default Container;
