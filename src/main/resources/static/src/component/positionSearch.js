import React, { Component } from 'react';
import PageInfo from './pageInfo';

class PositionRow extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var isActive = this.props.position.isActive ? "Yes" : "No";
        return (
            <tr>
                <td>{this.props.position.title || ''}</td>
                <td>{this.props.position.lineManagerTitle || ''}</td>
                <td>{this.props.position.fte || ''}</td>
                <td>{isActive}</td>
            </tr>
        );
    }
}

class PositionTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        this.props.positions.forEach(function(position){
            rows.push(
                <PositionRow position={position} key={position.id} redirectTo={this.props.redirectTo} />
            );
        }, this);

        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='40%'>Title</th>
                        <th width='40%'>Manager</th>
                        <th width='10%'>FTE</th>
                        <th width='10%'>Active</th>
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
                        <input type="text" placeholder="Find Position" name="search" className="form-control"
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

class PositionSearch extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            positions: [],
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
        this.getPositionsBySearch(value);
    }

    getPositionsBySearch(title) {
        $.ajax({
            type: 'GET',
            url: "api/positions/search/findByTitle?title=" + title + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({positions: response["_embedded"]["positions"]});
                this.setState({totalPages: response["page"]["totalPages"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getPositions() {
        $.ajax({
            type: 'GET',
            url: "/api/positions?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
              this.setState({
                  positions: response["content"],
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
        this.getPositions();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getPositionsBySearch(this.state.filterText);
            }
            else {
                this.getPositions();
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
                                <h2>Position Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <PositionTable
                                        positions={this.state.positions}
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

export default PositionSearch;