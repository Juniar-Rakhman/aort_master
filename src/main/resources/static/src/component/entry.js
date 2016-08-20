import React, { Component } from 'react'

class ObserveHeader extends Component{
  constructor(props){
    super(props);
    console.log('test ini agi:'+this.props.disabled)
  }
  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Teacher's Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" disabled={false}/>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Line Manager's Line</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Primary Observer's Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Secondary Observer's Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Course (including level)</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Programme (including level)</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners on register</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learniers at start</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">No of learners late</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Total no. of learners in session</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Campus Location</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Department</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>
          
          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Context of Sesseion (include stage in programme)</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Observation Notes</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" />
              </div>
            </div>
          </div>

        </div>
      </div>
    )
  }
}

class ObserveEntryRow extends Component{
  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group" style={{ paddingLeft: "55px" }}>Learning strategies cater for the needs of the learners</div>
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
        </div>
      </div>
    )
  }
}

class ObserveEntryCategory extends Component{
  render(){
    return(
      <div className="ibox-title">
        <h5>Learner-centred teaching enables all learners to achieve</h5>
      </div>
    )
  }
}

class ObserveEntries extends Component{
  render(){
    return(
      <div className="ibox-content">
        <ObserveEntryCategory />
        <ObserveEntryRow />
      </div>
    )
  }
}

class ObserveSumarry extends Component{
  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Rating</label>
              <div className="col-sm-8">
                <select className="form-control m-b" name="account">
                  <option>Excellent</option>
                  <option>Good</option>
                  <option>Requires Improvement</option>
                  <option>Requires Intervention and Support</option>
                </select>
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Sumarry Evaluation</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Identified strengths for sharing</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-12">
              <label className="col-sm-4 control-label">Additional Comments</label>
              <div className="col-sm-8">
                <textarea type="text" className="form-control m-b" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ObserveModerate extends Component{
  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Has been moderated</label>
              <div className="col-sm-8">
                <select className="form-control m-b" name="account">
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Moderator Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Learning Coach Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
            <div className="col-sm-6">
              <label className="col-sm-4 control-label">Head of Department Name</label>
              <div className="col-sm-8">
                <input type="text" className="form-control m-b" />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

class ObserveSubmitButtons extends Component{
  render(){
    return(
      <div className="ibox-content">
        <div className="form-group">
          <div className="col-sm-4 col-sm-offset-9">
            <button className="btn btn-white" type="submit">Cancel</button>
            <button className="btn btn-primary" type="submit">Save changes</button>
          </div>
        </div>
      </div>
    )
  }
}

class Entry extends Component {
  render() {
    var style = {
      paddingLeft: "55px"
    }
    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
          <div className="col-lg-12">
            <div className="ibox float-e-margins">
              <div className="ibox-content">
                <form method="get" className="form-horizontal">
                  <ObserveHeader disabled='false' />
                  <ObserveEntries/>
                  <ObserveSumarry />
                  <ObserveModerate />
                  <ObserveSubmitButtons />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Entry;