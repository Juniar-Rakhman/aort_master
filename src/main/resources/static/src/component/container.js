import React, { Component } from 'react';
import './container.css';
import Navigation from './navigation'
import Home from './home'
import Header from './header'
import Entry from "./entry"
import StaffSearch from "./staffSearch"
import ObservationSearch from "./observationSearch"

class Container extends Component {
  constructor(props, context) {
    super(props);

    this.state = {
      page: ''
    };

    this.handlePageNav = this.handlePageNav.bind(this);
  };

  handlePageNav(state) {
    this.setState({
      page: state
    });
  }

  renderContent() {
    var content;
    if (this.state.page === '') {
      content = <Home />;
    } else if (this.state.page === 'entry') {
      content = <Entry title='Entry' />;
    } else if (this.state.page === 'staffSearch') {
      content = <StaffSearch />
    } else if (this.state.page === 'observationSearch') {
      content = <ObservationSearch />
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
