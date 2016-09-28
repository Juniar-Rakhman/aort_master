import React, { Component } from 'react';
import PageInfo from './pageInfo';

class CampusRow extends Component {
    constructor(props) {
        super(props);
    }

    handleCampusView() {
        this.props.redirectTo('editCampus', this.props.campus);
    }

    render() {
        var active = this.props.campus.active === true ? "Yes" : "No";
        return (
            <tr>
                <td><a href='#' onClick={this.handleCampusView.bind(this)}>{this.props.campus.campus}</a></td>
                <td>{active}</td>
            </tr>
        )
    }
}

class CampusTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        this.props.campus.forEach(function(campus){
            rows.push(
                <CampusRow campus={campus} key={campus.id} redirectTo={this.props.redirectTo} />
            );
        }, this);

        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='60%'>Campus</th>
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
                        <input type="text" placeholder="Find Campus" name="search" className="form-control"
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

class CampusSearch extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            campus: [],
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
        this.getCampusBySearch(value);
    }

    getCampusBySearch(campus) {
        $.ajax({
            type: 'GET',
            url: "api/campusReferences/search/findByCampus?campus=" + campus + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({
                    campus: response["_embedded"]["campusReferences"],
                    totalPages: response["page"]["totalPages"]
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getCampus() {
        $.ajax({
            type: 'GET',
            url: "/api/campusReferencesPage?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({
                    campus: response["content"],
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
        this.getCampus();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getCampusBySearch(this.state.filterText);
            }
            else {
                this.getCampus();
            }
        }
    }

    handleAddCampus() {
        this.props.redirectTo('entryCampus');
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Campus Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <CampusTable
                                        campus={this.state.campus}
                                        redirectTo={this.props.redirectTo}
                                    />
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={this.handleAddCampus.bind(this)}>Add Campus</button>
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

export default CampusSearch;