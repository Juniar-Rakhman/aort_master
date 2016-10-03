import React, { Component } from 'react';
import moment from 'moment';

class ParamRow extends Component{
    constructor(props){
        super(props);
        this.state = {
            value: props.parameter.type === 'MultiStaff' ? [] : ''
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

    handleArraySelected(e) {
        this.state.value.push(e.params.data.id);
        var paramsData = Object.assign(this.props.parameter, {value: this.state.value});
        this.props.updateParamsData(paramsData);
    }

    handleArrayUnselected(e) {
        this.state.value.forEach(function(data, index){
            if(data === e.params.data.id) {
                this.state.value.splice(index, 1);
            }
        }, this);
    }

    populateDepartment(){
        var rows = [];
        this.props.departments.forEach(function(department){
          rows.push(<option value={department.id}>{department.department}</option>);
        });
        return rows;
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

        var multiStaffConfigs =
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
                if(staff!==undefined){
                    if(staff.firstName != null){
                        return staff.firstName + " " + staff.lastName;
                    }
                    else if(staff.name != null){
                        return staff.name;
                    }
                }
            },
            allowClear: true
        };

        $('#staff-'+this.props.parameter.id).select2(configs);
        $('#staff-'+this.props.parameter.id).on('change', this.handleDataChange.bind(this));

        $('#multiStaff-'+this.props.parameter.id).select2(multiStaffConfigs);
        $('#multiStaff-'+this.props.parameter.id).on('select2:select', this.handleArraySelected.bind(this));
        $('#multiStaff-'+this.props.parameter.id).on('select2:unselect', this.handleArrayUnselected.bind(this));

        $('#department-'+this.props.parameter.id).select2({placeholder: "Please select", allowClear: true});
        $('#department-'+this.props.parameter.id).on('change', this.handleDataChange.bind(this));

        $('#datePicker-'+this.props.parameter.id).datetimepicker({
            format: 'DD/MM/YYYY'
        });
        $('#datePicker-'+this.props.parameter.id).on('dp.change', this.handleDateChange.bind(this));
    }
    
    render(){
        var inputControl;
        if (this.props.parameter.type === 'Date'){
            inputControl = (
                <div className="input-group date" id={"datePicker-" + this.props.parameter.id} >
                    <input type="text" className="form-control" value={this.state.value} required={this.props.parameter.mandatory}/>
                      <span className="input-group-addon">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </span>
                </div> );
        } else if (this.props.parameter.type === 'Staff'){
            inputControl = (
                <select id={"staff-" + this.props.parameter.id}
                        className="form-control m-b"
                        style={{width: "100%"}}
                        value={this.state.value}
                        required={this.props.parameter.mandatory}>
                    <option></option>
                </select> );
        } else if (this.props.parameter.type === 'MultiStaff'){
            inputControl = (
                <select id={"multiStaff-" + this.props.parameter.id}
                        className="form-control m-b"
                        style={{width: "100%"}}
                        value={this.state.value}
                        multiple="multiple"
                        required={this.props.parameter.mandatory}>
                </select> );
        } else if(this.props.parameter.type == 'Department'){
            inputControl = (
                <select id={"department-" + this.props.parameter.id}
                        className="form-control m-b"
                        style={{width: "100%"}}
                        value={this.state.value}
                        required={this.props.parameter.mandatory}>
                        <option></option>
                        {this.populateDepartment()}
                </select>
            );
        }else {
            inputControl = (
                <input type="text" className="form-control" value={this.state.value}
                       onChange={this.handleDataChange.bind(this)} required={this.props.parameter.mandatory}/>
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
        this.state.reportData.parameters.forEach(function(parameter){
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
        this.state.reportData.parameters.forEach(function(parameter){
            if(parameter.type === 'MultiStaff'){
                var valueStr = '';
                parameter.value.forEach(function(val) {
                    valueStr += val + ';';
                });
                parameter.value = valueStr;
            }
        });
        var report = Object.assign(this.state.reportData, {
            userId: this.props.staff.id
        });
        delete report["_links"];
        var data = JSON.stringify(report);
        console.log(data);
         $.ajax({
            type: 'POST',
            url: "/api/reports/execute",
            contentType: "application/json",
            data: data,
            success: function(data) {
                window.open("data:application/pdf;base64, " + escape(data));
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
         });
//         window.open(
//            "/api/reports/execute?report=" + data,
//            "_blank");

         e.preventDefault();
    }

    handleBack() {
        this.props.redirectTo('reportSearch');
    }

    render(){
        var parameters = this.props.report.parameters;
        var row=[];
        parameters.forEach(function(parameter){
            row.push(<ParamRow key={parameter.id} parameter={parameter} updateParamsData={this.updateParamsData} departments={this.props.departments}/>)
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
                        <button className="btn btn-primary" type="submit">Generate</button>
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
        this.state = {
            departments : null
        }
    }

    getDepartments(){
        $.ajax({
            type: 'GET',
            url: "/api/departmentReferences/search/findByActive?active=1",
            success: function(response) {
              this.setState({departments: response['_embedded']['departmentReferences']});
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentWillMount() {
        this.getDepartments();
    }

    render(){
        if(this.state.departments != null) {
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
                                    departments={this.state.departments}
                                />
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

export default ReportParams;