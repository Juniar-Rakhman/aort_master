import React, { Component } from 'react';
import PageInfo from './pageInfo';

class StrengthImprovementRow extends Component {
    constructor(props) {
        super(props);
    }

    handleStrengthImprovementView(index) {
        this.props.redirectTo('editStrengthImprovement', {
            id: this.props.id[index],
            category: this.props.category,
            criteria: this.props.criteria[index],
            active: this.props.active[index]});
    }

    handleCategoryUpdate() {
        this.props.redirectTo('updateCategory', this.props.category);
    }

    render() {
        var rows = [];
        rows.push(
            <tr className="gradeX">
                <td rowSpan={this.props.count}>
                    <a href='#' onClick={this.handleCategoryUpdate.bind(this)}>
                        {this.props.category}
                    </a>
                </td>
                <td>
                     <a href='#' onClick={this.handleStrengthImprovementView.bind(this, 0)}>
                        {this.props.criteria[0]}
                     </a>
                </td>
                <td>{this.props.active[0] === true ? "Yes" : "No"}</td>
            </tr>
        );
        if(this.props.criteria.length > 1) {
            for (var i = 1; i < this.props.criteria.length; i++) {
                rows.push(
                    <tr className="gradeX">
                        <td>
                            <a href='#' onClick={this.handleStrengthImprovementView.bind(this, i)}>
                                {this.props.criteria[i]}
                            </a>
                        </td>
                        <td>{this.props.active[i] === true ? "Yes" : "No"}</td>
                    </tr>
                );
            }
        }

        return <tbody>{rows}</tbody>;
    }
}

class StrengthImprovementTable extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var rows = [];
        var criteria = [];
        var id = [];
        var active = [];
        var count = 1;
        this.props.strengthImprovements.forEach(function(strengthImprovement, index) {
            criteria.push(strengthImprovement.criteria);
            id.push(strengthImprovement.id);
            active.push(strengthImprovement.active);
            if(this.props.strengthImprovements[index+1] != null) {
                if(this.props.strengthImprovements[index+1].category != strengthImprovement.category) {
                    rows.push(<StrengthImprovementRow
                       category={strengthImprovement.category}
                       criteria={criteria}
                       id={id}
                       active={active}
                       count={count}
                       key={strengthImprovement.id}
                       redirectTo={this.props.redirectTo}
                    />);
                    count = 1;
                    criteria = [];
                    id = [];
                    active = [];
                }
                else {
                    count++;
                }
            }
            else {
                rows.push(<StrengthImprovementRow
                   category={strengthImprovement.category}
                   criteria={criteria}
                   id={id}
                   active={active}
                   count={count}
                   key={strengthImprovement.id}
                   redirectTo={this.props.redirectTo}
                />);
            }
        }, this);

        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='40%'>Category</th>
                        <th width='40%'>Criteria</th>
                        <th width='10%'>Active</th>
                    </tr>
                </thead>
                {rows}
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
                        <input type="text" placeholder="Find Category or Criteria" name="search" className="form-control"
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

class StrengthImprovementSearch extends Component {
    constructor(props) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            strengthImprovements: [],
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
        this.getStrengthImprovementsBySearch(value);
    }

    getStrengthImprovementsBySearch(filter) {
        $.ajax({
            type: 'GET',
            url: "api/strengthImprovementReferences/search/findByCategoryOrCriteria?filter=" + filter + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({strengthImprovements: response["_embedded"]["strengthImprovementReferences"]});
                this.setState({totalPages: response["page"]["totalPages"]});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getStrengthImprovements() {
        $.ajax({
            type: 'GET',
            url: "api/strengthImprovementReferences/page?page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
              this.setState({
                  strengthImprovements: response["content"],
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
        this.getStrengthImprovements();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getStrengthImprovementsBySearch(this.state.filterText);
            }
            else {
                this.getStrengthImprovements();
            }
        }
    }

    handleAddStrengthImprovement() {
        this.props.redirectTo('entryStrengthImprovement');
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Strength Improvement Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                    />
                                    <StrengthImprovementTable
                                        strengthImprovements={this.state.strengthImprovements}
                                        redirectTo={this.props.redirectTo}
                                    />
                                    <button className="btn btn-primary"
                                        type="button"
                                        onClick={this.handleAddStrengthImprovement.bind(this)}>Add Strength Improvement</button>
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

export default StrengthImprovementSearch;