import React, { Component } from 'react';
import PageInfo from './pageInfo';

class DepartmentRow extends Component {
    constructor(props) {
        super(props);
    }

    handleDepartmentView() {
        this.props.redirectTo('editDepartment', this.props.department);
    }

    render() {
        var active = this.props.department.active === true ? "Yes" : "No";
        return (
            <tr>
                <td><a href='#' onClick={this.handleDepartmentView.bind(this)}>{this.props.department.department}</a></td>
                <td>{active}</td>
            </tr>
        )
    }
}

class DepartmentTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        this.props.departments.forEach(function(department){
            rows.push(
                <DepartmentRow department={department} key={department.id} redirectTo={this.props.redirectTo} />
            );
        }, this);

        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='60%'>Department</th>
                        <th width='40%'>Active</th>
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
                        <input type="text" placeholder="Find Department" name="search" className="form-control"
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

class DepartmentSearch extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            departments: [],
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
        this.getDepartmentBySearch(value);
    }

    getDepartmentBySearch(department) {
        $.ajax({
            type: 'GET',
            url: "api/departmentReferences/search/findByDepartment?department=" + department + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({
                    departments: response["_embedded"]["departmentReferences"],
                    totalPages: response["page"]["totalPages"]
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getDepartment() {
        $.ajax({
            type: 'GET',
            url: "/api/departmentReferencesPage?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({
                    departments: response["content"],
                    totalPages: response["totalPages"]
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
        this.getDepartment();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getDepartmentBySearch(this.state.filterText);
            }
            else {
                this.getDepartment();
            }
        }
    }

    handleAddDepartment() {
        this.props.redirectTo('entryDepartment');
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Department Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <DepartmentTable
                                        departments={this.state.departments}
                                        redirectTo={this.props.redirectTo}
                                    />
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={this.handleAddDepartment.bind(this)}>Add Department</button>
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

export default DepartmentSearch;