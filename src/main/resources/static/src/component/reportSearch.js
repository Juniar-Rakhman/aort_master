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
        return (
            <tr>
                <td><a href="#" onClick={this.handleReportParams.bind(this)}>{this.props.report.name || ''}</a></td>
                <td>{this.props.report.description || ''}</td>
            </tr>
        );
    }
}

class ReportTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        this.props.reports.forEach(function(report){
            rows.push(
                <ReportRow report={report} key={report.id} redirectTo={this.props.redirectTo} />
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

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {inputTextVal: ''}
    }

    handleChange(e) {
        this.props.onUserInput(
            this.refs.filterTextInput.value
        )
        e.preventDefault();
    }

    handleTextChange(e){
        this.setState({inputTextVal: e.target.value});
    }
    render() {
        var style = {
          "margin-bottom": "0px"
        }
        return (

            <div className="m-b">
                <form role="form" className="form-inline" onSubmit={this.handleChange.bind(this)}>
                    <div className="form-group">
                        <input type="text" placeholder="Find Report" name="search" className="form-control"
                            ref="filterTextInput"
                            onChange={this.handleTextChange.bind(this)}/> &nbsp;
                    </div>

                    <button
                        style={style}
                        className="btn btn-sm btn-primary"
                        type="submit"
                        disabled={this.state.inputTextVal === ''}>Search
                    </button>

                </form>
            </div>
        );
    }
}

class ReportSearch extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            reports: [],
            filterText: '',
            page: 0,
            size: 10,
            totalPages: 10
        };
    }

    handleUserInput(value){
        this.setState({
            page: 0,
            filterText: value
        });
        this.getReportsBySearch(value);
    }

    getReportsBySearch(name) {
//        $.ajax({
//            type: 'GET',
//            url: "api/reports/search/findByTitle?title=" + title + "&page=" + this.state.page + "&size=" + this.state.size,
//            success: function(response) {
//                this.setState({reports: response["_embedded"]["reports"]});
//                this.setState({totalPages: response["page"]["totalPages"]});
//            }.bind(this),
//            error: function(xhr, status, err) {
//                console.error(this.props.url, status, err.toString());
//            }.bind(this)
//        });
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

    handlePage(page) {
        this.setState({page: page});
    }

    handleSize(size) {
        this.setState({size: size});
    }

    componentWillMount() {
        this.getReports();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getReportsBySearch(this.state.filterText);
            }
            else {
                this.getReports();
            }
        }
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Report Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <ReportTable
                                        reports={this.state.reports}
                                        redirectTo={this.props.redirectTo}
                                    />
                                    <PageInfo
                                        page={this.state.page}
                                        totalPages={this.state.totalPages}
                                        size={this.state.size}
                                        handlePage={this.handlePage}
                                        handleSize={this.handleSize}
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