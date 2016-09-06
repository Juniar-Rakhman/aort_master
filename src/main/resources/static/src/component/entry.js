import React, { Component } from 'react';
import moment from 'moment';

class ObserveHeader extends Component{
  constructor(props){
    super(props);
    var observerPrimary = props.mode === 'Create' ? props.staff : props.observation.observerPrimary;
    var date = moment().format('YYYY-MM-DD');
    var time = moment().format('HH:mm');
    this.state = {
        date: props.observation.date || date,
        time: props.observation.time || time,
        staffId: props.observation.staffId || '',
        lineManagerId: props.observation.lineManagerId || '',
        observerPrimaryId: observerPrimary.id || '',
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
        notes: props.observation.notes || '',
        courseCode: props.observation.courseCode || '',
        lessonPlan: props.observation.lessonPlan || '',
        courseOutline: props.observation.courseOutline || '',
        lessonPlanComment: props.observation.lessonPlanComment || '',
        courseOutlineComment: props.observation.courseOutlineComment || '',
        staff: props.observation.staff || {firstName:'', lastName:''},
        lineManager: props.observation.lineManager || {firstName:'', lastName:''},
        observerPrimary: observerPrimary || {firstName:'', lastName:''},
        observerSecondary: props.observation.observerSecondary || {firstName:'', lastName:''}
    }
    console.log('ObserveHeader mode: '+ this.props.mode);
  }

  handleDateChange(e){
    var newState = Object.assign(this.state, {date: e.target.childNodes[0].value});
    this.setState({date: e.target.childNodes[0].value});
    this.props.updateObservation(newState);
  }

  handleTimeChange(e){
    var newState = Object.assign(this.state, {time: e.target.childNodes[0].value});
    this.setState({time: e.target.childNodes[0].value});
    this.props.updateObservation(newState);
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

  handleCourseCodeChange(e){
    var newState = Object.assign(this.state, {courseCode: e.target.value});
    this.setState({courseCode: e.target.value})
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

  handleLessonPlanChange(e){
    var newState = Object.assign(this.state, {lessonPlan: e.target.checked});
    this.setState({lessonPlan: e.target.checked})
    this.props.updateObservation(newState);
  }

  handleLessonPlanCommentChange(e){
    var newState = Object.assign(this.state, {lessonPlanComment: e.target.value});
    this.setState({lessonPlanComment: e.target.value})
    this.props.updateObservation(newState);
  }

  handleCourseOutlineChange(e){
    var newState = Object.assign(this.state, {courseOutline: e.target.checked});
    this.setState({courseOutline: e.target.checked})
    this.props.updateObservation(newState);
  }

  handleCourseOutlineCommentChange(e){
    var newState = Object.assign(this.state, {courseOutlineComment: e.target.value});
    this.setState({courseOutlineComment: e.target.value})
    this.props.updateObservation(newState);
  }

  componentDidMount() {
    var configs =
       {
        ajax: {
          url: 'api/staffs/search/findByStaffName',
          data: function(params){
              return {
                  name: params.term
              }
          },
          processResults: function (data) {
              return {
                  results: data["_embedded"]["staffs"]
              }
          },
          delay: 250
        },
        templateResult: function(staff){
          return staff.firstName + " " + staff.lastName;
        },
        templateSelection: function formatRepoSelection (staff) {
          if(staff===undefined){
            return "Please select";
          }
          else{
            if(staff.firstName != null){
              return staff.firstName + " " + staff.lastName;
            }
            else if(staff.name != null){
              return staff.name;
            }
            return "Please select";
          }
        },
        initSelection: function(element, callback) {
          var value = $(element).attr('data-init');
          callback({name: value});
        }
      };
    $('#teacher').select2(configs);
    $('#teacher').on('change', this.handleTeacherNameChange.bind(this));

    $('#lineManager').select2(configs);
    $('#lineManager').on('change', this.handleManagerNameChange.bind(this));

    $('#observerPrimary').select2(configs);
    $('#observerPrimary').on('change', this.handlePrimaryObserverNameChange.bind(this));

    $('#observerSecondary').select2(configs);
    $('#observerSecondary').on('change', this.handleSecondObserverNameChange.bind(this));

    if(this.props.mode === 'Create') {
        var newState = Object.assign(this.state, {observerPrimaryId: this.props.staff.id});
        this.props.updateObservation(newState);
    }

    $('#datePicker').datetimepicker({
        format: 'YYYY-MM-DD'
    });
    $('#datePicker').on('dp.change', this.handleDateChange.bind(this));

    $('#timePicker').datetimepicker({
        format: 'HH:mm'
    });
    $('#timePicker').on('dp.change', this.handleTimeChange.bind(this));
  }

  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">

          <div className="row m-b">
            <div className="col-sm-4">
              <label className="col-sm-3 control-label">Teacher's Name</label>
              <div className="col-sm-9">
                <select id="teacher"
                  className="form-control m-b"
                  data-init={this.state.staff.firstName + ' ' + this.state.staff.lastName}
                  style={{width: "100%"}}
                  value={this.state.staffId}
                  required={this.state.staffId === ''}>
                    <option></option>
                </select>
              </div>
            </div>
            <div className="col-sm-5">
              <label className="col-sm-4 control-label">Line Manager's Name</label>
              <div className="col-sm-7">
                <select id="lineManager"
                  className="form-control m-b"
                  data-init={this.state.lineManager.firstName + ' ' + this.state.lineManager.lastName}
                  style={{width: "100%"}}
                  value={this.state.lineManagerId}>
                  <option></option>
                </select>
              </div>
            </div>
            <div className="col-sm-3">
              <label className="col-sm-3 control-label">Date</label>
              <div className="col-sm-9">
                <div className="input-group date" id="datePicker">
                  <input type="text" className="form-control" value={this.state.date} />
                  <span className="input-group-addon">
                    <i className="fa fa-calendar" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Lead Observer's Name</label>
              <div className="col-sm-8">
                <select id="observerPrimary"
                  className="form-control m-b"
                  data-init={this.state.observerPrimary.firstName + ' ' + this.state.observerPrimary.lastName}
                  style={{width: "100%"}}
                  value={this.state.observerPrimaryId}>
                  <option></option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Time of Observation</label>
              <div className="col-sm-4">
                <div className="input-group date" id="timePicker">
                  <input type="text" className="form-control" value={this.state.time} />
                  <span className="input-group-addon">
                    <i className="fa fa-clock-o" aria-hidden="true"></i>
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Peer Observer's Name</label>
              <div className="col-sm-8">
                <select id="observerSecondary"
                  className="form-control m-b"
                  data-init={this.state.observerSecondary.firstName + ' ' + this.state.observerSecondary.lastName}
                  style={{width: "100%"}}
                  value={this.state.observerSecondaryId}>
                  <option></option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
            </div>
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course Code</label>
              <div className="col-sm-8">
                <input
                    {...this.props.mode}
                    type="text"
                    placeholder="20 characters allowed"
                    maxLength={20}
                    className="form-control m-b"
                    value={this.state.courseCode}
                    onChange={this.handleCourseCodeChange.bind(this)}
                />
              </div>
            </div>
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
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course Title</label>
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

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Level</label>
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
          </div>

          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Qualification</label>
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


          <div className="row">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Level</label>
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

          <div className="row m-b">
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
            </div>

          <div className="row">
            <div className="col-sm-12">
              <label className="col-sm-2 control-label">Context of Session (include stage in programme)</label>
              <div className="col-sm-10">
                <textarea
                    {...this.props.mode}
                    maxLength={250}
                    style={{width: "100%", height: "70px"}}
                    placeholder="250 characters allowed"
                    type="text"
                    className="form-control m-b"
                    value={this.state.sessionContext}
                    onChange={this.handleContextSessionChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <label className="col-sm-2 control-label">Observation Notes</label>
              <div className="col-sm-10">
                <textarea
                    {...this.props.mode}
                    type="text"
                    style={{width: "100%", height:"200px"}}
                    className="form-control m-b"
                    value={this.state.notes}
                    onChange={this.handleNotesSessionChange.bind(this)}
                />
              </div>
            </div>
          </div>

          <div className="row m-b">
            <div className="col-sm-3">
              <label className="col-sm-8 control-label">Lesson Plan</label>
              <div className="col-sm-4">
                <input
                  type="checkbox"
                  checked={this.state.lessonPlan}
                  onClick={this.handleLessonPlanChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-9">
              <label className="col-sm-2 control-label">Comments</label>
              <div className="col-sm-10">
                <textarea
                    {...this.props.mode}
                    type="text"
                    maxLength={250}
                    placeholder="250 characters allowed"
                    className="form-control"
                    value={this.state.lessonPlanComment}
                    onChange={this.handleLessonPlanCommentChange.bind(this)}
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
                  checked={this.state.courseOutline}
                  onClick={this.handleCourseOutlineChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-9">
              <label className="col-sm-2 control-label">Comments</label>
              <div className="col-sm-10">
                <textarea
                    {...this.props.mode}
                    type="text"
                    maxLength={250}
                    placeholder="250 characters allowed"
                    className="form-control"
                    value={this.state.courseOutlineComment}
                    onChange={this.handleCourseOutlineCommentChange.bind(this)}
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
      categoryItem: props.categoryItem || {}
    }
  }

  handleStrengthChange(e) {
    var newState = Object.assign(this.state.categoryItem, {strength: e.target.checked});
    this.setState({categoryItem: newState});
    this.props.updateObservation({strengthImprovements: this.updateStrengthImprovements(newState)});
  }

  handleImprovementChange(e) {
    var newState = Object.assign(this.state.categoryItem, {improvement: e.target.checked});
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
        <tr className={this.props.category}>
            <td>
                <ul>
                    <li>{this.props.criteria}</li>
                </ul>
            </td>
            <td align="center">
                <input className="form-control"
                  type="checkbox"
                  checked={this.state.categoryItem.strength}
                  onClick={this.handleStrengthChange.bind(this)}
                />
            </td>
            <td align="center">
                <input className="form-control"
                  type="checkbox"
                  checked={this.state.categoryItem.improvement}
                  onClick={this.handleImprovementChange.bind(this)}
                />
            </td>
            <td>
                <textArea {...this.props.mode} type="text"
                  maxLength={250}
                  placeholder="250 characters allowed"
                  className="form-control"
                  value={this.state.categoryItem.evidence || ''}
                  onChange={this.handleEvidenceChange.bind(this)}
                >
                </textArea>
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
    this.setState({expanded: newState.expanded});
    this.props.updateObservation({strengthImprovementReferences: this.updateCategoryItems(newState)});
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
      newCategoryItems.push(categoryItem)
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

  render(){
    var rows = [];
    var lastCategory = null;
    var currentCategoryExpanded = null;
    this.props.categoryItems.forEach(function(categoryItem){
      currentCategoryExpanded = categoryItem.expanded;
      if (categoryItem.category !== lastCategory){
        rows.push(<ObserveEntryCategory categoryItem={categoryItem}
                                        key={categoryItem.category}
                                        updateObservation={this.props.updateObservation}
                                        categoryItems={this.props.categoryItems || []} />);
      }

      if(currentCategoryExpanded) {
        var found = {};
        this.props.strengthImprovements.forEach(function(item){
            if (item.strengthImprovementReferenceId == categoryItem.id){
              found = item;
              return false;
            }
        });

        var rowData = {
            id: found.id || "",
            strength:  found.strength || false,
            improvement: found.improvement || false,
            evidence: found.evidence || "",
            strengthImprovementReferenceId: found.strengthImprovementReferenceId || categoryItem.id
        };

        rows.push(<ObserveEntryRow
                  categoryItem={rowData}
                  key={categoryItem.criteria}
                  criteria={categoryItem.criteria}
                  mode={this.props.mode}
                  updateObservation={this.props.updateObservation}
                  strengthImprovements={this.props.strengthImprovements || []}
                />);
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
    );
  }
}

class ObserveSummary extends Component{
  constructor(props){
    super(props);
    this.state = {
        ratingReferenceId: props.ratingReferenceId || '',
        ratingSummary: props.ratingSummary || '',
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

  handleAdditionalCommentsChange(e){
    var newState = Object.assign(this.state, {additionalComments: e.target.value});
    this.setState({additionalComments: e.target.value})
    this.props.updateObservation(newState);
  }

  componentDidMount() {
    $('#rating').select2({placeholder: "Please Select"});
    $('#rating').on('change', this.handleRatingReferenceIdChange.bind(this));
  }

  populateRating(){
    var ratingValue='';
    var rows = [];
    var lastIndex = 0;
    this.props.ratingReferences.forEach(function(ratingReference){
      ratingValue = ratingReference.rating;
      rows.push(<option value={ratingReference.id}>{ratingValue}</option>);
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
                <select id="rating"
                  className="form-control m-b"
                  value={this.state.ratingReferenceId}
                  style={{width: "100%"}}>
                  <option></option>
                  {this.populateRating()}
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Summary Evaluation</label>
              <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control"
                    maxLength={250}
                    placeholder="250 characters allowed"
                    onChange={this.handleRatingSummaryChange.bind(this)}
                    value={this.state.ratingSummary}
                />
              </div>
            </div>
          </div>
          <div className="form-group">
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
        moderated: props.observation.moderated || false,
        moderatorId: props.observation.moderatorId || '',
        learningCoachId: props.observation.learningCoachId || '',
        hodId: props.observation.hodId || '',
        moderator: props.observation.moderator || {firstName: '', lastName: ''},
        learningCoach: props.observation.learningCoach || {firstName: '', lastName: ''},
        hod: props.observation.hod || {firstName: '', lastName: ''}
    }
  }

  handleModeratedChange(e){
    var newState = Object.assign(this.state, {moderated: e.target.checked});
    this.setState({moderated: e.target.checked})
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
    var configs =
       {
        ajax: {
          url: 'api/staffs/search/findByStaffName',
          data: function(params){
              return {
                  name: params.term
              }
          },
          processResults: function (data) {
              return {
                  results: data["_embedded"]["staffs"]
              }
          },
          delay: 250
        },
        templateResult: function(staff){
          return staff.firstName + " " + staff.lastName;
        },
        templateSelection: function formatRepoSelection (staff) {
          if(staff === undefined){
            return "Please select";
          }
          else{
            if(staff.firstName != null){
              return staff.firstName + " " + staff.lastName;
            }
            else if(staff.name != null){
              return staff.name;
            }
            return "Please select";
          }
        },
        initSelection: function(element, callback) {
          var value = $(element).attr('data-init');
          callback({name: value});
        }
      };

    $('#moderator').select2(configs);
    $('#moderator').on('change', this.handleModeratorIdChange.bind(this));

    $('#coach').select2(configs);
    $('#coach').on('change', this.handleLearningCoachIdChange.bind(this));

    $('#hod').select2(configs);
    $('#hod').on('change', this.handleHodIdChange.bind(this));
  }

  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Has been moderated</label>
              <div className="col-sm-8">
                <input
                  type="checkbox"
                  checked={this.state.moderated}
                  onClick={this.handleModeratedChange.bind(this)}
                />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Moderator Name</label>
              <div className="col-sm-8">
                <select id="moderator"
                  className="form-control m-b"
                  style={{width: "100%"}}
                  data-init={this.state.moderator.firstName + " " + this.state.moderator.lastName}
                  value={this.state.moderatorId}>
                  <option></option>
                </select>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Learning Coach Name</label>
              <div className="col-sm-8">
                <select id="coach"
                  style={{width: "100%"}}
                  className="form-control m-b"
                  data-init={this.state.learningCoach.firstName + " " + this.state.learningCoach.lastName}
                  value={this.state.learningCoachId}>
                  <option></option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Head of Department Name</label>
              <div className="col-sm-8">
                <select id="hod"
                  style={{width: "100%"}}
                  className="form-control m-b"
                  data-init={this.state.hod.firstName + " " + this.state.hod.lastName}
                  value={this.state.hodId}>
                  <option></option>
                </select>
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
    this.state = {
        recommendation: this.props.recommendation
    };
  }

  handleFocusAreaChange(e) {
    var newState = Object.assign(this.state.recommendation, {focusArea: e.target.value});
    this.props.updateObservation({observationRecommendations: this.updateRecommendations(newState)});
    this.setState({recommendation: newState});
  }

  handleStrengthChange(e) {
    var newState = Object.assign(this.state.recommendation, {strength: e.target.checked});
    this.props.updateObservation({observationRecommendations: this.updateRecommendations(newState)});
    this.setState({recommendation: newState});
  }

  handleImprovementChange(e) {
    var newState = Object.assign(this.state.recommendation, {improvement: e.target.checked});
    this.props.updateObservation({observationRecommendations: this.updateRecommendations(newState)});
    this.setState({recommendation: newState});
  }

  handleRecommendedActionChange(e) {
    var newState = Object.assign(this.state.recommendation, {recommendedAction: e.target.value});
    this.props.updateObservation({observationRecommendations: this.updateRecommendations(newState)});
    this.setState({recommendation: newState});
  }

  updateRecommendations(recommendation) {
    if(this.props.isNew) {
      this.props.recommendations.push(recommendation);
      this.props.isNew = false;
    }
    else {
      Object.assign(this.props.recommendations, recommendation);
    }

    return this.props.recommendations;
  }

  populateFocusArea() {
    var rows = [];
    var lastCategory = null;
    this.props.categoryItems.forEach(function(item){
      if (item.category !== lastCategory){
        rows.push(<option value={item.category}>{item.category}</option>);
      }
      lastCategory = item.category;
    });
    return rows;
  }

  componentDidMount() {
    $('#focus-area-dropdown').select2({
        placeholder: "Please Select",
        width: 'element'
    });
    $('#focus-area-dropdown').on('change', this.handleFocusAreaChange.bind(this));
  }

  render() {
    return (
        <tr>
            <td>
                <select className="form-control"
                  onChange={this.handleFocusAreaChange.bind(this)}
                  value={this.state.recommendation.focusArea}>
                  <option></option>
                  {this.populateFocusArea()}
                </select>
            </td>
            <td align="center">
                <input className="form-control"
                  type="checkbox"
                  checked={this.state.recommendation.strength}
                  onClick={this.handleStrengthChange.bind(this)}
                />
            </td>
            <td align="center">
                <input className="form-control"
                  type="checkbox"
                  checked={this.state.recommendation.improvement}
                  onClick={this.handleImprovementChange.bind(this)}
                />
            </td>
            <td>
                <textArea {...this.props.mode} type="text"
                  maxLength={250}
                  placeholder="250 characters allowed"
                  className="form-control"
                  value={this.state.recommendation.recommendedAction}
                  onChange={this.handleRecommendedActionChange.bind(this)}
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
    this.state = {
        recommendations: this.props.recommendations || [],
        recommendationRows: [],
        recommendationNum: 0
    };
  }

  handleAddRecommendation() {
    var recommendation = {
      focusArea: '',
      improvement: false,
      strength: false,
      recommendedAction: ''
    };
    this.state.recommendationRows.push(<ObserveRecommendation isNew={true}
                                                           updateObservation={this.props.updateObservation}
                                                           recommendations={this.state.recommendations}
                                                           recommendation={recommendation}
                                                           categoryItems={this.props.categoryItems} />);
    this.setState({
        recommendationRows: this.state.recommendationRows,
        recommendationNum: this.state.recommendationNum + 1
    });
  }

  componentDidMount() {
    var count = 0;
    if(this.state.recommendations.length === 0) {
      var recommendation = {
        focusArea: '',
        improvement: false,
        strength: false,
        recommendedAction: ''
      };
      this.state.recommendationRows.push(<ObserveRecommendation isNew={true}
                                                               updateObservation={this.props.updateObservation}
                                                               recommendations={this.state.recommendations}
                                                               recommendation={recommendation}
                                                               categoryItems={this.props.categoryItems} />);
      count++;
    }
    else {
      this.state.recommendations.forEach(function(recommendation){
        this.state.recommendationRows.push(<ObserveRecommendation isNew={false}
                                                                 updateObservation={this.props.updateObservation}
                                                                 recommendations={this.state.recommendations}
                                                                 recommendation={recommendation}
                                                                 categoryItems={this.props.categoryItems} />);
        count++;
      }, this);
    }
    this.setState({
        recommendationRows: this.state.recommendationRows,
        recommendationNum: count
    });
  }

  render() {
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
                    {this.state.recommendationRows}
                  </tbody>
              </table>
              <button className="btn btn-primary" type="button" onClick={this.handleAddRecommendation.bind(this)} disabled={this.state.recommendationNum > 5}>Add Recommendation</button>
            </div>
          </div>
        </div>
    );
  }
}

class Entry extends Component {
  constructor(props){
    super(props)
    this.state = {
      observationData: props.observation || {},
      staffs:null,
      ratingReferences:null,
      strengthImprovementReferences:null,
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

  componentWillReceiveProps(nextProps) {
      if (nextProps.observation != this.props.observation) {
        this.setState({observationData: nextProps.observation});
      }
  }

  handleComplete(){
    var observation = Object.assign({}, this.state.observationData, {completed: true});
    this.updateMethod(observation);
  }

  handleSubmit(e){
    console.log('observation:' + this.state.observationData);

    /*
      newObservationData is updated with initial value in case user didn't change the observation fields.
      if it is not initialized, the data will be saved in null value and caused an error.
    */
    var newObservationData = Object.assign(this.state.observationData, {
        moderated: this.state.observationData.moderated || false,
        staffId: this.state.observationData.staffId || '',
        lineManagerId: this.state.observationData.lineManagerId || '',
        observerPrimaryId: this.state.observationData.observerPrimaryId || '',
        observerSecondaryId: this.state.observationData.observerSecondaryId || '',
        courseName: this.state.observationData.courseName || '',
        courseLevel: this.state.observationData.courseLevel || 0,
        programme: this.state.observationData.programme || '',
        programmeLevel: this.state.observationData.programmeLevel || 0,
        registeredLearners: this.state.observationData.registeredLearners || 0 ,
        startLearners: this.state.observationData.startLearners || 0,
        lateLearners: this.state.observationData.lateLearners || 0,
        totalLearners: this.state.observationData.totalLearners || 0 ,
        location: this.state.observationData.location || '',
        department: this.state.observationData.department || '',
        sessionContext: this.state.observationData.sessionContext || '',
        notes: this.state.observationData.notes || '',
        courseCode: this.state.observationData.courseCode || '',
        lessonPlan: this.state.observationData.lessonPlan || false,
        courseOutline: this.state.observationData.courseOutline || false,
        lessonPlanComment: this.state.observationData.lessonPlanComment || '',
        courseOutlineComment: this.state.observationData.courseOutlineComment || '',
        ratingReferenceId: this.state.observationData.ratingReferenceId || '',
        ratingSummary: this.state.observationData.ratingSummary || '',
        additionalComments: this.state.observationData.additionalComments || '',
        moderated: this.state.observationData.moderated || false,
        moderatorId: this.state.observationData.moderatorId || '',
        learningCoachId: this.state.observationData.learningCoachId || '',
        hodId: this.state.observationData.hodId || ''
    });

    this.setState({observationData: newObservationData});

    var observation = Object.assign({}, this.state.observationData, {
        time : moment(this.state.observationData.date + "T" + this.state.observationData.time).format('HH:mm:ss'),
        completed: false
    });
    if (this.props.title === 'Create') {
      this.createMethod(observation);
    } else if (this.props.title === 'Edit') {
      this.updateMethod(observation);
    }

    e.preventDefault();
  }

  handleBack() {
    this.props.redirectTo('observationSearch');
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
           this.props.redirectTo('observationSearch');
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
     });
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
           console.log(response);
           this.props.redirectTo('observationSearch');
        }.bind(this),
        error: function(xhr, status, err) {
            console.error(this.props.url, status, err.toString());
        }.bind(this)
     });
  }

  render() {
    var btnStyle = {
      marginRight: "5px"
    };
    var submitButtons = null;
    if(this.props.title === 'Edit') {
      submitButtons = (
        <div className="col-sm-4 col-sm-offset-9">
          <button {...this.props.mode} className="btn btn-white" style={btnStyle} type="button" onClick={this.handleBack.bind(this)}>Cancel</button>
          <button {...this.props.mode} className="btn btn-primary" style={btnStyle} type="button" onClick={this.handleComplete.bind(this)}>Complete</button>
          <button {...this.props.mode} className="btn btn-primary" type="submit" value="post">Save</button>
        </div>
      );
    }
    else if(this.props.title === 'Create') {
      submitButtons = (
        <div className="col-sm-4 col-sm-offset-10">
          <button {...this.props.mode} className="btn btn-white" style={btnStyle} type="button" onClick={this.handleBack.bind(this)}>Cancel</button>
          <button {...this.props.mode} className="btn btn-primary" type="submit" value="post">Save</button>
        </div>
      );
    }
    if(this.state.staffs != null && this.state.ratingReferences != null && this.state.strengthImprovementReferences != null) {
        return (
          <div className="wrapper-content animated fadeInRight">
            <div className="row">
              <div className="col-lg-12">
                <div className="ibox float-e-margins">
                  <div className="ibox-title">
                      <h2>Observation {this.props.title}</h2>
                  </div>
                  <div className="ibox-content">
                    <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                      <ObserveHeader
                        key={this.props.title+"-header"}
                        observation={this.state.observationData}
                        mode={this.props.title}
                        disabled='true'
                        updateObservation={this.updateObservation}
                        staffs={this.state.staffs}
                        staff={this.props.staff}
                      />
                      <ObserveEntries
                        key={this.props.title+"-entries"}
                        categoryItems={this.state.strengthImprovementReferences}
                        strengthImprovements={this.state.observationData.strengthImprovements || []}
                        mode={this.props.title}
                        updateObservation={this.updateObservation}
                      />
                      <ObserveSummary
                        key={this.props.title+"-summary"}
                        mode={this.props.title}
                        updateObservation={this.updateObservation}
                        ratingSummary={this.state.observationData.ratingSummary}
                        strengthsShare={this.state.observationData.strengthsShare}
                        additionalComments={this.state.observationData.additionalComments}
                        ratingReferenceId={this.state.observationData.ratingReferenceId}
                        ratingReferences={this.state.ratingReferences}
                      />
                      <ObserveModerate
                        key={this.props.title+"-moderate"}
                        mode={this.props.title}
                        updateObservation={this.updateObservation}
                        observation={this.state.observationData}
                        staffs={this.state.staffs}
                      />
                      <ObserveRecommendations
                        key={this.props.title+"-recommendations"}
                        updateObservation={this.updateObservation}
                        recommendations={this.state.observationData.observationRecommendations || []}
                        categoryItems={this.state.strengthImprovementReferences}
                      />
                      <div className="ibox-content">
                        <div className="form-group">
                          {submitButtons}
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
    else {
        return (
          <div className="wrapper-content" style={{textAlign: 'center'}}>
            <i className="fa fa-spinner fa-pulse fa-3x fa-fw" aria-hidden="true"></i>
            <span className="sr-only">Loading...</span>
          </div>
        );
    }
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