import React, { Component } from 'react';
import './container.css';
import Navigation from './navigation';
import Home from './home';
import Header from './header';
import Entry from "./entry";
import StaffSearch from "./staffSearch";
import ObservationSearch from "./observationSearch";
import View from "./view";
import UserRoleSearch from "./userRoleSearch";
import EntryUserRole from "./entryUserRole";
import StrengthImprovementSearch from "./strengthImprovementSearch";
import EntryStrengthImprovement from "./entryStrengthImprovement";
import RatingSearch from "./ratingSearch";
import EntryRating from "./entryRating";
import PositionSearch from "./positionSearch";
import UpdateCategory from "./updateCategory";
import ReportSearch from "./reportSearch";
import ReportParams from "./reportParams";
import CampusSearch from "./campusSearch";
import EntryCampus from "./entryCampus";
import DepartmentSearch from "./departmentSearch";
import EntryDepartment from "./entryDepartment";
import SessionSearch from "./sessionSearch";
import EntrySession from "./entrySession";

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
            onReady();
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
    } else if (this.state.page === 'entryUserRole') {
      content = <EntryUserRole userRole={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'edit') {
      content = <Entry title='Edit' observation={this.state.data} staff={this.state.staff} redirectTo={this.handlePageNav}/>;
    } else if (this.state.page === 'strengthImprovementSearch') {
      content = <StrengthImprovementSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'entryStrengthImprovement') {
      content = <EntryStrengthImprovement title='Create' redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'editStrengthImprovement') {
      content = <EntryStrengthImprovement title='Edit' strengthImprovement={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'ratingSearch') {
      content = <RatingSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'entryRating') {
      content = <EntryRating title='Create' redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'editRating') {
      content = <EntryRating title='Edit' rating={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'positionSearch') {
      content = <PositionSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'updateCategory') {
      content = <UpdateCategory category={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'reportSearch') {
      content = <ReportSearch redirectTo={this.handlePageNav} role={this.state.role} />
    } else if (this.state.page === 'reportParam') {
      content = <ReportParams redirectTo={this.handlePageNav} report={this.state.data} staff={this.state.staff} />
    } else if (this.state.page === 'campusSearch') {
      content = <CampusSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'entryCampus') {
      content = <EntryCampus title='Create' redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'editCampus') {
      content = <EntryCampus title='Edit' campus={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'departmentSearch') {
      content = <DepartmentSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'entryDepartment') {
      content = <EntryDepartment title='Create' redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'editDepartment') {
      content = <EntryDepartment title='Edit' department={this.state.data} redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'sessionSearch') {
      content = <SessionSearch redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'entrySession') {
      content = <EntrySession title='Create' redirectTo={this.handlePageNav} />
    } else if (this.state.page === 'editSession') {
      content = <EntrySession title='Edit' session={this.state.data} redirectTo={this.handlePageNav} />
    }

    return content;
  }

  renderFooter() {
    return (
      <div className="footer">
        <div>
          <strong>Copyright</strong> Ara &copy; 2016
        </div>
      </div>
    );
  }

  render() {
    if(this.state.username != null && this.state.staff != null && this.state.role != null) {
        if(this.state.staff.isEmployed) {
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
        else {
            window.location = "/no_access";
        }
    }
    else {
        return (
           <div className="main-content" style={{textAlign: 'center'}}>
             <i className="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
             <span className="sr-only">Loading...</span>
           </div>
        );
    }

  }
}

export default Container;
