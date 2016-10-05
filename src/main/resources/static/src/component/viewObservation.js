import React, { Component } from 'react';

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
    var forCheckbox = {marginTop: "11px"};
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                  <label className="col-sm-4 control-label">Teacher's Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control m-b" value={this.props.staff.firstName + ' ' + this.props.staff.lastName || init} disabled/>
                  </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                  <label className="col-sm-4 control-label">Line Manager's Name</label>
                  <div className="col-sm-8">
                    <input type="text" className="form-control m-b" value={this.props.lineManager.firstName + ' ' + this.props.lineManager.lastName || init} disabled/>
                  </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Lead Observer's Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observerPrimary.firstName + ' ' + this.props.observerPrimary.lastName || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Time of Observation</label>
                <div className="col-sm-4">
                  <input
                      {...this.props.mode}
                      type="text"
                      disabled
                      value={this.props.observation.time.substring(0,5) || init}
                      className="form-control m-b"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Peer Observer's Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observerSecondary.firstName + ' ' + this.props.observerSecondary.lastName || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
                <div className="row">
                  <label className="col-sm-4 control-label">Date</label>
                  <div className="col-sm-4">
                    <input
                        {...this.props.mode}
                        type="text"
                        disabled
                        value={moment(this.props.observation.date).format('DD/MM/YYYY') || init}
                        className="form-control m-b"
                    />
                  </div>
                </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Qualification</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.programme || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">No of learners on register</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.registeredLearners || init} disabled/>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Course Code</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.courseCode || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">No of learners at start</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.startLearners || init} disabled/>
                </div>
              </div>
            </div>
           </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Course Title</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.courseName || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">No of learners late</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.lateLearners || init} disabled/>
                </div>
              </div>
            </div>
           </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Level</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.courseLevel || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Total no. of learners in session</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.totalLearners || init} disabled/>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Course Credits</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.observation.programmeLevel || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Department</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.departmentRef.department || init} disabled/>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Campus Location</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.locationRef.campus || init} disabled/>
                </div>
              </div>
            </div>
            <div className="col-sm-6">
              <div className="row">
                <label className="col-sm-4 control-label">Session Type</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.sessionRef.session || init} disabled/>
                </div>
              </div>
            </div>

          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="row">
                <label className="col-sm-2 control-label">Context of Session (include stage in programme)</label>
                <div className="col-sm-10">
                  <textarea type="text" style={{width: "100%", height: "70px"}} className="form-control m-b" value={this.props.observation.sessionContext || init} disabled/>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="row">
                <label className="col-sm-8 control-label">Lesson Plan</label>
                <div className="col-sm-4">
                  <input
                    type="checkbox"
                    style={forCheckbox}
                    checked={this.props.observation.lessonPlan || init}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="row">
                <label className="col-sm-2 control-label">Comments</label>
                <div className="col-sm-10">
                  <textarea
                      type="text"
                      className="form-control m-b"
                      value={this.props.observation.lessonPlanComment || init}
                      disabled
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-3">
              <div className="row">
                <label className="col-sm-8 control-label">Course Outline</label>
                <div className="col-sm-4">
                  <input
                    type="checkbox"
                    style={forCheckbox}
                    checked={this.props.observation.courseOutline || init}
                    disabled
                  />
                </div>
              </div>
            </div>
            <div className="col-sm-9">
              <div className="row">
                <label className="col-sm-2 control-label">Comments</label>
                <div className="col-sm-10">
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

          <div className="row">
            <div className="row">
              <div className="col-sm-12">
                <label className="col-sm-2 control-label">Observation Notes</label>
                <div className="col-sm-10">
                  <textarea type="text" style={{width: "100%", height:"500px"}} className="form-control m-b" value={this.props.observation.notes || init} disabled/>
                </div>
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
                    <th width="40%">Criteria</th>
                    <th width="5%">Strengths</th>
                    <th width="5%">Areas for improvement</th>
                    <th width="50%">Evidence</th>
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
                <input type="text" className="form-control m-b" value={this.props.ratingReference.rating} disabled /><br/>
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Summary Evaluation</label>
              <div className="col-sm-8">
                <textarea type="text" style={{width: "100%", height:"150px"}} className="form-control m-b" value={this.props.observation.ratingSummary} disabled />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Additional Comments</label>
              <div className="col-sm-8">
                <textarea type="text" style={{width: "100%", height:"150px"}} className="form-control" value={this.props.observation.additionalComments} disabled />
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
    var forCheckbox = {marginTop: "11px"};
    return(
      <div className="ibox-content">
          <div className="form-group">
            <div className="row m-b">
              <div className="col-sm-6">
                <label className="col-sm-4 control-label">Moderator Feedback Provided</label>
                <div className="col-sm-8">
                  <input type="checkbox"
                      style={forCheckbox}
                      checked={this.props.observation.moderated}
                      disabled
                  />
                </div>
              </div>
              <div className="col-sm-6">
                <label className="col-sm-4 control-label">Moderator Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.moderator.firstName + ' ' + this.props.moderator.lastName} disabled/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="col-sm-4 control-label">Learning Coach Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.learningCoach.firstName + ' ' + this.props.learningCoach.lastName} disabled/>
                </div>
              </div>
              <div className="col-sm-6">
                <label className="col-sm-4 control-label">Head of Department Name</label>
                <div className="col-sm-8">
                  <input type="text" className="form-control m-b" value={this.props.hod.firstName + ' ' + this.props.hod.lastName} disabled/>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-sm-6">
                <label className="col-sm-4 control-label">Record Updated with Moderator Feedback</label>
                <div className="col-sm-8">
                  <input style={forCheckbox} type="checkbox" checked={this.props.appliedFeedback} disabled/>
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
                      <th width='40%'>Focus Area</th>
                      <th width='5%'>Strength</th>
                      <th width='5%'>Improvement</th>
                      <th width='50%'>Recommended Action</th>
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

class ViewObservation extends Component {
  constructor(props){
    super(props);
    this.state = {
        observation: null,
        strengthImprovementReferences: null,
        isViewAccess: false,
        emailNotification:null
    };
  }

  getDataObservation() {
      $.ajax({
          type: 'GET',
          url: "/api/observations/" + this.props.observationId + "/" + this.props.staff.id,
          success: function(response) {
            if (!response.success) {
              this.props.redirectTo('observationSearch', response.result);
            } else if (response.result.access === 'view') {
              this.setState({
                observation: response.result,
                isViewAccess: true
              });
            } else if(response.result.completed) {
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
              this.setState({strengthImprovementReferences: response});
          }.bind(this),
          error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
          }.bind(this)
      });
  }

  handlePrint() {
    $.ajax({
        type: 'GET',
        url: "/api/observations/print?userId=" + this.props.staff.id + "&observationId=" + this.props.observationId,
        success: function(data) {
            // decode base64 string
            var binary = atob(data);
            // create ArrayBuffer with binary length
            var buffer = new ArrayBuffer(binary.length);
            // create 8-bit Array
            var view = new Uint8Array(buffer);
            // save unicode of binary data into 8-bit Array
            for (var i = 0; i < binary.length; i++) {
                view[i] = binary.charCodeAt(i);
            }
            // create pdf blob file
            var blob = new Blob([view], {type: "application/pdf"});
            // create object URL
            var url = URL.createObjectURL(blob);
            // construct the viewer and open it in new tab
            var viewerUrl = "/viewer?file=" + encodeURIComponent(url);
            window.open(viewerUrl, "_blank");
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });

    e.preventDefault();
  }

  handleEmail() {
      $.ajax({
          type: 'GET',
          url: "/api/observations/send?userId=" + this.props.staff.id + "&observationId=" + this.props.observationId,
          success: function(response) {
              this.setState({emailNotification: response});
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
    var printEmailStyle= {
      cursor: 'pointer'
    };
    var printEmailButtons = null;
    if(!this.state.isViewAccess) {
      printEmailButtons = (
        <div className="print-email-btn">
          <i className="fa fa-envelope fa-lg" aria-hidden="true" style={printEmailStyle} onClick={this.handleEmail.bind(this)}></i>&nbsp;&nbsp;
          <i className="fa fa-print fa-lg" aria-hidden="true" style={printEmailStyle} onClick={this.handlePrint.bind(this)}></i>
        </div>
      );
    }

    var emailMessage = null;
    if(this.state.emailNotification != null) {
        if(this.state.emailNotification.success) {
            emailMessage = (
                <div className="alert alert-success">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    {this.state.emailNotification.message}
                </div>
            );
        }
        else {
            emailMessage = (
                <div className="alert alert-danger">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    {this.state.emailNotification.message}
                </div>
            );
        }
    }

    if (this.state.observation != null && this.state.strengthImprovementReferences != null){
        return (
              <div className="wrapper-content animated fadeInRight">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                      {emailMessage}
                      <div className="ibox-title">
                        <h2>Observation Record - {this.props.title}</h2>
                      </div>
                      <div className="ibox-content">
                        {printEmailButtons}
                        <form method="get" className="form-horizontal">
                          <ObserveHeader observation = {this.state.observation}
                            staff = {this.state.observation.staff || {firstName: '', lastName: ''}}
                            lineManager = {this.state.observation.lineManager || {firstName: '', lastName: ''}}
                            observerPrimary = {this.state.observation.observerPrimary || {firstName: '', lastName: ''}}
                            observerSecondary = {this.state.observation.observerSecondary || {firstName: '', lastName: ''}}
                            departmentRef = {this.state.observation.department || {department: ''}}
                            sessionRef = {this.state.observation.session || {session: ''}}
                            locationRef = {this.state.observation.location || {location: ''}}
                          />
                          <ObserveEntries strengthImprovements = {this.state.observation.strengthImprovements || []}
                            categoryItems = {this.state.strengthImprovementReferences}/>
                          <ObserveSummary observation = {this.state.observation}
                            ratingReference = {this.state.observation.ratingReference || {rating: ''}}/>
                          <ObserveModerate observation = {this.state.observation}
                            moderator = {this.state.observation.moderator || {firstName: '', lastName: ''}}
                            learningCoach = {this.state.observation.learningCoach || {firstName: '', lastName: ''}}
                            hod = {this.state.observation.hod || {firstName: '', lastName: ''}}
                          />
                          <ObserveRecommendations recommendations = {this.state.observation.observationRecommendations || []} />
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
    } else {
        return (
           <div className="wrapper-content" style={{textAlign: 'center'}}>
             <i className="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
             <span className="sr-only">Loading...</span>
           </div>
        );
    }
  }
}

export default ViewObservation;