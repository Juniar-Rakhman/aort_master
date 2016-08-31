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
      data: null,
      username: null,
      staff: null,
      role: null
    };

    this.handlePageNav = this.handlePageNav.bind(this);
  };

  handlePageNav(state, data = null) {
    this.setState({
      page: state,
      data: data
    });
  }

  getUsername() {
    $.ajax({
        type: 'GET',
        url: "/api/username",
        success: function(response) {
            this.getStaff(response);
            this.setState({username: response});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }

  getStaff(username) {
    $.ajax({
        type: 'GET',
        url: "/api/staffs/search/findByUsername?username=" + username,
        success: function(response) {
            this.getRole(response.id);
            this.setState({staff: response});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }

  getRole(staffId) {
    $.ajax({
        type: 'GET',
        url: "api/userRoles/search/findByStaffId?staffId=" + staffId,
        success: function(response) {
            this.setState({role: response});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }

  componentDidMount() {
    this.getUsername();
  }

  renderContent() {
    var content;
    if (this.state.page === '') {
      content = <Home />;
    } else if (this.state.page === 'entry') {
      content = <Entry title='Create' observation={this.state.data} staff={this.state.staff} redirectTo={this.handlePageNav}/>;
    } else if (this.state.page === 'staffSearch') {
      content = <StaffSearch />
    } else if (this.state.page === 'observationSearch') {
      content = <ObservationSearch redirectTo={this.handlePageNav} errorMessage={this.state.data}/>
    } else if (this.state.page === 'view') {
      content = <View title='View' observationId={this.state.data} staff={this.state.staff} redirectTo={this.handlePageNav}/>
    } else if (this.state.page === 'userRoleSearch') {
      content = <UserRoleSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'viewUserRole') {
      content = <ViewUserRole userRole={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'edit') {
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
    if(this.state.staff != null) {
        if(this.state.staff.isEmployed) {
            if(this.state.role != null) {
                return (
                  <div className="main-content">
                    <Navigation
                      handlePageNav={this.handlePageNav}
                      role={this.state.role}
                      staff={this.state.staff}
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
        else {
            window.location = "/no_access";
        }
    }
    else {
        return <div>Loading...</div>
    }

  }
}

export default Container;
