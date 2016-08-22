import React, { Component } from 'react'

class ObserveHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            staffId: '',
            lineManagerId: '',
            observerPrimaryId: '',
            observerSecondaryId: '',
            courseName: '',
            programme: '',
            registeredLearners: '',
            startLearners: '',
            lateLearners: '',
            totalLearners: '',
            location: '',
            department: '',
            sessionContext: '',
            notes: ''
        }
        console.log('ObserveHeader mode: ' + this.props.mode);
    }

    handleTeacherNameChange(e) {
        this.setState({staffId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleManagerNameChange(e) {
        this.setState({lineManagerId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handlePrimaryObserverNameChange(e) {
        this.setState({observerPrimaryId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleSecondObserverNameChange(e) {
        this.setState({observerSecondaryId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleCourseChange(e) {
        this.setState({courseName: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleProgrammeChange(e) {
        this.setState({programme: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleNumLearnerOnRegisterChange(e) {
        this.setState({registeredLearners: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleNumLearnerAtStartChange(e) {
        this.setState({startLearners: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleNumLearnerLateChange(e) {
        this.setState({lateLearners: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleTotalLearnerChange(e) {
        this.setState({totalLearners: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleCampusChange(e) {
        this.setState({location: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleDepartmentChange(e) {
        this.setState({department: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleContextSessionChange(e) {
        this.setState({sessionContext: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleNotesSessionChange(e) {
        this.setState({notes: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleCourseLevelChange(e) {
        this.setState({courseLevel: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleProgrammeLevelChange(e) {
        this.setState({programmeLevel: e.target.value})
        this.props.updateObservation(this.state);
    }

    populateStaff(key) {
        var fullName = '';
        var rows = []
        this.props.staffs.forEach(function (staff) {
            fullName = staff.firstName + ' ' + staff.lastName; // "#{staff.firstName} #{staff.lastName}"
            if (staff.staffId == key) {
                rows.push(<option value={staff.staffId} selected>{fullName}</option>); //value={staff.id}
            } else {
                rows.push(<option value={staff.staffId}>{fullName}</option>);
            }
        })
        return rows
    }

    render() {
        var obj = (this.props.mode == 'Create') ? this.state : this.props.observation
        return (
            <div className="ibox-content">
                <div className="form-group">
                    <div className="form-group">
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Teacher's Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b" onChange={this.handleTeacherNameChange.bind(this)}>
                                    {this.populateStaff(obj.staffId)}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Line Manager's Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b" onChange={this.handleManagerNameChange.bind(this)}>
                                    {this.populateStaff(obj.lineManagerId)}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Primary Observer's Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b"
                                        onChange={this.handlePrimaryObserverNameChange.bind(this)}>
                                    {this.populateStaff(obj.observerPrimaryId)}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Secondary Observer's Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b"
                                        onChange={this.handleSecondObserverNameChange.bind(this)}>
                                    {this.populateStaff(obj.observerSecondaryId)}
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
                                    className="form-control m-b"
                                    value={obj.courseName}
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
                                    className="form-control m-b"
                                    value={obj.programme}
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
                                    className="form-control m-b"
                                    value={obj.courseLevel}
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
                                    className="form-control m-b"
                                    value={obj.programmeLevel}
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
                                    className="form-control m-b"
                                    value={obj.registeredLearners}
                                    onChange={this.handleNumLearnerOnRegisterChange.bind(this)}
                                />
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">No of learniers at start</label>
                            <div className="col-sm-8">
                                <input
                                    {...this.props.mode}
                                    type="number"
                                    className="form-control m-b"
                                    value={obj.startNoLearners}
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
                                    className="form-control m-b"
                                    value={obj.lateLearners}
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
                                    className="form-control m-b"
                                    value={obj.totalLearners}
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
                                    className="form-control m-b"
                                    value={obj.location}
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
                                    className="form-control m-b"
                                    value={obj.department}
                                    onChange={this.handleDepartmentChange.bind(this)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Context of Session (include stage in
                                programme)</label>
                            <div className="col-sm-8">
                <textarea
                    {...this.props.mode}
                    type="text"
                    className="form-control m-b"
                    value={obj.sessionContext}
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
                    className="form-control m-b"
                    value={obj.notes}
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

class ObserveEntryRow extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="ibox-content">
                <div className="form-group">
                    <div className="form-group" style={{ paddingLeft: "25px" }}>{this.props.categitem.criteria}</div>
                    <div className="form-group">
                        <div className="col-sm-3">
                            <label className="col-sm-6 control-label">Strengths</label>
                            <div className="col-sm-6">
                                <select {...this.props.mode} className="form-control m-b">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <label className="col-sm-6 control-label">Improvement</label>
                            <div className="col-sm-6">
                                <select {...this.props.mode} className="form-control m-b">
                                    <option>Yes</option>
                                    <option>No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="col-sm-2 control-label">Evidence</label>
                            <div className="col-sm-10">
                                <textarea {...this.props.mode} type="text" className="form-control m-b"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ObserveEntryCategory extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="ibox-title">
                <h5>{this.props.category}</h5>
            </div>
        )
    }
}

class ObserveEntries extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        var rows = [];
        var lastCategory = null;
        this.props.categitems.forEach(function (categitem) {
            if (categitem.category !== lastCategory) {
                rows.push(<ObserveEntryCategory category={categitem.category} key={categitem.category}/>);
            }
            rows.push(<ObserveEntryRow categitem={categitem} key={categitem.id} mode={this.props.mode}/>);
            lastCategory = categitem.category;
        }, this)

        return (
            <div className="ibox-content">
                {rows}
            </div>
        )
    }
}

class ObserveSumarry extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ratingReferenceId: '',
            ratingSummary: '',
            strengthsShare: '',
            additionalComments: ''
        }
    }

    handleRatingReferenceIdChange(e) {
        this.setState({ratingReferenceId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleRatingSummaryChange(e) {
        this.setState({ratingSummary: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleStrengthsShareChange(e) {
        this.setState({strengthsShare: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleAdditionalCommentsChange(e) {
        this.setState({additionalComments: e.target.value})
        this.props.updateObservation(this.state);
    }

    populateRatingReferences(key) {
        var ratingRef = '';
        var rows = []
        this.props.ratingReferences.forEach(function (ratingReference) {
            if (ratingReference.staffId == key) {
                rows.push(<option value={ratingReference.ratingReferenceId} selected>{ratingReference.rating}</option>);
            } else {
                rows.push(<option value={ratingReference.ratingReferenceId}>{ratingReference.rating}</option>);
            }
        })
        return rows
    }

    render() {
        var obj = (this.props.mode == 'Create') ? this.state : this.props.observation
        return (
            <div className="ibox-content">
                <div className="form-group">
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Rating</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b"
                                        onChange={this.handleRatingReferenceIdChange.bind(this)}>
                                    {this.populateRatingReferences(obj.ratingReferenceId)}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Sumarry Evaluation</label>
                            <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control m-b"
                                               onChange={this.handleRatingSummaryChange.bind(this)}
                                               value={obj.ratingSummary}
                />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Identified strengths for sharing</label>
                            <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control m-b"
                                               onChange={this.handleStrengthsShareChange.bind(this)}
                                               value={obj.strengthsShare}
                />
                            </div>
                        </div>
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Additional Comments</label>
                            <div className="col-sm-8">
                <textarea {...this.props.mode} type="text" className="form-control m-b"
                                               onChange={this.handleAdditionalCommentsChange.bind(this)}
                                               value={obj.additionalComments}
                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

class ObserveModerate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            moderated: 0,
            moderatorId: '',
            learningCoachId: '',
            hodId: ''
        }
    }

    handleModeratedChange(e) {
        this.setState({moderated: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleModeratorIdChange(e) {
        this.setState({moderatorId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleLearningCoachIdChange(e) {
        this.setState({learningCoachId: e.target.value})
        this.props.updateObservation(this.state);
    }

    handleHodIdChange(e) {
        this.setState({hodId: e.target.value})
        this.props.updateObservation(this.state);
    }

    populateStaff(key) {
        var fullName = '';
        var rows = []
        this.props.staffs.forEach(function (staff) {
            fullName = staff.firstName + ' ' + staff.lastName; // "#{staff.firstName} #{staff.lastName}"
            if (staff.staffId == key) {
                rows.push(<option value={staff.staffId} selected>{fullName}</option>); //value={staff.id}
            } else {
                rows.push(<option value={staff.staffId}>{fullName}</option>);
            }
        })
        return rows
    }

    render() {
        var obj = (this.props.mode == 'Create') ? this.state : this.props.observation
        return (
            <div className="ibox-content">
                <div className="form-group">
                    <div className="form-group">
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Has been moderated</label>
                            <div className="col-sm-8">
                                <select {...this.props.mode} className="form-control m-b"
                                                             onChange={this.handleModeratedChange.bind(this)}>
                                    <option value='1'>Yes</option>
                                    <option value='0'>No</option>
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Moderator Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b" onChange={this.handleModeratorIdChange.bind(this)}>
                                    {this.populateStaff(obj.staffId)}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Learning Coach Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b"
                                        onChange={this.handleLearningCoachIdChange.bind(this)}>
                                    {this.populateStaff(obj.staffId)}
                                </select>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <label className="col-sm-4 control-label">Head of Department Name</label>
                            <div className="col-sm-8">
                                <select className="form-control m-b" onChange={this.handleHodIdChange.bind(this)}>
                                    {this.populateStaff(obj.staffId)}
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
    constructor(props) {
        super(props)
        this.state = {observationData: {}, staffs: [], ratingReferences: []};

        this.updateObservation = this.updateObservation.bind(this);
    }


    updateObservation(observation) {
        var newObj = Object.assign(this.state.observationData, observation);
        this.setState({observationData: newObj});
    }

    getStaffRecords() {
        $.ajax({
            type: 'GET',
            url: "/api/staffs",
            success: function (response) {
                this.setState({staffs: response["_embedded"]["staffs"]});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getRatingReferencesRecords() {
        $.ajax({
            type: 'GET',
            url: "/api/ratingReferences",
            success: function (response) {
                this.setState({ratingReferences: response["_embedded"]["ratingReferences"]});
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentWillMount() {
        this.getStaffRecords();
        this.getRatingReferencesRecords();
    }

    handleSubmit() {
//    var newObj = Object.assign(this.state.observationData, )
//    var data = JSON.stringify({department: 'sport'});
        console.log('state:' + this.state.observationData);
        var date = new Date();
        var observation = Object.assign({}, this.state.observationData, {
            date: date.toISOString().slice(0, 10),
            time: date.toLocaleTimeString().slice(0, 8)
        })
        var data = JSON.stringify(observation);
        $.ajax({
            type: 'POST',
            url: "/api/observation_add",
            contentType: "application/json",
            data: data,
            success: function (response) {
                console.log(response)
            }.bind(this),
            error: function (xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }


    render() {
        var mode = this.props.title == 'Create' ? 'Create' : 'Edit';
        console.log('mode: ' + mode)
        var style = {
            paddingLeft: "55px"
        }
        console.log(this.state);

//                  <ObserveEntries categitems = {CATEGITEMS} mode={mode}/>
//                  <ObserveSumarry mode={mode}/>
//                  <ObserveModerate mode={mode}/>
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

                                    <ObserveSumarry
                                        mode={mode}
                                        updateObservation={this.updateObservation}
                                        ratingReferences={this.state.ratingReferences}
                                    />
                                    <ObserveModerate
                                        mode={mode}
                                        updateObservation={this.updateObservation}
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
                                                    value="post">Save changes
                                                </button>
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

var CATEGITEMS =
    [{
        "category": "Learner-centred teaching enables all learners to achieve",
        "criteria": "Learning strategies cater for the needs of the learners",
    }, {
        "category": "Learner-centred teaching enables all learners to achieve",
        "criteria": "Learning activities are varied and interesting",
    }, {
        "category": "Learner-centred teaching enables all learners to achieve",
        "criteria": "Learning time is managed effectively",
    }, {
        "category": "Learner-centred teaching enables all learners to achieve",
        "criteria": "Questioning techniques progress learning",
    }, {
        "category": "Learning environments ensure participation and engagement",
        "criteria": "Learning environment is positive and respectful",
    }, {
        "category": "Learning environments ensure participation and engagement",
        "criteria": "Instructions, explanations and expectations are clear",
    }, {
        "category": "Learning environments ensure participation and engagement",
        "criteria": "Learning environment is well organised",
    }, {
        "category": "Learning environments ensure participation and engagement",
        "criteria": "Variety of interactive and independent activity",
    }, {
        "category": "Learning environments ensure participation and engagement",
        "criteria": "Good use of learning technologies",
    }];

export default Entry;