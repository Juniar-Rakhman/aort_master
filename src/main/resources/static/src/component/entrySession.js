import React, { Component } from 'react';

class SessionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: props.session.session || '',
            active: props.session.active || false
        }
    }

    handleSessionChange(e) {
        this.setState({session: e.target.value});
    }

    handleActiveChange(e) {
        this.setState({active: e.target.checked});
    }

    handleBack() {
        this.props.redirectTo('sessionSearch');
    }

    handleSubmit(e) {
        if(this.props.mode === 'Edit') {
            Object.assign(this.state, {id: this.props.session.id});
        }
        var data = JSON.stringify(this.state);
        $.ajax({
            type: 'POST',
            url: "/api/sessionReferences",
            data: data,
            contentType: "application/json",
            success: function(response) {
                this.props.redirectTo('sessionSearch');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });

        e.preventDefault();
    }

    render() {
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <div className="ibox-content">
                    <div className="form-group">
                        <div className="row m-b">
                            <div className="col-sm-12">
                                <label className="col-sm-4 control-label">Session</label>
                                <div className="col-sm-8">
                                    <input
                                        type="text"
                                        placeholder="100 characters allowed"
                                        maxLength={100}
                                        className="form-control m-b"
                                        onChange={this.handleSessionChange.bind(this)}
                                        value={this.state.session}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row m-b">
                            <div className="col-sm-12">
                                <label className="col-sm-4 control-label">Active</label>
                                <div className="col-sm-8">
                                    <input
                                        type="checkbox"
                                        checked={this.state.active}
                                        onClick={this.handleActiveChange.bind(this)}
                                    />
                                </div>
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

class EntrySession extends Component {
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
                            <h2>Session - {this.props.title}</h2>
                        </div>
                        <div className="ibox-content">
                            <SessionForm
                                session={this.props.session || {}}
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

export default EntrySession;