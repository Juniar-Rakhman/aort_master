import React, { Component } from 'react';
import PageInfo from './pageInfo';

class UserRoleRow extends Component {
  constructor(props){
      super(props);
      
  }

  handleUserRoleView() {
      var data = {
        staff : this.props.staff,
        role : this.props.role
      };

      this.props.redirectTo('viewUserRole', data);
  
  }
  render() {
      var fullName = this.props.staff.firstName + ' ' + this.props.staff.lastName;
      var role = "";

      if(this.props.role != null) {
          if(this.props.role.general) {
            role = "General";
          }
          else if(this.props.role.addObservation) {
            role = "Add Observation";
          }
          else if(this.props.role.systemAdmin) {
            role = "System Administration";
          }
          else if(this.props.role.qualityAssurance) {
            role = "Quality Assurance";
          }
      }

      return (
          <tr className="gradeX">
              <td><a href='#' onClick={this.handleUserRoleView.bind(this)}>{fullName}</a></td>
              <td>{role}</td>
          </tr>
      );
  }

}

class UserRoleTable extends Component {
	constructor(props){
      super(props);
  }

  render() {
  	var rows = [];
      this.props.staffs.forEach(function(staff) {
          var role = {};
          this.props.userRoles.forEach(function(userRole) {
            if(userRole.staffId === staff.id) {
              role = userRole;
              return;
            }
          });
          rows.push(<UserRoleRow staff={staff} role={role} key={staff.id} redirectTo={this.props.redirectTo} />);
      }, this);
      
      return (
          <table className="table table-striped table-bordered table-hover dataTables-example" >
              <thead>
                  <tr>
                      <th width='60%'>Full Name</th>
                      <th width='40%'>Role</th>
                  </tr>
              </thead>
              <tbody>{rows}</tbody>
          </table>
      );
  }
}

class SearchBar extends Component {
    constructor(props){
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.state = {inputTextVal: ''}
    }

    handleChange() {
      this.props.onUserInput(
          this.refs.filterTextInput.value,
      )
    }

    handleTextChange(e){
        this.setState({inputTextVal: e.target.value});
    }

    render() {
      var style = {
        "padding-top": "5px"
      }
      return (
        <div className="form-group">
            <form role="form" className="form-inline">
              <div className="input-group">
                  <input type="text" placeholder="Find Staff's Role" name="search" className="form-control input-lg"
                      value={this.props.consFilterText}
                      ref="filterTextInput"
                      onChange={this.handleTextChange.bind(this)} />
              </div>
              <div className="form-group" style={style}>
                <button
                    className="btn btn-sm btn-primary"
                    type="button"
                    onClick={this.handleChange.bind(this)}
                    disabled={this.state.inputTextVal === ''}>Search
                </button>
              </div>
            </form>
        </div>
      );
  }
}

class UserRoleSearch extends Component {
	constructor(props, context) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            userRoles: [],
            staffs: [],
            filterText: '',
            constFilterText: '',
            page: 0,
            size: 20,
            totalPages: 10
        };
    }

    handleUserInput(name){
        this.getStaffBySearch(name);
        this.getDataUserRole();
    }

    getStaffBySearch(name){
        $.ajax({
            type: 'GET',
            url: "api/staffs/search/findByStaffName?name=" + name,
            success: function(response) {
                this.setState({staffs: response["_embedded"]["staffs"]});
                this.setState({totalPages: response["page"]["totalPages"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getDataUserRole() {
        $.ajax({
            type: 'GET',
            url: "/api/userRoles",
            success: function(response) {
                this.setState({userRoles: response["_embedded"]["userRoles"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getDataStaff() {
        $.ajax({
            type: 'GET',
            url: "/api/staffs?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({staffs: response["_embedded"]["staffs"]});
                this.setState({totalPages: response["page"]["totalPages"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handlePage(page) {
        this.setState({page: page});
    }

    handleSize(size) {
        this.setState({size: size});
    }

    componentWillMount() {
        this.getDataUserRole();
        this.getDataStaff();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            this.getDataStaff();
        }
    }

    render() {
        console.log('test ini:' + this.state.constFilterText);
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Staff Role Search</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar 
                                        filterText={this.state.constFilterText}
                                        onUserInput={this.handleUserInput}
                                    />
                                    <UserRoleTable 
                                        staffs={this.state.staffs}
                                        userRoles={this.state.userRoles}
                                        filterText={this.state.constFilterText}
                                        redirectTo={this.props.redirectTo}
                                    />
                                    <PageInfo
                                        page={this.state.page}
                                        totalPages={this.state.totalPages}
                                        size={this.state.size}
                                        handlePage={this.handlePage}
                                        handleSize={this.handleSize}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

/*
var STAFFS =  [ {
      "id" : "1",
      "department" : "Department of Computing",
      "email" : "Richard.Smith1@ara.ac.nz",
      "firstName" : "Richard",
      "lastName" : "Smith1",
      "location" : null,
      "officePhone" : "1984432418",
      "username" : "Smith1R",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/staffs/00000065"
        },
        "staff" : {
          "href" : "http://localhost:8080/api/staffs/00000065"
        },
        "positions" : {
          "href" : "http://localhost:8080/api/staffs/00000065/positions"
        }
      }
    }, 
    {
      "id" : "2",
      "department" : "Learning Design Department",
      "email" : "Selena.Smith2@ara.ac.nz",
      "firstName" : "Selena",
      "lastName" : "Smith2",
      "location" : null,
      "officePhone" : "467398155",
      "username" : "Smith2S",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/staffs/00000216"
        },
        "staff" : {
          "href" : "http://localhost:8080/api/staffs/00000216"
        },
        "positions" : {
          "href" : "http://localhost:8080/api/staffs/00000216/positions"
        }
      }
    },
    {
      "id" : "3",
      "department" : "Learning Design Department",
      "email" : "Selena.Smith2@ara.ac.nz",
      "firstName" : "Selena",
      "lastName" : "Gomes",
      "location" : null,
      "officePhone" : "467398155",
      "username" : "Smith2S",
      "_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/staffs/00000216"
        },
        "staff" : {
          "href" : "http://localhost:8080/api/staffs/00000216"
        },
        "positions" : {
          "href" : "http://localhost:8080/api/staffs/00000216/positions"
        }
      }
    }  
];

var USERROLES = [
	{
    "id" : 1,
		"staff" : {
      "id" : "1",
			"department" : "Department of Computing",
    	"email" : "Richard.Smith1@ara.ac.nz",
    	"firstName" : "Richard",
    	"lastName" : "Smith1",
    	"location" : null,
    	"officePhone" : "1984432418",
    	"username" : "Smith1R",
    	"_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/staffs/00000065"
        },
        "staff" : {
          "href" : "http://localhost:8080/api/staffs/00000065"
        },
        "positions" : {
          "href" : "http://localhost:8080/api/staffs/00000065/positions"
        }
  		}
		},
		"addObservation" : true,
		"general" : false,
		"systemAdmin" : false,
		"qualityAssurance" : false
	},
	{
    "id" : 2,
		"staff" : {
      "id" : "2",
			"department" : "Learning Design Department",
  		"email" : "Selena.Smith2@ara.ac.nz",
  		"firstName" : "Selena",
  		"lastName" : "Smith2",
  		"location" : null,
  		"officePhone" : "467398155",
  		"username" : "Smith2S",
  		"_links" : {
        "self" : {
          "href" : "http://localhost:8080/api/staffs/00000216"
        },
        "staff" : {
          "href" : "http://localhost:8080/api/staffs/00000216"
        },
        "positions" : {
          "href" : "http://localhost:8080/api/staffs/00000216/positions"
        }
			}
		},
		"addObservation" : false,
		"general" : true,
		"systemAdmin" : false,
		"qualityAssurance" : false
	}
]
*/

export default UserRoleSearch;