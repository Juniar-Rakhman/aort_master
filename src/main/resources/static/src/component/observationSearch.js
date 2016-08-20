import React, { Component } from 'react';

class ObservationRow extends Component {
    render() {
        var fullName = this.props.observation.hod.firstName + ' ' + this.props.observation.hod.lastName;
        return (
            <tr className="gradeX">
                <td><a href='#' onClick='{this.handleObservationView.bind(this)}'> {fullName}</a></td>
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
            if (observation.courseName.indexOf(this.props.filterText) === -1){
                return;
            }
            rows.push(<ObservationRow observation={observation} key={observation.observationId} />);
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

class FilterableObservationTable extends Component {
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
                this.setState({observations: response["_embedded"]["observations"]});
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
        "date": "2016-08-18",
        "time": null,
        "lateLearners": null,
        "location": null,
        "moderated": null,
        "programme": null,
        "programmeLevel": null,
        "notes": null,
        "ratingSummary": null,
        "registeredLearners": null,
        "sessionContext": null,
        "startLearners": null,
        "strengthsShare": null,
        "totalLearners": null,
        "additionalComments": null,
        "courseLevel": null,
        "courseName": "test 1",
        "department": "test 2",
        "hod": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/api/observations/1"
          },
          "observation": {
            "href": "http://localhost:8080/api/observations/1"
          },
          "learningCoach": {
            "href": "http://localhost:8080/api/observations/1/learningCoach"
          },
          "HOD": {
            "href": "http://localhost:8080/api/observations/1/HOD"
          },
          "strengthImprovements": {
            "href":
"http://localhost:8080/api/observations/1/strengthImprovements"
          },
          "lineManager": {
            "href": "http://localhost:8080/api/observations/1/lineManager"
          },
          "observerPrimary": {
            "href": "http://localhost:8080/api/observations/1/observerPrimary"
          },
          "moderator": {
            "href": "http://localhost:8080/api/observations/1/moderator"
          },
          "observerSecondary": {
            "href": "http://localhost:8080/api/observations/1/observerSecondary"
          },
          "ratingReference": {
            "href": "http://localhost:8080/api/observations/1/ratingReference"
          },
          "staff": {
            "href": "http://localhost:8080/api/observations/1/staff"
          }
        }
      },
      {
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
        "hod": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "_links": {
          "self": {
            "href": "http://localhost:8080/api/observations/2"
          },
          "observation": {
            "href": "http://localhost:8080/api/observations/2"
          },
          "learningCoach": {
            "href": "http://localhost:8080/api/observations/2/learningCoach"
          },
          "HOD": {
            "href": "http://localhost:8080/api/observations/2/HOD"
          },
          "strengthImprovements": {
            "href":
"http://localhost:8080/api/observations/2/strengthImprovements"
          },
          "lineManager": {
            "href": "http://localhost:8080/api/observations/2/lineManager"
          },
          "observerPrimary": {
            "href": "http://localhost:8080/api/observations/2/observerPrimary"
          },
          "moderator": {
            "href": "http://localhost:8080/api/observations/2/moderator"
          },
          "observerSecondary": {
            "href": "http://localhost:8080/api/observations/2/observerSecondary"
          },
          "ratingReference": {
            "href": "http://localhost:8080/api/observations/2/ratingReference"
          },
          "staff": {
            "href": "http://localhost:8080/api/observations/2/staff"
          }
        }
      }
    ];
*/
export default FilterableObservationTable;