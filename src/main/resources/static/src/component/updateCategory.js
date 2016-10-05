import React, { Component } from 'react';

class UpdateCategory extends Component {
    constructor(props){
		super(props);
        this.state = {
            category: props.category || ''
        }
	}

	handleCategoryChange(e) {
	    this.setState({category: e.target.value});
	}

	handleSubmit(e) {
	    var data = JSON.stringify({
            oldCategory: this.props.category,
            newCategory: this.state.category
        });
        $.ajax({
            type: 'PUT',
            url: "/api/strengthImprovementReferences/category",
            data: data,
            contentType: "application/json",
            success: function(response) {
                this.props.redirectTo('strengthImprovementSearch');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        e.preventDefault();
	}

    handleBack() {
        this.props.redirectTo('strengthImprovementSearch');
    }

	render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h2>Strength Improvement Category - Edit</h2>
                        </div>
                        <div className="ibox-content">
                            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                                <div className="ibox-content">
                                    <div className="form-group">
                                        <div className="col-sm-12">
                                            <label className="col-sm-4 control-label">Category</label>
                                            <div className="col-sm-8">
                                                <input
                                                    type="text"
                                                    placeholder="100 characters allowed"
                                                    maxLength={100}
                                                    className="form-control m-b"
                                                    onChange={this.handleCategoryChange.bind(this)}
                                                    value={this.state.category}
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
                        </div>
                    </div>
                  </div>
                </div>
            </div>
        );
	}
}

export default UpdateCategory;