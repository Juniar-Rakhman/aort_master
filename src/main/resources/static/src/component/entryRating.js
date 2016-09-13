import React, { Component } from 'react';

class RatingForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: this.props.rating.rating || ''
        }
    }

    handleRatingChange(e) {
        this.setState({rating: e.target.value});
    }

    handleBack() {
        this.props.redirectTo('ratingSearch');
    }

    handleSubmit(e) {
        if(this.props.mode === 'Create') {
            console.log('Creating data')
            var data = JSON.stringify(this.state);
            console.log(data);
            $.ajax({
                type: 'POST',
                url: "/api/ratingReferences",
                data: data,
                contentType: "application/json",
                success: function(response) {
                    console.log(response);
                    this.props.redirectTo('ratingSearch');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        else if(this.props.mode === 'Edit') {
            var rating = Object.assign(this.state, {id: this.props.rating.id});
            var data = JSON.stringify(rating);
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: "/api/ratingReferences",
                contentType: "application/json",
                data: data,
                success: function(response) {
                   console.log(response);
                   this.props.redirectTo('ratingSearch');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
             });
        }

        e.preventDefault();
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <div className="ibox-content">
                    <div className="form-group">
                        <div className="col-sm-12">
                            <label className="col-sm-4 control-label">Rating</label>
                            <div className="col-sm-8">
                                <input
                                    type="text"
                                    placeholder="50 characters allowed"
                                    maxLength={50}
                                    className="form-control m-b"
                                    onChange={this.handleRatingChange.bind(this)}
                                    value={this.state.rating}
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

class EntryRating extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="ibox float-e-margins">
                        <div className="ibox-title">
                            <h2>Rating {this.props.title}</h2>
                        </div>
                        <div className="ibox-content">
                            <RatingForm
                                rating={this.props.rating || {}}
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
}

export default EntryRating;