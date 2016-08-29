import React, { Component } from 'react';

class ObservationRow extends Component {
    constructor(props){
        super(props);
    }
    
    handleObservationView() {
        this.props.redirectTo('view', this.props.observation.id);
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

class PageInfo extends Component {
  disablePrevious() {
    if (this.props.page === 0) {
      return 'disabled'
    }
  }

  disableNext() {
    if (this.props.page + 1 === this.props.totalPages) {
      return 'disabled'
    }
  }

  onChangePage(page) {
    this.props.handlePage(page-1);
  }

  listNumberPage(start, end) {
    var pages = [];
    // Because API page start from 0, my suggestion maybe we can change API to start from 1, for easy to read
    var activeNum =  this.props.page + 1;
    var active = '';
    for (var num = start; num <= end; num++) {
      if (activeNum === num) {
        active = 'active'
      }
      pages.push(<li className={active}><a onClick={this.onChangePage.bind(this, num)}>{num}</a></li>);
      active = '';
    }

    return pages;
  }

  renderPage() {
    // Because API page start from 0
    // Current assumption every data will be more than 5 pages, need to figure out what if less than 5 pages
    var initPage = this.props.page + 1;
    var pages = [];
    if (this.props.totalPages < 5){
      pages = this.listNumberPage(1,this.props.totalPages);
    }
    else{
      if (initPage < 4) {
        pages = this.listNumberPage(1,5);
      }
      else{
        var startPage = initPage - 2;
        var endPage = initPage + 2;
        if (endPage >= this.props.totalPages) {
          startPage = startPage - (endPage - this.props.totalPages)
          endPage = this.props.totalPages
        }
        pages = this.listNumberPage(startPage, endPage);
      }
    }
    return pages;
  }

  renderSizeOption() {
    var size = [];
    var active = '';
    [5, 10, 20, 50, 100].forEach(function(val) {
      if (this.props.size === val){
        active = 'active'
      }
      size.push(<li className={active}><a onClick={() => this.props.handleSize(val)}>{val}</a></li>);
      active = '';
    }, this)
    return size;
  }

  render() {
    return (
      <div>
        <nav aria-label="navigation" className="pull-left">
          <ul className="pagination">
            {this.renderSizeOption()}
          </ul>
        </nav>
        <nav aria-label="navigation" className="pull-right">
          <ul className="pagination">
            <li className={this.disablePrevious()}>
              <a aria-label="Previous" onClick={this.disablePrevious() === 'disabled' ? '' : () => this.props.handlePage(this.props.page-1)} >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {this.renderPage()}
            <li className={this.disableNext()}>
              <a aria-label="Next" onClick={this.disableNext() === 'disabled' ? '' :() => this.props.handlePage(this.props.page+1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.onUserInput(
            this.refs.filterTextInput.value
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
            constFilterText: '',
            page: 0,
            size: 1000,
            totalPages: 10
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
            url: "/api/observations?page="+this.state.page+"&size="+this.state.size,
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
            <div className="wrapper-content animated fadeInRight">
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