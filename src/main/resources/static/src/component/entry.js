import React, { Component } from 'react'

class Entry extends Component {
  render() {
    var style = {
      paddingLeft: "55px"
    }
    return (
      <div className="col-lg-12">
        <div className="ibox float-e-margins">
          <div className="ibox-content">
            <form method="get" className="form-horizontal">
              <div className="ibox-title">
                <h5>Learner-centred teaching enables all learners to achieve</h5>
              </div>
              <div className="ibox-content">
                <div className="form-group">
                  <div className="form-group" style={{paddingLeft: "55px"}}>Learning strategies cater for the needs of the learners</div>
                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Strengths</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Improvement</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label className="col-sm-2 control-label">Evidence</label>
                      <div className="col-sm-10">
                        <textarea type="text" className="form-control m-b" required></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>
                  <div className="form-group" style={style}>Learning activities are varied and interesting</div>
                    <div className="form-group">
                      <div className="col-sm-3">
                        <label className="col-sm-6 control-label">Strengths</label>
                        <div className="col-sm-6">
                          <select className="form-control m-b" name="account">
                            <option>Yes</option>
                            <option>No</option>
                          </select>
                        </div>
                      </div>
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Improvement</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label className="col-sm-2 control-label">Evidence</label>
                      <div className="col-sm-10">
                        <textarea type="text" className="form-control m-b"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>
                  <div className="form-group" style={style}>Learning time is managed effectively</div>
                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Strengths</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Improvement</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label className="col-sm-2 control-label">Evidence</label>
                      <div className="col-sm-10">
                        <textarea type="text" className="form-control m-b"></textarea>
                      </div>
                    </div>
                  </div>
                  <div className="hr-line-dashed"></div>
                  <div className="form-group" style={style}>Questioning techniques progress learning</div>
                  <div className="form-group">
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Strengths</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-3">
                      <label className="col-sm-6 control-label">Improvement</label>
                      <div className="col-sm-6">
                        <select className="form-control m-b" name="account">
                          <option>Yes</option>
                          <option>No</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-sm-6">
                      <label className="col-sm-2 control-label">Evidence</label>
                      <div className="col-sm-10">
                        <textarea type="text" className="form-control m-b"></textarea>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="col-sm-4 col-sm-offset-9">
                    <button className="btn btn-white" type="submit">Cancel</button>
                    <button className="btn btn-primary" type="submit">Save changes</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Entry;