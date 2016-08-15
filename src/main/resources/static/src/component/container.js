import React, { Component } from 'react';
import './container.css';
import Navigation from './navigation'
import Home from './home'
import Header from './header'
import Entry from "./entry"

class Container extends Component {
  propTypes: {
    entry: React.PropTypes.element.isRequired
  }

  constructor(props, context) {
     props = {
      entry: {
        first: 'satu', second: 'dua'
      }
    }
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
    var entry = {
        first: 'satu', second: 'dua'
      };
    if (this.state.page === '') {
      content = <Home />;
    } else if (this.state.page === 'entry') {
      content = <Entry entry={entry} />;
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
    console.log(this.props);
    return (
      <div className="main-content">
        <Navigation
          handlePageNav={this.handlePageNav}
          role={this.props.role}
        />
        <div id="page-wrapper" className="gray-bg">
          <Header />
          {this.renderContent()}
          {this.renderFooter()}
        </div>
      </div>
    );
  }
}

export default Container;
