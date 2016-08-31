import React, { Component } from 'react'

class ObserveHeader extends Component{
  constructor(props){
    super(props)
  }

  initialValue() {
    if (this.props.observation == null) {
        return '';
    }
  }

  render(){
    var init = this.initialValue();
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="row m-b">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Teacher's Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.staff.firstName + ' ' + this.props.observation.staff.lastName || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Line Manager's Line</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.lineManager.firstName + ' ' + this.props.observation.lineManager.lastName || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Primary Observer's Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.observerPrimary.firstName + ' ' + this.props.observation.observerPrimary.lastName || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Secondary Observer's Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.observerSecondary.firstName + ' ' + this.props.observation.observerSecondary.lastName || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course Code</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.courseCode || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course (including level)</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.courseName + ' ' + this.props.observation.courseLevel || init} disabled/>
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Programme (including level)</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.programme + ' ' + this.props.observation.programmeLevel || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners on register</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.registeredLearners || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners at start</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.startLearners || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners late</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.lateLearners || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Department</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.department || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Total no. of learners in session</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.totalLearners || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Campus Location</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.location || init} disabled/>
              </div>
            </div>
            <div className="col-sm-6">

            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Context of Session (include stage in programme)</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" value={this.props.observation.sessionContext || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Observation Notes</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" value={this.props.observation.notes || init} disabled/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <label className="col-sm-8 control-label">Lesson Plan</label>
              <div className="col-sm-4">
                <input
                  type="checkbox"
                  checked={this.props.observation.lessonPlan || init}
                  disabled
                />
              </div>
            </div>
            <div className="col-sm-9">
              <label className="col-sm-4 control-label">Comments</label>
              <div className="col-sm-8">
                <textarea
                    type="text"
                    className="form-control m-b"
                    value={this.props.observation.lessonPlanComment || init}
                    disabled
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <label className="col-sm-8 control-label">Course Outline</label>
              <div className="col-sm-4">
                <input
                  type="checkbox"
                  checked={this.props.observation.courseOutline || init}
                  disabled
                />
              </div>
            </div>
            <div className="col-sm-9">
              <label className="col-sm-4 control-label">Comments</label>
              <div className="col-sm-8">
                <textarea
                    type="text"
                    className="form-control m-b"
                    value={this.props.observation.courseOutlineComment || init}
                    disabled
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

class ObserveEntryRow extends Component{
  constructor(props){
    super(props)
  }
  render(){
    return(
        <tr className={this.props.category}>
            <td>
                <ul>
                    <li>{this.props.criteria}</li>
                </ul>
            </td>
            <td align="center">
                <input className="form-control"
                    type="checkbox"
                    checked={this.props.strength}
                    disabled
                />
            </td>
            <td align="center">
                <input className="form-control"
                    type="checkbox"
                    checked={this.props.improvement}
                    disabled
                />
            </td>
            <td>
                <textArea type="text" className="form-control" value={this.props.evidence} disabled></textArea>
            </td>
        </tr>
    );
  }
}

class ObserveEntryCategory extends Component{
  constructor(props){
    super(props);
    this.state = {
      expanded: this.props.categoryItem.expanded || false
    }
  }

  expandOrCollapseObserveEntry() {
    var newState = Object.assign(this.props.categoryItem, {expanded: !this.state.expanded});
    this.props.updateCategoryItems({strengthImprovementReferences: this.updateCategoryItems(newState)});
    this.setState({expanded: newState.expanded});
  }

  updateCategoryItems(categoryItem) {
    var newCategoryItems = Object.assign([], this.props.categoryItems);
    var count = 1;

    if (newCategoryItems.length > 0) {
      newCategoryItems.forEach(function(item, index) {
        if (item.category === categoryItem.category) {
          newCategoryItems[index].expanded = categoryItem.expanded;
        } else {
          count++;
        }
      });
    }else {
      newCategoryItems.push(categoryItem);
    }

    if (count != newCategoryItems.length ) {
      newCategoryItems.push(categoryItem)
    }

    return newCategoryItems;
  }

  render(){
    var trStyle= {
      cursor: 'pointer'
    };
    var h5Style= {
        display: 'inline-block'
    };
    var iconStyle = {
      marginLeft: "8px"
    };
    var iconClass = this.state.expanded ? "fa-chevron-up" : "fa-chevron-down";

    return(
      <tr style={trStyle} onClick={this.expandOrCollapseObserveEntry.bind(this)}>
        <td colSpan="4">
            <h5 style={h5Style}>{this.props.categoryItem.category}</h5>
            <i className={'fa ' + iconClass} style={iconStyle} aria-hidden="true"></i>
        </td>
      </tr>
    )
  }
}

class ObserveEntries extends Component{
  constructor(props){
    super(props)
    this.state = {
      categoryItems: this.props.categoryItems || []
    };

    this.updateCategoryItems = this.updateCategoryItems.bind(this);
  }

  updateCategoryItems(items) {
    this.setState({
        categoryItems: Object.assign(this.state.categoryItems, items)
    });
  }

  render(){
    var rows = [];
    var lastCategory = null;
    var currentCategoryExpanded = null;
    this.state.categoryItems.forEach(function(categoryItem){
      currentCategoryExpanded = categoryItem.expanded;
      if (categoryItem.category !== lastCategory){
        rows.push(<ObserveEntryCategory key={categoryItem.category}
                                        categoryItem={categoryItem}
                                        categoryItems={this.state.categoryItems}
                                        updateCategoryItems={this.updateCategoryItems} />);
      }

      if(currentCategoryExpanded) {
        var rowData = {
            strength: false,
            improvement: false,
            evidence: ""
        };
        this.props.strengthImprovements.forEach(function(data){
        if(data.strengthImprovementReference.id === categoryItem.id) {
          rowData.strength = data.strength;
          rowData.improvement = data.improvement;
          rowData.evidence = data.evidence;
          return false;
        }
        });

        rows.push(<ObserveEntryRow criteria={categoryItem.criteria}
                                   key={categoryItem.id}
                                   strength={rowData.strength}
                                   improvement={rowData.improvement}
                                   evidence={rowData.evidence} />);
      }

      lastCategory = categoryItem.category;
    }, this);

    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <table className="table table-striped table-bordered table-hover dataTables-example">
                <thead>
                  <tr>
                    <th width="35%">Criteria</th>
                    <th width="5%">Strengths</th>
                    <th width="5%">Areas for improvement</th>
                    <th width="55%">Evidence</th>
                  </tr>
                </thead>
                <tbody>
                  {rows}
                </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

class ObserveSummary extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="row">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Rating</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.ratingReference.rating} disabled /><br/>
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Summary Evaluation</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" value={this.props.observation.ratingSummary} disabled />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Additional Comments</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control" value={this.props.observation.additionalComments} disabled />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ObserveModerate extends Component{
  constructor(props){
    super(props)
  }

  render(){
    return(
      <div className="ibox-content">
          <div className="form-group">
            <div className="row m-b">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Has been moderated</label>
              <div className="col-sm-8">
                <input type="checkbox"
                    checked={this.props.observation.moderated}
                    disabled
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Moderator Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.moderator.firstName + ' ' + this.props.observation.moderator.lastName} disabled/>
              </div>
            </div>
            </div>

            <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Learning Coach Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.learningCoach.firstName + ' ' + this.props.observation.learningCoach.lastName} disabled/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Head of Department Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" value={this.props.observation.hod.firstName + ' ' + this.props.observation.hod.lastName} disabled/>
              </div>
            </div>
            </div>
          </div>
      </div>
    )
  }
}

class ObserveRecommendation extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
        <tr>
            <td>
                <input className="form-control"
                  type="text"
                  value={this.props.recommendation.focusArea}
                  disabled
                />
            </td>
            <td align="center">
                <input className="form-control"
                  type="checkbox"
                  checked={this.props.recommendation.strength}
                  disabled
                />
            </td>
            <td align="center">
                <input className="form-control"
                  type="checkbox"
                  checked={this.props.recommendation.improvement}
                  disabled
                />
            </td>
            <td>
                <textArea type="text"
                  maxLength={250}
                  placeholder="250 characters allowed"
                  className="form-control"
                  value={this.props.recommendation.recommendedAction}
                  disabled
                >
                </textArea>
            </td>
        </tr>
    );
  }
}

class ObserveRecommendations extends Component {
  constructor(props){
    super(props);
  }

  render() {
    var rows = [];
    if(this.props.recommendations.length === 0) {
      var recommendation = {
        focusArea: '',
        improvement: false,
        strength: false,
        recommendedAction: ''
      };
      rows.push(<ObserveRecommendation recommendation={recommendation} />);
    }
    else {
      this.props.recommendations.forEach(function(recommendation){
        rows.push(<ObserveRecommendation recommendation={recommendation} />);
      });
    }

    return (
        <div className="ibox-content">
          <div className="form-group">
            <div className="form-group">
              <table className="table table-striped table-bordered table-hover dataTables-example">
                  <thead>
                    <tr>
                      <th width='35%'>Focus Area</th>
                      <th width='5%'>Strength</th>
                      <th width='5%'>Improvement</th>
                      <th width='55%'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows}
                  </tbody>
              </table>
            </div>
          </div>
        </div>
    );
  }
}

class View extends Component {
  constructor(props){
    super(props);
    this.state = {
        observation: null,
        strengthImprovementReferences: null
    };
  }

  getDataObservation() {
      $.ajax({
          type: 'GET',
          url: "/api/observations/" + this.props.observationId + "/" + this.props.staff.id,
          success: function(response) {
            if (!response.success) {
              alert(response.result);
            } else if (response.result.access === 'view' || response.result.completed) {
              this.setState({observation: response.result});
            } else {
              this.props.redirectTo('edit', response.result);
            }
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }

  getDataStrengthImprovementReferences() {
      $.ajax({
          type: 'GET',
          url: "/api/strengthImprovementReferences",
          success: function(response) {
              this.setState({strengthImprovementReferences: response["_embedded"]["strengthImprovementReferences"]});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }

  componentWillMount() {
    this.getDataObservation();
    this.getDataStrengthImprovementReferences();
  }

  render() {
    var style = {
      paddingLeft: "55px"
    };

    if (this.state.observation != null && this.state.strengthImprovementReferences != null){
        return (
              <div className="wrapper-content animated fadeInRight">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                      <div className="ibox-title">
                          <h2>Observation {this.props.title}</h2>
                      </div>
                      <div className="ibox-content">
                        <form method="get" className="form-horizontal">
                          <ObserveHeader observation = {this.state.observation} />
                          <ObserveEntries strengthImprovements = {this.state.observation.strengthImprovements || []}
                                          categoryItems = {this.state.strengthImprovementReferences}/>
                          <ObserveSummary observation = {this.state.observation} />
                          <ObserveModerate observation = {this.state.observation} />
                          <ObserveRecommendations recommendations = {this.state.observation.observationRecommendations || []} />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
    } else {
        return <div>Loading...</div>
    }
  }
}

/*
var CATEGITEMS =
  [ {
      "id" : 1,
      "category" : "Learner-centred teaching enables all learners to achieve",
      "criteria" : "Learning strategies cater for the needs of the learners",
    },{
      "id" : 2,
      "category" : "Learner-centred teaching enables all learners to achieve",
      "criteria" : "Learning activities are varied and interesting",
  },{
      "id" : 3,
      "category" : "Learner-centred teaching enables all learners to achieve",
      "criteria" : "Learning time is managed effectively",
  },{
      "id" : 4,
      "category" : "Learner-centred teaching enables all learners to achieve",
      "criteria" : "Questioning techniques progress learning",
  },{
      "id" : 5,
      "category" : "Learning environments ensure participation and engagement",
      "criteria" : "Learning environment is positive and respectful",
  },{
      "id" : 6,
      "category" : "Learning environments ensure participation and engagement",
      "criteria" : "Instructions, explanations and expectations are clear",
  },{
      "id" : 7,
      "category" : "Learning environments ensure participation and engagement",
      "criteria" : "Learning environment is well organised",
  },{
      "id" : 8,
      "category" : "Learning environments ensure participation and engagement",
      "criteria" : "Variety of interactive and independent activity",
  },{
      "id" : 9,
      "category" : "Learning environments ensure participation and engagement",
      "criteria" : "Good use of learning technologies",
  }];

var RATING = [
  {
    "id" : 1,
    "rating" : "Excellent"
  },
  {
    "id" : 2,
    "rating" : "Good"
  },
  {
    "id" : 3,
    "rating" : "Requires Improvement"
  },
  {
    "id" : 4,
    "rating" : "Requires Intervention and Support"
  }
];

var OBSERVATION =
      {
        "id" : 1,
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
        "staff": {
          "id": "1",
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "hod": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "learningCoach": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "lineManager": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "observerPrimary": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "moderator": {
          "department": "Department of Computing",
          "email": "Richard.Smith1@ara.ac.nz",
          "firstName": "Richard",
          "lastName": "Smith1",
          "location": null,
          "officePhone": "1984432418",
          "username": "Smith1R"
        },
        "observerSecondary": {
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
              "improvement": "true",
              "strength": "false",
              "evidence": "test1",
              "strImpRef": {
                "category": "Learner-centred teaching enables all learners to achieve",
                "criteria": "Learning strategies cater for the needs of the learners"
              }
            },
            {
              "improvement": "false",
              "strength": "true",
              "evidence": "test2",
              "strImpRef": {
                "category": "Learner-centred teaching enables all learners to achieve",
                "criteria": "Learning activities are varied and interesting"
              }
            }
        ],
        "ratingReference": {
          "rating": "Excellent"
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
            "href": "http://localhost:8080/api/observations/1/strengthImprovements"
          },
          "lineManager": {
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
          },
          "observerPrimary": {
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
          },
          "moderator": {
            "href": "http://localhost:8080/api/observations/1/moderator"
          },
          "observerSecondary": {
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
          },
          "ratingReference": {
            "href": "http://localhost:8080/api/observations/1/ratingReference"
          },
          "staff": {
            "href": "http://localhost:8080/api/observations/1/staff"
          }
        }
      };
*/

export default View;