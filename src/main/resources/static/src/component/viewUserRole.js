import React, { Component } from 'react'

class UserRoleForm extends Component {
	constructor(props){
		super(props);
		this.state = {
		    general : this.props.userRole.role.general,
		    addObservation : this.props.userRole.role.addObservation,
		    systemAdmin : this.props.userRole.role.systemAdmin,
		    qualityAssurance : this.props.userRole.role.qualityAssurance
		};
	}

    handleSubmit() {
        // check if userRole.role object is empty
        if(Object.keys(this.props.userRole.role).length === 0 && this.props.userRole.role.constructor === Object) {
            this.onCreate();
        }
        else {
            this.onUpdate();
        }
    }

    onCreate() {
        var userRole = {
            "addObservation" : this.state.addObservation,
            "general" : this.state.general,
            "systemAdmin" : this.state.systemAdmin,
            "qualityAssurance" : this.state.qualityAssurance,
            "staffId" : this.props.userRole.staff.id
        };

        console.log('DATA CREATED')
        var data = JSON.stringify(userRole);
        console.log(data);

        $.ajax({
            type: 'POST',
            url: "/api/userRoles",
            data: data,
            contentType: "application/json",
            success: function(response) {
                console.log(response);
                this.props.redirectTo('userRoleSearch');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    onUpdate() {
        var userRole = {
            "id" : this.props.userRole.role.id,
            "addObservation" : this.state.addObservation,
            "general" : this.state.general,
            "systemAdmin" : this.state.systemAdmin,
            "qualityAssurance" : this.state.qualityAssurance,
            "staffId" : this.props.userRole.staff.id
        };

        console.log('DATA UPDATED')
        var data = JSON.stringify(userRole);
        console.log(data);

        $.ajax({
            type: 'PUT',
            url: "/api/userRoles/modify",
            data: data,
            contentType: "application/json",
            success: function(response) {
                console.log(response);
                this.props.redirectTo('userRoleSearch');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleChange(event) {
        this.setState({
            general: false,
            addObservation: false,
            systemAdmin: false,
            qualityAssurance: false
        });

        if(event.target.value === "general") {
            this.setState({general: true});
        }
        else if(event.target.value === "addObservation") {
            this.setState({addObservation: true});
        }
        else if(event.target.value === "systemAdmin") {
            this.setState({systemAdmin: true});
        }
        else if(event.target.value === "qualityAssurance") {
            this.setState({qualityAssurance: true});
        }
    }

    handleBack() {
        this.props.redirectTo('userRoleSearch');
    }

	render() {
    	return (
            <div className="ibox-content">
                <div className="ibox-content">
                    <div className="form-group m-b">
                        <div className="form-group">
                            <div className="col-sm-12  m-b">
                                <label className="col-sm-4 control-label">Name</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control m-b" value={this.props.userRole.staff.firstName + ' ' + this.props.userRole.staff.lastName} disabled />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12  m-b">
                            <label className="col-sm-4 control-label">Role</label>
                            <div className="col-sm-8">
                                <input type="radio" name="role" value="general" checked={this.state.general} onChange={this.handleChange.bind(this)} /> General<br />
                                <input type="radio" name="role" value="addObservation" checked={this.state.addObservation} onChange={this.handleChange.bind(this)} />  Add Observation<br />
                                <input type="radio" name="role" value="systemAdmin" checked={this.state.systemAdmin} onChange={this.handleChange.bind(this)} /> System Administration<br />
                                <input type="radio" name="role" value="qualityAssurance" checked={this.state.qualityAssurance} onChange={this.handleChange.bind(this)} /> Quality Assurance
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ibox-content">
                    <div className="form-group">
                      <div className="col-sm-4 col-sm-offset-9">
                        <button className="btn btn-white" onClick={this.handleBack.bind(this)}>Cancel</button>&nbsp;
                        <button className="btn btn-primary" onClick={this.handleSubmit.bind(this)}>Save changes</button>
                      </div>
                    </div>
                </div>
            </div>
		);
	}
}

class ViewUserRole extends Component {
	constructor(props){
		super(props);
  
	}

	render() {
		return (
			<div className="wrapper-content animated fadeInRight">
		        <div className="row">
		          <div className="col-lg-12">
		            <div className="ibox float-e-margins">
		                <UserRoleForm userRole={this.props.userRole} redirectTo={this.props.redirectTo} />
		            </div>
		          </div>
		        </div>
		    </div>
		);
	}
 
}

export default ViewUserRole
