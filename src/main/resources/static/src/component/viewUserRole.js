import React, { Component } from 'react'

class UserRoleSubmitButtons extends Component{
  render() {
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="col-sm-4 col-sm-offset-9">
            <button className="btn btn-white" type="submit">Cancel</button>
            <button className="btn btn-primary" type="submit">Save changes</button>
          </div>
        </div>
      </div>
    );
  }
}

class UserRoleForm extends Component {
	constructor(props){
		super(props);
  
	}

	render() {
		return (
			<div className="ibox-content">
	    		<div className="form-group">
	      			<div className="form-group">
				        <div className="col-sm-12">
				          	<label className="col-sm-4 control-label">Name</label>
				          	<div className="col-sm-8">
				            	<input type="text" className="form-control m-b" value={this.props.userRole.staff.firstName + ' ' + this.props.userRole.staff.lastName} disabled />
				          	</div>
				        </div>
				    </div>

			      	<div className="form-group">
			        	<div className="col-sm-12">
			          		<label className="col-sm-4 control-label">Role</label>
			          		<div className="col-sm-8">
				                <input type="radio" name="role" value="general" checked={this.props.userRole.role.general} /> General<br /><br />
				        		<input type="radio" name="role" value="addObservation" checked={this.props.userRole.role.addObservation} />  Add Observation<br /><br />
				        		<input type="radio" name="role" value="systemAdmin" checked={this.props.userRole.role.systemAdmin} /> System Administration<br /><br />
				        		<input type="radio" name="role" value="qualityAssurance" checked={this.props.userRole.role.qualityAssurance} /> Quality Assurance
				        	</div>
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
			<div className="wrapper wrapper-content animated fadeInRight">
		        <div className="row">
		          <div className="col-lg-12">
		            <div className="ibox float-e-margins">
		              <div className="ibox-content">
		                <form method="get" className="form-horizontal">
		                  <UserRoleForm userRole={this.props.userRole} />
		                  <UserRoleSubmitButtons />
		                </form>
		              </div>
		            </div>
		          </div>
		        </div>
		    </div>
		);
	}
 
}

export default ViewUserRole
