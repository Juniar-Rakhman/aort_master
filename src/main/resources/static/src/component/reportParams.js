import React, { Component } from 'react';

class ParamRow extends Component{
    constructor(props){
        super(props);
    }
    handleParamFieldUpdate(){
        console.log('update');
    }

    displayInfo(){
        var info='';
        if (this.props.parameter.type == 'Date'){
            info=<span><p>Date format [yyyy-mm-dd]</p></span>;
            return info;
        }
    }
    render(){
        var inputId;
        if (this.props.parameter.type == 'Date'){
            inputId = "datePicker";
        }
        if (this.props.parameter.type == 'Staff'){
            inputId = "teacher";
        }
        return(
          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                  <label className="col-sm-4 control-label">{this.props.parameter.name}</label>
                  <div className="col-sm-8" id={inputId}>
                  <input
                      type="text"
                      className="form-control m-b"
                      onChange={this.handleParamFieldUpdate.bind(this)}
                  />
                  {this.displayInfo()}
                  </div>
              </div>
            </div>
            <div className="col-sm-6">
            </div>
          </div>
        )
    }
}

class ParamsForm extends Component{
    constructor(props){
        super(props);
    }

    handleParamFieldUpdate(){
        console.log('update');
    }

    render(){
        var parameters = this.props.parameters;
        var row=[];
        parameters.forEach(function(parameter){
            row.push(<ParamRow parameter={parameter} />)
        },this);
        return (
    	    <form className="form-horizontal">
                <div className="ibox-content">
                    <div className="form-group">
                        {row}
                    </div>
                </div>
                <div className="ibox-content">
                    <div className="form-group">
                      <div className="col-sm-4 col-sm-offset-10">
                        <button className="btn btn-white" type="button" onClick={this.handleParamFieldUpdate.bind(this)}>Cancel</button>&nbsp;
                        <button className="btn btn-primary" type="button" onClick={this.handleParamFieldUpdate.bind(this)}>Print</button>
                      </div>
                    </div>
                </div>
            </form>


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
                            <h2>{this.props.report.name} Report Parameters</h2>
                        </div>
                        <div className="ibox-content">
                            <ParamsForm redirectTo={this.props.redirectTo} parameters={this.props.report.parameters}/>
                        </div>
		            </div>
		          </div>
		        </div>
		    </div>
        );
    }
}

export default ReportParams;