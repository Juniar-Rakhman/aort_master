import React, { Component } from 'react';

class ParamRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            [this.props.parameter.name]: ""
        };
    }
    
    handleParamFieldUpdate(){
        console.log('update');
    }

    handleDateChange(e){
        this.setState({[this.props.parameter.name]: e.target.childNodes[0].value});
    }
    
    handleDataChange(e){
        this.setState({[this.props.parameter.name]: e.target.value});
    }

    displayInfo(){
        var info='';
        if (this.props.parameter.type == 'Date'){
            info=<span><p>Date format [yyyy-mm-dd]</p></span>;
            return info;
        }
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
        $('#staff').select2(configs);
        $('#staff').on('change', this.handleDataChange.bind(this));

        $($('[id^=datePicker-]')).datetimepicker({
            format: 'DD/MM/YYYY'
        });
        $($('[id^=datePicker-]')).on('dp.change', this.handleDateChange.bind(this)).trigger('dp.change');
    }
    
    render(){
        var inputControl;
        if (this.props.parameter.type == 'Date'){
            inputControl = ( <div className="input-group date" id={"datePicker-" + this.props.parameter.name} >
                                <input type="text" className="form-control" value=""/>
                                  <span className="input-group-addon">
                                    <i className="fa fa-calendar" aria-hidden="true"></i>
                                  </span>
                
                            </div> );
        } else if (this.props.parameter.type == 'Staff'){
            inputControl = (<select id="staff"
                                    className="form-control m-b"
                                    style={{width: "100%"}}
                                    value="">
                                <option></option>
                            </select>);
        } else {
            inputControl = (
                <input type="text" className="form-control" value=""
                       onChange={this.handleDataChange().bind(this)}/>
                )
        }
        return(
          <div className="row m-b">
            <div className="col-sm-6">
              <div className="row">
                  <label className="col-sm-4 control-label">{this.props.parameter.name}</label>
                  {inputControl}
                  {this.displayInfo()}
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
        this.state = {
            paramsData : {}
        }
    }

    handleParamFieldUpdate(){
        console.log('update');
    }
    
    updateParamsData(paramsData){
        var newReport = Object.assign(this.state.paramsData, paramsData)
        this.setState({observationData: newObservation});
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