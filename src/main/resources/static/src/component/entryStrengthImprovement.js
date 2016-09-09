import React, { Component } from 'react';

class StrengthImprovementForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            category: props.strengthImprovement.category || '',
            criteria: props.strengthImprovement.criteria || ''
        };
    }

    handleCategoryChange(e) {
        this.setState({category: e.target.value});
    }

    handleCriteriaChange(e) {
        this.setState({criteria: e.target.value});
    }

    handleSubmit(e) {
        if(this.props.mode === 'Create') {
            console.log('Creating data')
            var data = JSON.stringify(this.state);
            console.log(data);
            $.ajax({
                type: 'POST',
                url: "/api/strengthImprovementReferences",
                data: data,
                contentType: "application/json",
                success: function(response) {
                    console.log(response);
                    this.props.redirectTo('strengthImprovementSearch');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        else if(this.props.mode === 'Edit') {
            var strengthImprovement = Object.assign(this.state, {id: this.props.strengthImprovement.id});
            var data = JSON.stringify(strengthImprovement);
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: "/api/strengthImprovementReferences",
                contentType: "application/json",
                data: data,
                success: function(response) {
                   console.log(response);
                   this.props.redirectTo('strengthImprovementSearch');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
             });
        }

        e.preventDefault();
    }

    handleBack() {
        this.props.redirectTo('strengthImprovementSearch');
    }

    populateCategories() {
        var rows = [];
        this.props.categories.forEach(function(category){
            rows.push(<option value={category}>{category}</option>);
        });
        return rows;
    }
    componentDidMount() {
        $('#category').select2({tags: true});
        $('#category').on('change', this.handleCategoryChange.bind(this)).trigger('change');
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <div className="ibox-content">
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Category</label>
                            <div className="col-sm-8">
                                <select id="category"
                                    className="form-control m-b"
                                    style={{width: "100%"}}
                                    value={this.state.category}>
                                    {this.populateCategories()}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Criteria</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    placeholder="100 characters allowed"
                                    maxLength={100}
                                    className="form-control m-b"
                                    onChange={this.handleCriteriaChange.bind(this)}
                                    value={this.state.criteria}
                                    required
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="ibox-content">
                    <div className="form-group">
                      <div className="col-sm-4 col-sm-offset-10">
                        <button className="btn btn-white" type="button" onClick={this.handleBack.bind(this)}>Cancel</button>&nbsp;
                        <button className="btn btn-primary" type="submit">Save</button>
                      </div>
                    </div>
                </div>
            </form>
        );
    }
}

class EntryStrengthImprovement extends Component {
    constructor(props){
		super(props);
        this.state = {
            categories : null
        }
	}

    getCategories() {
        $.ajax({
            type: 'GET',
            url: "/api/strengthImprovementReferences/category",
            success: function(response) {
                this.setState({categories: response});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    componentWillMount() {
        this.getCategories();
    }

	render() {
	    if(this.state.categories != null) {
            return (
                <div className="wrapper-content animated fadeInRight">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            <div className="ibox-title">
                                <h2>Strength Improvement {this.props.title}</h2>
                            </div>
                            <div className="ibox-content">
                                <StrengthImprovementForm
                                    strengthImprovement={this.props.strengthImprovement || {}}
                                    categories={this.state.categories}
                                    redirectTo={this.props.redirectTo}
                                    mode={this.props.title}
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

export default EntryStrengthImprovement;