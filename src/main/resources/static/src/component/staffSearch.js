import React, { Component } from 'react';
import PageInfo from './pageInfo';

class StaffRow extends Component {
    render() {
        var fullName = this.props.staff.firstName + ' ' + this.props.staff.lastName;
        return (
            <tr className="gradeX">
                <td>{fullName}</td>
                <td>{this.props.staff.email}</td>
                <td>{this.props.staff.officePhone}</td>
                <td>{this.props.staff.department}</td>
            </tr>
        );
    }
}

class StaffTable extends Component {
    constructor(props){
        super(props);
    }

    render() {
        var rows = [];
        this.props.staffs.forEach(function (staff) {
            if (staff.firstName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 &&
                staff.lastName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1) {
                return;
            }
            rows.push(<StaffRow staff={staff} key={staff.id} />);
        }, this);
        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th>Full Name</th>
                        <th>Email</th>
                        <th>Office Phone</th>
                        <th>Department</th>
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
    }

    handleChange() {
        console.log('ini 2:' + this.refs.filterTextInput.value)
        this.props.onUserInput(
            this.refs.filterTextInput.value
        )
    }

    render() {
        return (
            <div className="search-form">
                <form>
                    <div className="input-group">
                        <input type="text" placeholder="Find Staff" name="search" className="form-control input-lg"
                            value={this.props.consFilterText}
                            ref="filterTextInput"
                            onChange={this.handleChange} />
                    </div>
                </form>
            </div>
        );
    }
}

class StaffSearch extends Component {
    constructor(props, context) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            staffs: [],
            filterText: '',
            constFilterText: '',
            page: 0,
            size: 20,
            totalPages: 10
        };
    };

    handleUserInput(target){
       // const { value: constFilterText } = target;
        this.setState({
            constFilterText: target
        })
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
                                <h5>Staff search result</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar 
                                        filterText={this.state.constFilterText}
                                        onUserInput={this.handleUserInput}
                                    />
                                    <StaffTable 
                                        staffs={this.state.staffs}
                                        filterText={this.state.constFilterText}
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
    }, {
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
    }  ];
*/

export default StaffSearch;