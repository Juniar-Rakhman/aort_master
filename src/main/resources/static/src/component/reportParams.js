import React, { Component } from 'react';
import moment from 'moment';

class ParamRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: ''
        };
    }
    
    handleParamFieldUpdate(){
        console.log('update');
    }

    handleDateChange(e){
        var paramsData = Object.assign(this.props.parameter, {value: e.target.childNodes[0].value});
        this.setState({value: e.target.childNodes[0].value});
        this.props.updateParamsData(paramsData);
    }
    
    handleDataChange(e){
        var paramsData = Object.assign(this.props.parameter, {value: e.target.value});
        this.setState({value: e.target.value});
        this.props.updateParamsData(paramsData);
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
            }
        };
        $('#staff-'+this.props.parameter.id).select2(configs);
        $('#staff-'+this.props.parameter.id).on('change', this.handleDataChange.bind(this));

        $('#datePicker-'+this.props.parameter.id).datetimepicker({
            format: 'DD/MM/YYYY'
        });
        $('#datePicker-'+this.props.parameter.id).on('dp.change', this.handleDateChange.bind(this));
    }
    
    render(){
        var inputControl;
        if (this.props.parameter.type == 'Date'){
            inputControl = (
                <div className="input-group date" id={"datePicker-" + this.props.parameter.id} >
                    <input type="text" className="form-control" value={this.state.value} required/>
                      <span className="input-group-addon">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </span>
                </div> );
        } else if (this.props.parameter.type == 'Staff'){
            inputControl = (
                <select id={"staff-" + this.props.parameter.id}
                        className="form-control m-b"
                        style={{width: "100%"}}
                        value={this.state.value}
                        required>
                    <option></option>
                </select> );
        } else {
            inputControl = (
                <input type="text" className="form-control" value={this.state.value}
                       onChange={this.handleDataChange.bind(this)} required/>
                )
        }
        return(
          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">{this.props.parameter.name}</label>
              <div className="col-sm-8">
                {inputControl}
              </div>
            </div>
          </div>
        )
    }
}

class ParamsForm extends Component{
    constructor(props){
        super(props);
        this.state = {
            reportData : props.report || {}
        }

        this.updateParamsData = this.updateParamsData.bind(this);
    }
    
    updateParamsData(paramsData){
        var parameters = this.state.reportData.parameters;
        parameters.forEach(function(parameter){
            if(parameter.id === paramsData.id){
                var value = paramsData.value;
                if(paramsData.type === 'Date') {
                    value = moment(paramsData.value, 'DD/MM/YYYY').format('YYYY-MM-DD');
                }
                Object.assign(parameter, {value: value});
            }
        }, this);
    }

    handlePrint(e) {
        console.log('Printing report');
        var report = Object.assign(this.state.reportData, {
            userId: this.props.staff.id,
            format: "PDF"
        });
        var data = JSON.stringify(report);
        console.log(data);
         $.ajax({
            type: 'POST',
            url: "/api/reports/execute",
            contentType: "application/json",
            data: data,
            success: function(response) {
                if(response.success) {
                    setTimeout(function(){
                        window.open(response.result, '_blank');
                        }, 1000);
                    }
                else {
                    alert(response.result);
                }
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
         });

         e.preventDefault();
    }

    handleBack() {
        this.props.redirectTo('reportSearch');
    }

    render(){
        var parameters = this.props.report.parameters;
        var row=[];
        parameters.forEach(function(parameter){
            row.push(<ParamRow key={parameter.id} parameter={parameter} updateParamsData={this.updateParamsData}/>)
        },this);
        return (
    	    <form className="form-horizontal" onSubmit={this.handlePrint.bind(this)}>
                <div className="ibox-content">
                    {row}
                </div>
                <div className="ibox-content">
                    <div className="form-group">
                      <div className="col-sm-4 col-sm-offset-10">
                        <button className="btn btn-white" type="button" onClick={this.handleBack.bind(this)}>Cancel</button>&nbsp;
                        <button className="btn btn-primary" type="submit">Print</button>
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
                            <ParamsForm
                                redirectTo={this.props.redirectTo}
                                report={this.props.report}
                                staff={this.props.staff}
                                redirectTo={this.props.redirectTo}
                            />
                        </div>
		            </div>
		          </div>
		        </div>
		    </div>
        );
    }
}

export default ReportParams;