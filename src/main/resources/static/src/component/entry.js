import React, { Component } from 'react'

class ObserveHeader extends Component{
  constructor(props){
    super(props);
    this.state = {
        staffId: props.observation.staffId || '',
        lineManagerId: props.observation.lineManagerId || '',
        observerPrimaryId: props.observation.observerPrimaryId || '',
        observerSecondaryId: props.observation.observerSecondaryId || '',
        courseName: props.observation.courseName || '',
        courseLevel: props.observation.courseLevel || '',
        programme: props.observation.programme || '',
        programmeLevel: props.observation.programmeLevel || '',
        registeredLearners: props.observation.registeredLearners || '' ,
        startLearners: props.observation.startLearners || '' ,
        lateLearners: props.observation.lateLearners ||'' ,
        totalLearners: props.observation.totalLearners || '' ,
        location: props.observation.location || '',
        department: props.observation.department || '',
        sessionContext: props.observation.sessionContext || '',
        notes: props.observation.notes || ''
    }
    console.log('ObserveHeader mode: '+ this.props.mode);
  }

  handleTeacherNameChange(e){
    var newState = Object.assign(this.state, {staffId: e.target.value});
    this.setState({staffId: e.target.value})
    this.props.updateObservation(newState);
  }

  handleManagerNameChange(e){
    var newState = Object.assign(this.state, {lineManagerId: e.target.value});
    this.setState({lineManagerId: e.target.value})
    this.props.updateObservation(newState);
  }

  handlePrimaryObserverNameChange(e){
    var newState = Object.assign(this.state, {observerPrimaryId: e.target.value});
    this.setState({observerPrimaryId: e.target.value})
    this.props.updateObservation(newState);
  }

  handleSecondObserverNameChange(e){
    var newState = Object.assign(this.state, {observerSecondaryId: e.target.value});
    this.setState({observerSecondaryId: e.target.value})
    this.props.updateObservation(newState);
  }

  handleCourseChange(e){
    var newState = Object.assign(this.state, {courseName: e.target.value});
    this.setState({courseName: e.target.value})
    this.props.updateObservation(newState);
  }

  handleProgrammeChange(e){
    var newState = Object.assign(this.state, {programme: e.target.value});
    this.setState({programme: e.target.value})
    this.props.updateObservation(newState);
  }

  handleNumLearnerOnRegisterChange (e){
    var newState = Object.assign(this.state, {registeredLearners: e.target.value});
    this.setState({registeredLearners: e.target.value})
    this.props.updateObservation(newState);
  }

  handleNumLearnerAtStartChange (e){
    var newState = Object.assign(this.state, {startLearners: e.target.value});
    this.setState({startLearners: e.target.value})
    this.props.updateObservation(newState);
  }

  handleNumLearnerLateChange(e){
    var newState = Object.assign(this.state, {lateLearners: e.target.value});
    this.setState({lateLearners: e.target.value})
    this.props.updateObservation(newState);
  }

  handleTotalLearnerChange(e){
    var newState = Object.assign(this.state, {totalLearners: e.target.value});
    this.setState({totalLearners: e.target.value})
    this.props.updateObservation(newState);
  }

  handleCampusChange(e){
    var newState = Object.assign(this.state, {location: e.target.value});
    this.setState({location: e.target.value})
    this.props.updateObservation(newState);
  }

  handleDepartmentChange(e){
    var newState = Object.assign(this.state, {department: e.target.value});
    this.setState({department: e.target.value})
    this.props.updateObservation(newState);
  }

  handleContextSessionChange(e){
    var newState = Object.assign(this.state, {sessionContext: e.target.value});
    this.setState({sessionContext: e.target.value})
    this.props.updateObservation(newState);
  }

  handleNotesSessionChange(e){
    var newState = Object.assign(this.state, {notes: e.target.value});
    this.setState({notes: e.target.value})
    this.props.updateObservation(newState);
  }

  handleCourseLevelChange(e){
    var newState = Object.assign(this.state, {courseLevel: e.target.value});
    this.setState({courseLevel: e.target.value})
    this.props.updateObservation(newState);
  }

  handleProgrammeLevelChange(e){
    var newState = Object.assign(this.state, {programmeLevel: e.target.value});
    this.setState({programmeLevel: e.target.value})
    this.props.updateObservation(newState);
  }

  componentDidMount() {
    $('#teacher').select2({placeholder: "Please Select"});
    $('#teacher').on('change', this.handleTeacherNameChange.bind(this));

    $('#lineManager').select2({placeholder: "Please Select"});
    $('#lineManager').on('change', this.handleManagerNameChange.bind(this));

    $('#observerPrimary').select2({placeholder: "Please Select"});
    $('#observerPrimary').on('change', this.handlePrimaryObserverNameChange.bind(this));

    $('#observerSecondary').select2({placeholder: "Please Select"});
    $('#observerSecondary').on('change', this.handleSecondObserverNameChange.bind(this));
  }

  populateStaff2(){
    var fullName='';
    var rows = [];
    var lastIndex = 0
    this.props.staffs.forEach(function(staff){
      fullName = staff.firstName + ' ' + staff.lastName;
      rows.push(<option value={staff.id}>{fullName}</option>);
    })
    return rows
  }

  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Teacher's Name</label>
              <div className="col-sm-8">
                <select id="teacher" className="form-control m-b" value={this.state.staffId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Line Manager's Name</label>
              <div className="col-sm-8">
                <select id="lineManager" className="form-control m-b" value={this.state.lineManagerId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Primary Observer's Name</label>
              <div className="col-sm-8">
                <select id="observerPrimary" className="form-control m-b" value={this.state.observerPrimaryId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Secondary Observer's Name</label>
              <div className="col-sm-8">
                <select id="observerSecondary" className="form-control m-b" value={this.state.observerSecondaryId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course </label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="text"
                    placeholder="100 characters allowed"
                    maxLength={100}
                    className="form-control m-b"
                    value={this.state.courseName}
                    onChange={this.handleCourseChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Programme</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="text"
                    placeholder="100 characters allowed"
                    maxLength={100}
                    className="form-control m-b"
                    value={this.state.programme}
                    onChange={this.handleProgrammeChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course Level </label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="number"
                    min={0}
                    max={99}
                    placeholder="Max value is 99"
                    className="form-control m-b"
                    value={this.state.courseLevel}
                    onChange={this.handleCourseLevelChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Programme Level</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="number"
                    min={0}
                    max={99}
                    placeholder="Max value is 99"
                    className="form-control m-b"
                    value={this.state.programmeLevel}
                    onChange={this.handleProgrammeLevelChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners on register</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="number"
                    min={0}
                    max={999}
                    placeholder="Max value is 999"
                    className="form-control m-b"
                    value={this.state.registeredLearners}
                    onChange={this.handleNumLearnerOnRegisterChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners at start</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="number"
                    min={0}
                    max={999}
                    placeholder="Max value is 999"
                    className="form-control m-b"
                    value={this.state.startLearners}
                    onChange={this.handleNumLearnerAtStartChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners late</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="number"
                    min={0}
                    max={999}
                    placeholder="Max value is 999"
                    className="form-control m-b"
                    value={this.state.lateLearners}
                    onChange={this.handleNumLearnerLateChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Total no. of learners in session</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="number"
                    min={0}
                    max={999}
                    placeholder="Max value is 999"
                    className="form-control m-b"
                    value={this.state.totalLearners}
                    onChange={this.handleTotalLearnerChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Campus Location</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="text"
                    placeholder="50 characters allowed"
                    maxLength={50}
                    className="form-control m-b"
                    value={this.state.location}
                    onChange={this.handleCampusChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Department</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="text"
                    placeholder="50 characters allowed"
                    maxLength={50}
                    className="form-control m-b"
                    value={this.state.department}
                    onChange={this.handleDepartmentChange.bind(this)}
                />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Context of Session (include stage in programme)</label>
              <div className="col-sm-8">
                <textarea
                    {...this.props.mode}
                    maxLength={250}
                    placeholder="250 characters allowed"
                    type="text"
                    className="form-control m-b"
                    value={this.state.sessionContext}
                    onChange={this.handleContextSessionChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Observation Notes</label>
              <div className="col-sm-8">
                <textarea
                    {...this.props.mode}
                    type="text"
                    maxLength={1000}
                    placeholder="1000 characters allowed"
                    className="form-control m-b"
                    value={this.state.notes}
                    onChange={this.handleNotesSessionChange.bind(this)}
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
    this.state = {
      categoryItem: props.categitem || {}
    }
  }

  handleStrengthChange(e) {
    var newState = Object.assign(this.state.categoryItem, {strength: e.target.value});
    this.setState({categoryItem: newState});
    this.props.updateObservation({strengthImprovements: this.updateStrengthImprovements(newState)});
  }

  handleImprovementChange(e) {
    var newState = Object.assign(this.state.categoryItem, {improvement: e.target.value});
    this.setState({categoryItem: newState});
    this.props.updateObservation({strengthImprovements: this.updateStrengthImprovements(newState)});
  }

  handleEvidenceChange(e) {
    var newState = Object.assign(this.state.categoryItem, {evidence: e.target.value});
    this.setState({categoryItem: newState});
    this.props.updateObservation({strengthImprovements: this.updateStrengthImprovements(newState)});
  }

  updateStrengthImprovements(strengthImprovement) {
    var newStrengthImprovements = Object.assign([], this.props.strengthImprovements);
    var count = 1;
    
    if (newStrengthImprovements.length > 0) {
      newStrengthImprovements.forEach(function(item, index) {
        if (item.strengthImprovementReferenceId === strengthImprovement.strengthImprovementReferenceId) {
          newStrengthImprovements[index] = strengthImprovement;
        } else {
          count++;
        }
      });
    }else {
      newStrengthImprovements.push(strengthImprovement)
    }

    if (count != newStrengthImprovements.length ) {
      newStrengthImprovements.push(strengthImprovement)
    }
    return newStrengthImprovements;
  }


  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group" style={{ paddingLeft: "25px" }}>{this.props.criteria}</div>
          <div className="form-group">
            <div className="col-sm-3">
              <label className="col-sm-6 control-label">Strengths</label>
              <div className="col-sm-6">
                <select {...this.props.mode}
                  className="form-control m-b"
                  value={this.state.categoryItem.strength || false}
                  onChange={this.handleStrengthChange.bind(this)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="col-sm-6 control-label">Improvement</label>
              <div className="col-sm-6">
                <select {...this.props.mode}
                  className="form-control m-b"
                  value={this.state.categoryItem.improvement || false}
                  onChange={this.handleImprovementChange.bind(this)}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-2 control-label">Evidence</label>
              <div className="col-sm-10">
                <textarea {...this.props.mode} type="text"
                  maxLength={250}
                  placeholder="250 characters allowed"
                  className="form-control m-b"
                  value={this.state.categoryItem.evidence || ''}
                  onChange={this.handleEvidenceChange.bind(this)}
                >
                </textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ObserveEntryCategory extends Component{
  render(){
    return(
      <div className="ibox-title">
        <h5>{this.props.category}</h5>
      </div>
    )
  }
}

class ObserveEntries extends Component{

  render(){
    var rows = [];
    var lastCategory = null;
    var found = {};
    var temp = [];
    //var listStrengthImprovements = this.props.strengthImprovements || this.props.categitems;
    this.props.categitems.forEach(function(categitem, index){
      if (categitem.category !== lastCategory){
        rows.push(<ObserveEntryCategory category={categitem.category} key={categitem.category} />);
      }

      this.props.strengthImprovements.forEach(function(item){
        if (item.strengthImprovementReferenceId == categitem.id){
          found = item;
        } 
      })

      var rowsdata = {
        id: found.id || "",
        strength:  found.strength || false,
        improvement: found.improvement || false,
        evidence: found.evidence || "",
        strengthImprovementReferenceId: found.strengthImprovementReferenceId || categitem.id
      };

      rows.push(<ObserveEntryRow 
                  categitem={rowsdata} 
                  key={categitem.criteria} 
                  criteria={categitem.criteria} 
                  mode={this.props.mode} 
                  updateObservation={this.props.updateObservation} 
                  strengthImprovements={this.props.strengthImprovements || []}
                />);
      lastCategory = categitem.category;
    }, this)

    return(
      <div className="ibox-content">
        {rows}
      </div>
    )
  }
}

class ObserveSumarry extends Component{
  constructor(props){
    super(props);
    this.state = {
        ratingReferenceId: props.ratingReferenceId || '',
        ratingSummary: props.ratingSummary || '',
        strengthsShare: props.strengthsShare || '',
        additionalComments: props.additionalComments || ''
    }
  }

  handleRatingReferenceIdChange(e){
    var newState = Object.assign(this.state, {ratingReferenceId: e.target.value});
    this.setState({ratingReferenceId: e.target.value})
    this.props.updateObservation(newState);
  }

  handleRatingSummaryChange(e){
    var newState = Object.assign(this.state, {ratingSummary: e.target.value});
    this.setState({ratingSummary: e.target.value})
    this.props.updateObservation(newState);
  }

  handleStrengthsShareChange(e){
    var newState = Object.assign(this.state, {strengthsShare: e.target.value});
    this.setState({strengthsShare: e.target.value})
    this.props.updateObservation(newState);
  }

  handleAdditionalCommentsChange(e){
    var newState = Object.assign(this.state, {additionalComments: e.target.value});
    this.setState({additionalComments: e.target.value})
    this.props.updateObservation(newState);
  }

  populateRatingReferences(key){
    var ratingRef='';
    var rows = []
    rows.push(<option value={''} selected>Please Select</option>);
    this.props.ratingReferences.forEach(function(ratingReference){
        if(ratingReference.id === key){
            rows.push(<option value={ratingReference.id} selected>{ratingReference.rating}</option>);
        }else{
            rows.push(<option value={ratingReference.id}>{ratingReference.rating}</option>);
        }
    })
    return rows
  }

  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Rating</label>
              <div className="col-sm-8">
                <select className="form-control m-b" onChange={this.handleRatingReferenceIdChange.bind(this)} >
                    {this.populateRatingReferences(this.state.ratingReferenceId)}
                </select>
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Summary Evaluation</label>
              <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control m-b"
                    maxLength={250}
                    placeholder="250 characters allowed"
                    onChange={this.handleRatingSummaryChange.bind(this)}
                    value={this.state.ratingSummary}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Identified strengths for sharing</label>
              <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control m-b"
                    maxLength={250}
                    placeholder="250 characters allowed"
                    onChange={this.handleStrengthsShareChange.bind(this)}
                    value={this.state.strengthsShare}
                />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Additional Comments</label>
              <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control m-b"
                    maxLength={250}
                    placeholder="250 characters allowed"
                    onChange={this.handleAdditionalCommentsChange.bind(this)}
                    value={this.state.additionalComments}
                />
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
    super(props);
    this.state = {
        moderated: props.moderated || false,
        moderatorId: props.moderatorId || '',
        learningCoachId: props.learningCoachId || '',
        hodId: props.hodId || ''
    }
  }

  handleModeratedChange(e){
    var newState = Object.assign(this.state, {moderated: e.target.value});
    this.setState({moderated: e.target.value})
    this.props.updateObservation(newState);
  }

  handleModeratorIdChange(e){
    var newState = Object.assign(this.state, {moderatorId: e.target.value});
    this.setState({moderatorId: e.target.value})
    this.props.updateObservation(newState);
  }

  handleLearningCoachIdChange(e){
    var newState = Object.assign(this.state, {learningCoachId: e.target.value});
    this.setState({learningCoachId: e.target.value})
    this.props.updateObservation(newState);
  }

  handleHodIdChange(e){
    var newState = Object.assign(this.state, {hodId: e.target.value});
    this.setState({hodId: e.target.value})
    this.props.updateObservation(newState);
  }

  componentDidMount() {
    $('#moderator').select2({placeholder: "Please Select"});
    $('#moderator').on('change', this.handleModeratorIdChange.bind(this));

    $('#coach').select2({
        placeholder: "Please Select"}
    );
    $('#coach').on('change', this.handleLearningCoachIdChange.bind(this));

    $('#hod').select2({placeholder: "Please Select"});
    $('#hod').on('change', this.handleHodIdChange.bind(this));
  }

  populateStaff2(){
    var fullName='';
    var rows = [];
    var lastIndex = 0
    this.props.staffs.forEach(function(staff){
      fullName = staff.firstName + ' ' + staff.lastName;
      rows.push(<option value={staff.id}>{fullName}</option>);
    })
    return rows
  }

  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Has been moderated</label>
              <div className="col-sm-8">
                <select {...this.props.mode} className="form-control m-b" onChange={this.handleModeratedChange.bind(this)}>
                  <option value={false}>No</option>
                  <option value={true} >Yes</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Moderator Name</label>
              <div className="col-sm-8">
                <select id="moderator" className="form-control m-b" value={this.state.moderatorId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Learning Coach Name</label>
              <div className="col-sm-8">
                <select id="coach" className="form-control m-b" value={this.state.learningCoachId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Head of Department Name</label>
              <div className="col-sm-8">
                <select id="hod" className="form-control m-b" value={this.state.hodId}>
                  <option></option>
                  {this.populateStaff2()}
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}


class Entry extends Component {
  constructor(props){
    super(props)
    this.state = {
      observationData: props.observation || {},
      staffs:[],
      ratingReferences:[],
      strengthImprovementReferences:[]
    };

    this.updateObservation = this.updateObservation.bind(this);
  }


  updateObservation(observation){
    var newObservation = Object.assign(this.state.observationData, observation)
    this.setState({observationData: newObservation});
  }

  getStaffRecords(){
    $.ajax({
        type: 'GET',
        url: "/api/staffs",
        success: function(response) {
            this.setState({staffs: response["_embedded"]["staffs"]});
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
    });
  }

  getRatingReferencesRecords(){
      $.ajax({
          type: 'GET',
          url: "/api/ratingReferences",
          success: function(response) {
              this.setState({ratingReferences: response["_embedded"]["ratingReferences"]});
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

  componentWillMount(){
    this.getStaffRecords();
    this.getRatingReferencesRecords();
    this.getDataStrengthImprovementReferences();
  }

  handleSubmit(){
    var date = new Date();
    var observation = Object.assign({}, this.state.observationData, {
        date: date.toISOString().slice(0,10),
        time: (date.toLocaleTimeString().slice(0,8)).trim()
    })
    if (this.props.title === 'Create') {
      this.createMethod(observation);
    } else if (this.props.title === 'Edit') {
      this.updateMethod(observation)
    }
  }
  createMethod(observation) {
    console.log('Creating data')
    var data = JSON.stringify(observation);
    console.log(data);
     $.ajax({
        type: 'POST',
        url: "/api/observations",
        contentType: "application/json",
        data: data,
        success: function(response) {
           console.log(response); 
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
     });
    this.props.redirectTo('entry');

  }
  updateMethod(observation) {
    console.log('Updating data')

    // Before use JSON.stringify remove key that isn't necessary to update
    // Make a constant array of key that unnecessary like
    var removeKey = ["_links", "staff", "hod", "learningCoach", "lineManager", "observerPrimary", "moderator", "observerSecondary", "ratingReference","page"]

    removeKey.forEach(function(value){
      delete observation[value];
    })
    var data = JSON.stringify(observation);
    console.log(data);
    $.ajax({
        type: 'PUT',
        url: "/api/observations",
        contentType: "application/json",
        data: data,
        success: function(response) {
           console.log(response)
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
     });

    this.props.redirectTo('observationSearch');
  }


  render() {
    var mode = this.props.title === 'Create' ? 'Create':'Edit';
    var style = {
      paddingLeft: "55px"
    }
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-title">
                  <h5>Observation {this.props.title}</h5>
              </div>
              <div className="ibox-content">
                <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                  <ObserveHeader
                    observation={this.state.observationData}
                    mode={mode}
                    disabled='true'
                    updateObservation={this.updateObservation}
                    staffs={this.state.staffs}
                  />

                  <ObserveEntries
                    categitems={this.state.strengthImprovementReferences}
                    strengthImprovements={this.state.observationData.strengthImprovements || []}
                    mode={mode}
                    updateObservation={this.updateObservation}
                  />

                  <ObserveSumarry
                    mode={mode}
                    updateObservation={this.updateObservation}
                    ratingSummary={this.state.observationData.ratingSummary}
                    strengthsShare={this.state.observationData.strengthsShare}
                    additionalComments={this.state.observationData.additionalComments}
                    ratingReferenceId={this.state.observationData.ratingReferenceId}
                    ratingReferences={this.state.ratingReferences}
                  />
                  <ObserveModerate
                    mode={mode}
                    updateObservation={this.updateObservation}
                    learningCoachId={this.state.observationData.learningCoachId}
                    moderatorId={this.state.observationData.moderatorId}
                    hodId={this.state.observationData.hodId}
                    staffs={this.state.staffs}
                  />

                  <div className="ibox-content">
                    <div className="form-group">
                      <div className="col-sm-4 col-sm-offset-9">
                        <button 
                          {...this.props.mode} 
                          className="btn btn-white" 
                          type="submit">Cancel
                        </button>
                        <button 
                          {...this.props.mode} 
                          className="btn btn-primary" 
                          type="submit"
                          value="post">Save changes</button>
                      </div>
                    </div>
                  </div>

                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// Just Dummy DATA

var REFERENCES = [
  { "ratingReferenceId" : "1", "rating": "A" },
  { "ratingReferenceId" : "2", "rating": "B" },
  { "ratingReferenceId" : "3", "rating": "C" },
  { "ratingReferenceId" : "4", "rating": "D" },
  { "ratingReferenceId" : "5", "rating": "E" },
]

var STAFFS = [
  { "staffId" : '1', "firstName": "can", "lastName": "ndhie" },
  { "staffId" : '2', "firstName": "khai", "lastName": "rul" },
  { "staffId" : '3', "firstName": "ikh", "lastName": "wan" },
  { "staffId" : '4', "firstName": "candhie", "lastName": "khairul" },
  { "staffId" : '5', "firstName": "khairul", "lastName": "ikhwan" },
  { "staffId" : '6', "firstName": "ikhwan", "lastName": "candhie" },
]


export default Entry;