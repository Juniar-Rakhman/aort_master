import React, { Component } from 'react';
import PageInfo from './pageInfo';

class RatingRow extends Component {
    constructor(props) {
        super(props);
    }

    handleRatingView() {
        this.props.redirectTo('editRating', this.props.rating);
    }

    render() {
        var active = this.props.rating.active === true ? "Yes" : "No";
        return (
            <tr>
                <td><a href='#' onClick={this.handleRatingView.bind(this)}>{this.props.rating.rating}</a></td>
                <td>{active}</td>
            </tr>
        )
    }
}

class RatingTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        this.props.ratings.forEach(function(rating){
            rows.push(
                <RatingRow rating={rating} key={rating.id} redirectTo={this.props.redirectTo} />
            );
        }, this);

        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='60%'>Rating</th>
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
                        <input type="text" placeholder="Find Rating" name="search" className="form-control"
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

class RatingSearch extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            ratings: [],
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
        this.getRatingsBySearch(value);
    }

    getRatingsBySearch(rating) {
        $.ajax({
            type: 'GET',
            url: "api/ratingReferences/search/findByRating?rating=" + rating + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({ratings: response["_embedded"]["ratingReferences"]});
                this.setState({totalPages: response["page"]["totalPages"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getRatings() {
        $.ajax({
            type: 'GET',
            url: "/api/ratingReferences/page?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
              this.setState({
                  ratings: response["content"],
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
        this.getRatings();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getRatingsBySearch(this.state.filterText);
            }
            else {
                this.getRatings();
            }
        }
    }

    handleAddRating() {
        this.props.redirectTo('entryRating');
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Rating Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <RatingTable
                                        ratings={this.state.ratings}
                                        redirectTo={this.props.redirectTo}
                                    />
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={this.handleAddRating.bind(this)}>Add Rating</button>
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

export default RatingSearch;