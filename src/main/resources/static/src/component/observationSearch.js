import React, { Component } from 'react';

class ObservationRow extends Component {
    constructor(props){
        super(props);
    }
    
    handleObservationView() {
        this.props.redirectTo('view', this.props.observation.id, this.props.observation.staffId);
    }
    
    render() {
        return (
            <tr className="gradeX">
                <td><a href='#' onClick={this.handleObservationView.bind(this)}>{this.props.observation.staffName}</a></td>
                <td>{this.props.observation.courseName}</td>
                <td>{this.props.observation.courseLevel}</td>
                <td>{this.props.observation.programme}</td>
                <td>{this.props.observation.programmeLevel}</td>
            </tr>
        );
    }
}

class ObservationTable extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        var rows = [];
        this.props.observations.forEach(function (observation) {
            if (observation.courseName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 &&
                observation.staffName.toLowerCase().indexOf(this.props.filterText.toLowerCase()) === -1 ){
                return;
            }
            rows.push(<ObservationRow observation={observation} key={observation.observationId} redirectTo={this.props.redirectTo} role={this.props.role} />);
        }, this);
        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th>Staff Name</th>
                        <th>Course Name</th>
                        <th>Course Level</th>
                        <th>Programme</th>
                        <th>Programme Level</th>
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
        this.props.onUserInput(
            this.refs.filterTextInput.value,
        )
    }

    render() {
        return (
            <div className="search-form">
                <form>
                    <div className="input-group">
                        <input type="text" placeholder="Find Observation" name="search" className="form-control input-lg"
                            value={this.props.consFilterText}
                            ref="filterTextInput"
                            onChange={this.handleChange} />
                    </div>
                </form>
            </div>
        );
    }
}

class ObservationSearch extends Component {
    constructor(props, context) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);

        this.state = {
            observations: [],
            filterText: '',
            constFilterText: ''
        };
    };

    handleUserInput(target){
        this.setState({
            constFilterText: target
        })
    }

    getDataObservation() {
        $.ajax({
            type: 'GET',
            url: "/api/observations",
            success: function(response) {
                this.setState({observations: response});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentWillMount() {
        this.getDataObservation();
    }

    render() {
        return (
            <div className="wrapper wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h5>Observation search result</h5>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar 
                                        filterText={this.state.constFilterText}
                                        onUserInput={this.handleUserInput}
                                    />
                                    <ObservationTable 
                                        observations={this.state.observations}
                                        filterText={this.state.constFilterText}
                                        redirectTo={this.props.redirectTo}
                                        role={this.props.role}
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
var OBSERVATIONS =
[
      {
        "id" : 1,
        "date" : "2016-08-17",
        "time" : "11:00:00",
        "lateLearners" : 1,
        "location" : "test loc",
        "moderated" : true,
        "programme" : "test aja",
        "programmeLevel" : 1,
        "notes" : "test notest",
        "ratingSummary" : "1",
        "registeredLearners" : 15,
        "sessionContext" : "test session",
        "startLearners" : 11,
        "strengthsShare" : "test str",
        "totalLearners" : 12,
        "additionalComments" : "test add comments",
        "courseLevel" : 3,
        "courseName" : "test aja",
        "department" : "test dep",
        "staff": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "hod": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "learningCoach": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "lineManager": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "observerPrimary": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "moderator": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "observerSecondary": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "strengthImprovements": [
            {
              "id" : 1,
              "improvement": true,
              "strength": false,
              "evidence": "test1",
              "strImpRef": {
                "id" : 1,
                "category": "Learner-centred teaching enables all learners to achieve",
                "criteria": "Learning strategies cater for the needs of the learners"
              }
            },
            {
              "id" : 2,
              "improvement": false,
              "strength": true,
              "evidence": "test2",
              "strImpRef": {
                "id" : 2,
                "category": "Learner-centred teaching enables all learners to achieve",
                "criteria": "Learning activities are varied and interesting"
              }
            }
        ],
        "ratingReference": {
          "id" : 1,
          "rating": "Excellent"
        },
        "_links" : {
          "self" : {
            "href" : "http://localhost:8080/api/observations"
          },
          "profile" : {
            "href" : "http://localhost:8080/api/profile/observations"
          },
          "search" : {
            "href" : "http://localhost:8080/api/observations/search"
          }
        },
        "page" : {
          "size" : 20,
          "totalElements" : 1,
          "totalPages" : 1,
          "number" : 0
        }
      },
      {
        "id": 2,
        "date": "2016-08-17",
        "time": "11:00:00",
        "lateLearners": 1,
        "location": "test loc",
        "moderated": true,
        "programme": "test aja",
        "programmeLevel": 1,
        "notes": "test notest",
        "ratingSummary": "1",
        "registeredLearners": 15,
        "sessionContext": "test session",
        "startLearners": 11,
        "strengthsShare": "test str",
        "totalLearners": 12,
        "additionalComments": "test add comments",
        "courseLevel": 3,
        "courseName": "test aja",
        "department": "test dep",
        "staff": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "hod": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "learningCoach": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "lineManager": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "observerPrimary": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "moderator": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "observerSecondary": {
          "id" : "00000065",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "strengthImprovements": [
            {
              "id": 1,
              "improvement": true,
              "strength": true,
              "evidence": "test1",
              "strImpRef": {
                "id": 1,
                "category": "Learner-centred teaching enables all learners to achieve",
                "criteria": "Learning strategies cater for the needs of the learners"
              }
            },
            {
              "id": 2,
              "improvement": false,
              "strength": false,
              "evidence": "test2",
              "strImpRef": {
                "category": "Learner-centred teaching enables all learners to achieve",
                "criteria": "Learning activities are varied and interesting"
              }
            }
        ],
        "ratingReference": {
          "id": 2,
          "rating": "Good"
        },
        "_links" : {
          "self" : {
            "href" : "http://localhost:8080/api/observations"
          },
          "profile" : {
            "href" : "http://localhost:8080/api/profile/observations"
          },
          "search" : {
            "href" : "http://localhost:8080/api/observations/search"
          }
        },
        "page" : {
          "size" : 20,
          "totalElements" : 1,
          "totalPages" : 1,
          "number" : 0
        }
      }
    ];
*/

export default ObservationSearch;