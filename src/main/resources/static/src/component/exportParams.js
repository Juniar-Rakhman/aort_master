import React, { Component } from 'react';
import moment from 'moment';

class ParamsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            endDate: ''
        }
    }

    handleStartDateChange(e) {
        this.setState({startDate: e.target.childNodes[0].value});
        this.checkValidity();
    }

    handleEndDateChange(e) {
        this.setState({endDate: e.target.childNodes[0].value});
        this.checkValidity();
    }

    checkValidity() {
        var startDate = moment(this.state.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        var endDate = moment(this.state.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        if(moment(startDate).isAfter(endDate)) {
            document.getElementById('startDate').setCustomValidity('Start Date must be before End Date.');
        }
        else {
            document.getElementById('startDate').setCustomValidity('');
        }
    }

    handleExport(e) {
        var startDate = moment(this.state.startDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        var endDate = moment(this.state.endDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
        window.open(
            "/api/observations/export?userId=" + this.props.staff.id + "&startDate=" + startDate + "&endDate=" + endDate,
            "_blank");
        e.preventDefault();
    }

    componentDidMount() {
        $('#startDatePicker, #endDatePicker').datetimepicker({
            format: 'DD/MM/YYYY'
        });
        $('#startDatePicker').on('dp.change', this.handleStartDateChange.bind(this));
        $('#endDatePicker').on('dp.change', this.handleEndDateChange.bind(this));
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleExport.bind(this)}>
                <div className="ibox-content">
                    <div className="form-group">
                        <div className="row m-b">
                            <div className="col-sm-12">
                              <label className="col-sm-4 control-label">Start Date</label>
                              <div className="col-sm-8">
                                <div className="input-group date" id="startDatePicker">
                                    <input type="text" className="form-control" id="startDate" value={this.state.startDate} required/>
                                      <span className="input-group-addon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                      </span>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div className="row m-b">
                            <div className="col-sm-12">
                              <label className="col-sm-4 control-label">End Date</label>
                              <div className="col-sm-8">
                                <div className="input-group date" id="endDatePicker">
                                    <input type="text" className="form-control" id="endDate" value={this.state.endDate} required/>
                                      <span className="input-group-addon">
                                        <i className="fa fa-calendar" aria-hidden="true"></i>
                                      </span>
                                </div>
                              </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ibox-content">
                    <div className="form-group">
                      <div className="col-sm-4 col-sm-offset-11">
                        <button className="btn btn-primary" type="submit">Export</button>
                      </div>
                    </div>
                </div>
            </form>
        );
    }
}

class ExportParams extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h2>Export Observation Parameters</h2>
                        </div>
                        <div className="ibox-content">
                            <ParamsForm
                                staff={this.props.staff}
                            />
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}

export default ExportParams;