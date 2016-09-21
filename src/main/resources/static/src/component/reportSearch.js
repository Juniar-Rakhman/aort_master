import React, { Component } from 'react';
import PageInfo from './pageInfo';

class ReportRow extends Component {
    constructor(props) {
        super(props);
    }

    handleReportParams() {
        this.props.redirectTo('reportParam',this.props.report);
    }

    render() {
        if(this.props.isRendered) {
            return (
                <tr>
                    <td><a href="#" onClick={this.handleReportParams.bind(this)}>{this.props.report.name || ''}</a></td>
                    <td>{this.props.report.description || ''}</td>
                </tr>
            );
        }
        else {
            return null;
        }
    }
}

class ReportTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        this.props.reports.forEach(function(report){
            var isRendered = false;
            if(report.path === 'ObserverPerformanceParent') {
                isRendered = this.props.role.qualityAssurance || this.props.role.systemAdmin;
            }
            else if(report.path === 'TeamObservation') {
                isRendered = this.props.role.general;
            }
            else if(report.path === 'AcademicStaffObsOverview' || report.path === 'ObservationRecordsParent') {
                isRendered = this.props.role.general || this.props.role.qualityAssurance || this.props.role.systemAdmin;
            }
            rows.push(
                <ReportRow report={report} key={report.id} redirectTo={this.props.redirectTo} isRendered={isRendered} />
            );
        }, this);

        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='40%'>Report Name</th>
                        <th width='40%'>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        );
    }
}

class ReportSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reports: [],
            page: 0,
            size: 10,
            totalPages: 10
        };
    }

    getReports() {
        $.ajax({
            type: 'GET',
            url: "/api/reports?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
              this.setState({
                  reports: response["_embedded"]["reports"],
                  totalPages: response["page"]["totalPages"]
              });
            }.bind(this),
            error: function(xhr, status, err) {
              console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentWillMount() {
        this.getReports();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            this.getReports();
        }
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Report List</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <ReportTable
                                        reports={this.state.reports}
                                        redirectTo={this.props.redirectTo}
                                        role={this.props.role}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default ReportSearch;