import React, { Component } from 'react';
import ConfirmDialog from './confirmDialog';

class SessionForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            session: this.props.session.session || '',
            active: this.props.session.active || true
        }
        this.handleYes = this.handleYes.bind(this);
        this.handleNo = this.handleNo.bind(this);
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
        if(this.props.mode === 'Create') {
            console.log('Creating data')
            var data = JSON.stringify(this.state);
            console.log(data);
            $.ajax({
                type: 'POST',
                url: "/api/sessionReferences",
                data: data,
                contentType: "application/json",
                success: function(response) {
                    console.log(response);
                    this.props.redirectTo('sessionSearch');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
            });
        }
        else if(this.props.mode === 'Edit') {
            var session = Object.assign(this.state, {id: this.props.session.id});
            var data = JSON.stringify(session);
            console.log(data);
            $.ajax({
                type: 'PUT',
                url: "/api/sessionReferences",
                contentType: "application/json",
                data: data,
                success: function(response) {
                   console.log(response);
                   this.props.redirectTo('sessionSearch');
                }.bind(this),
                error: function(xhr, status, err) {
                    console.error(this.props.url, status, err.toString());
                }.bind(this)
             });
        }

        e.preventDefault();
    }

    handleDelete() {
        $('#confirm-dialog').modal('show');
    }

    handleYes() {
        var session = Object.assign(this.state, {id: this.props.session.id});
        var data = JSON.stringify(session);
        console.log(data);
        $.ajax({
            type: 'DELETE',
            url: "/api/sessionReferences",
            data: data,
            contentType: "application/json",
            success: function(response) {
                console.log(response);
                this.props.redirectTo('sessionSearch');
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    handleNo() {
        return;
    }

    render() {
        var buttons = null;
        if(this.props.mode === 'Create') {
            buttons = (
                <div className="col-sm-4 col-sm-offset-10">
                    <button className="btn btn-white" type="button" onClick={this.handleBack.bind(this)}>Cancel</button>&nbsp;
                    <button className="btn btn-primary" type="submit">Save</button>
                </div>
            )
        }
        else if(this.props.mode === 'Edit') {
            buttons = (
                <div className="col-sm-4 col-sm-offset-9">
                    <button className="btn btn-white" type="button" onClick={this.handleBack.bind(this)}>Cancel</button>&nbsp;
                    <button className="btn btn-primary" type="submit">Save</button>&nbsp;
                    <button className="btn btn-primary" type="button" onClick={this.handleDelete.bind(this)}>Delete</button>
                </div>
            );
        }
        return (
            <form className="form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                <ConfirmDialog
                    title="Delete"
                    body={<div>
                            <p>You are about to delete this data.</p>
                            <p>Do you want to proceed?</p>
                          </div>}
                    handleYes={this.handleYes}
                    handleNo={this.handleNo}
                />
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
                      {buttons}
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