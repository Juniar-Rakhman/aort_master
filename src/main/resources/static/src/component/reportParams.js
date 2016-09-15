import React, { Component } from 'react';

class ParamsForm extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return (
            <h3>Parameters form will be here</h3>
        );
    }
}

class ReportParams extends Component{
    constructor(props) {
        super(props);
    }

    render(){
        return(
			<div className="wrapper-content animated fadeInRight">
		        <div className="row">
		          <div className="col-lg-12">
		            <div className="ibox float-e-margins">
		                <div className="ibox-title">
                            <h2>{this.props.reportId} Report Parameters</h2>
                        </div>
                        <div className="ibox-content">
                            <ParamsForm redirectTo={this.props.redirectTo} />
                        </div>
		            </div>
		          </div>
		        </div>
		    </div>
        );
    }
}

export default ReportParams;