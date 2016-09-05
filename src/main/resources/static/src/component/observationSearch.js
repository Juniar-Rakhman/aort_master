import React, { Component } from 'react';
import PageInfo from './pageInfo';

class ObservationRow extends Component {
    constructor(props){
        super(props);
    }
    
    handleObservationView() {
        this.props.redirectTo('view', this.props.observation.id);
    }
    
    render() {
        var obsStatus = this.props.observation.completed == true ? "Completed" : "Open" ;
        return (
            <tr className="gradeX">
                <td><a href='#' onClick={this.handleObservationView.bind(this)}>{this.props.observation.staffName}</a></td>
                <td>{this.props.observation.courseName}</td>
                <td>{this.props.observation.observerPrimaryName}</td>
                <td>{obsStatus}</td>
                <td>{this.props.observation.date} / {this.props.observation.time}</td>
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
            rows.push(<ObservationRow observation={observation} key={observation.observationId} redirectTo={this.props.redirectTo} role={this.props.role} />);
        }, this);
        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='25%'>Staff Name</th>
                        <th width='20%'>Course Name</th>
                        <th width='25%'>Primary Observer</th>
                        <th width='10%'>Status</th>
                        <th width='20%'>Date/Time</th>
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

    handleChange(e) {
        this.props.onUserInput(
            this.refs.filterTextInput.value
        )
        e.preventDefault();
    }

    handleTextChange(e){
        this.setState({inputTextVal: e.target.value});
    }
    render() {
        var style = {
          "margin-bottom": "0px"
        }
        return (

            <div className="m-b">
                <form role="form" className="form-inline" onSubmit={this.handleChange.bind(this)}>
                    <div className="form-group">
                        <input type="text" placeholder="Find Observation" name="search" className="form-control"
                            ref="filterTextInput"
                            onChange={this.handleTextChange.bind(this)}/> &nbsp;
                    </div>

                    <button
                        style={style}
                        className="btn btn-sm btn-primary"
                        type="submit"
                        disabled={this.state.inputTextVal === ''}>Search
                    </button>

                </form>
            </div>
        );
    }
}

class ObservationSearch extends Component {
    constructor(props, context) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            observations: [],
            filterText: '',
            page: 0,
            size: 10,
            totalPages: 10
        };
    }

    handleUserInput(value){
        this.setState({
            page: 0,
            filterText: value
        });
        this.getObservationBySearch(value);
    }

    getObservationBySearch(filter){
        $.ajax({
            type: 'GET',
            url: "api/observations/search?filter=" + filter + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({observations: response["content"]});
                this.setState({totalPages: response["totalPages"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getDataObservation() {
        $.ajax({
            type: 'GET',
            url: "/api/observations?page="+this.state.page+"&size="+this.state.size,
            success: function(response) {
                this.setState({observations: response["content"]});
                this.setState({totalPages: response["totalPages"]});
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
        this.getDataObservation();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getObservationBySearch(this.state.filterText);
            }
            else {
                this.getDataObservation();
            }
        }
    }

    render() {
        var errorMessage = null;
        if(this.props.errorMessage != null) {
            errorMessage = (
                <div className="alert alert-danger">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    {this.props.errorMessage}
                </div>
            );
        }
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Observation Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    {errorMessage}
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <ObservationTable 
                                        observations={this.state.observations}
                                        redirectTo={this.props.redirectTo}
                                        role={this.props.role}
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