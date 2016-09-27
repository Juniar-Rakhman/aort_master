import React, { Component } from 'react';

class ConfirmDialog extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title || '',
            body: props.body || {}
        }
    }

    checkIE() {
        var ua = window.navigator.userAgent;
        if(ua.indexOf('MSIE ') > 0 || ua.indexOf('Trident/') > 0 || ua.indexOf('Edge/') > 0) {
            return true;
        }
        else {
            return false;
        }
    }

    render() {
        return (
          <div className="modal fade" id="confirm-dialog" role="dialog" tabIndex="-1" data-backdrop={!this.checkIE()}>
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <a href="#" className="close" data-dismiss="modal" aria-label="close">&times;</a>
                  <h4 className="modal-title">Confirm {this.state.title}</h4>
                </div>
                <div className="modal-body">
                  {this.state.body}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-white" data-dismiss="modal" type="button" onClick={this.props.handleNo.bind(this)}>Cancel</button>
                  <button className="btn btn-primary" data-dismiss="modal" type="button" onClick={this.props.handleYes.bind(this)}>{this.state.title}</button>
                  <button type="submit" className="hide"></button>
                </div>
              </div>
            </div>
          </div>
        );
    }
}

export default ConfirmDialog;