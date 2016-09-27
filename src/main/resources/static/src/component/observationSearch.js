import React, { Component } from 'react';
import PageInfo from './pageInfo';
import moment from 'moment';

class ObservationRow extends Component {
    constructor(props){
        super(props);
    }
    
    handleObservationView() {
        this.props.redirectTo('view', this.props.observation.id);
    }
    
    render() {
        var obsStatus = this.props.observation.completed == true ? "Completed" : "Open" ;
        return (
            <tr className="gradeX">
                <td><a href='#' onClick={this.handleObservationView.bind(this)}>{this.props.observation.staffFirstName} {this.props.observation.staffLastName}</a></td>
                <td>{this.props.observation.courseName}</td>
                <td>{this.props.observation.observerPrimaryFirstName} {this.props.observation.observerPrimaryLastName}</td>
                <td>{obsStatus}</td>
                <td>{moment(this.props.observation.date).format('DD/MM/YYYY')} / {this.props.observation.time.substring(0,5)}</td>
            </tr>
        );
    }
}

class ObservationTable extends Component {
    constructor(props){
        super(props);
    }
    
    render() {
        var rows = [];
        this.props.observations.forEach(function (observation) {
            rows.push(<ObservationRow
                            observation={observation}
                            key={observation.observationId}
                            redirectTo={this.props.redirectTo}
                            role={this.props.role}
                       />);
        }, this);
        return (
            <table className="table table-striped table-bordered table-hover dataTables-example" >
                <thead>
                    <tr>
                        <th width='25%'>Staff Name</th>
                        <th width='20%'>Course Name</th>
                        <th width='25%'>Lead Observer</th>
                        <th width='10%'>Status</th>
                        <th width='20%'>Date / Time</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
}

class SearchBar extends Component {
    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this);
        var date = moment().format('DD/MM/YYYY');
        this.state = {staff: props.searchCriteria.staff || '',
            leadObserver: props.searchCriteria.leadObserver || '',
            date: props.searchCriteria.date != null ? moment(props.searchCriteria.date).format('DD/MM/YYYY') : date,
            completed: props.searchCriteria.completed || '',
            lead: {firstName: '', lastName:''},
            teacher: {firstName:'',lastName:''},

        }
    }

    handleChange(e) {
        this.props.onUserInput()
        e.preventDefault();
    }

    handleTeacherChange(e) {
        var newState = Object.assign(this.state, {staff: e.target.value});
        this.setState({staff: e.target.value})
        this.props.updateSearchCriteria(newState);
    }

    handleLeadChange(e) {
        var newState = Object.assign(this.state, {leadObserver: e.target.value});
        this.setState({leadObserver: e.target.value})
        this.props.updateSearchCriteria(newState);
    }

    handleDateChange(e) {
        var newState = Object.assign(this.state, {date: e.target.childNodes[0].value});
        this.setState({date: e.target.childNodes[0].value});
        this.props.updateSearchCriteria(newState);
    }

    handleStatusChange(e) {
        var newState = Object.assign(this.state, {completed: e.target.value});
        this.setState({completed: e.target.value})
        this.props.updateSearchCriteria(newState);
    }

  componentDidMount() {
    var configs =
       {
        ajax: {
          url: 'api/staffs/search/findByStaffName',
          data: function(params){
              return {
                  name: params.term
              }
          },
          processResults: function (data) {
              return {
                  results: data["_embedded"]["staffs"]
              }
          },
          delay: 250
        },
        templateResult: function(staff){
          return staff.firstName + " " + staff.lastName;
        },
        templateSelection: function formatRepoSelection (staff) {
          if(staff===undefined){
            return "Please select";
          }
          else{
            if(staff.firstName != null){
              return staff.firstName + " " + staff.lastName;
            }
            else if(staff.name != null){
              return staff.name;
            }
            return "Please select";
          }
        },
        initSelection: function(element, callback) {
          var value = $(element).attr('data-init');
          callback({name: value});
        }
      };

    $('#teacher').select2(configs);
    $('#teacher').on('change', this.handleTeacherChange.bind(this));

    $('#lead').select2(configs);
    $('#lead').on('change', this.handleLeadChange.bind(this));

    $('#datePicker').datetimepicker({
        format: 'DD/MM/YYYY'
    });
    $('#datePicker').on('dp.change', this.handleDateChange.bind(this)).trigger('dp.change');
  }
    render() {
        var style = {
          "margin-bottom": "0px"
        }
        return (
          <div className="panel panel-default">
            <div className="panel-heading">Search Criteria</div>
            <div className="panel-body">
                <form role="form" className="form-inline" onSubmit={this.handleChange.bind(this)}>

                  <div className="col-lg-6">
                    <label className="col-sm-4 control-label">Teacher's Name</label>
                    <div className="col-sm-8 m-b">
                        <select id="teacher"
                          className="form-control"
                          style={{width: "100%"}}
                          data-init={this.state.teacher.firstName + ' ' + this.state.teacher.lastName}
                          value={this.state.staff}>
                            <option></option>
                        </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <label className="col-sm-4 control-label">Lead Observer</label>
                    <div className="col-sm-8 m-b">
                        <select id="lead"
                          className="form-control"
                          style={{width: "100%"}}
                          data-init={this.state.lead.firstName + ' ' + this.state.lead.lastName}
                          value={this.state.leadObserver}>
                            <option></option>
                        </select>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <label className="col-sm-4 control-label">Date</label>
                    <div className="col-sm-8 m-b">
                    <div className="input-group date" id="datePicker">
                      <input type="text" className="form-control" value={this.state.date} />
                      <span className="input-group-addon">
                        <i className="fa fa-calendar" aria-hidden="true"></i>
                      </span>
                    </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <label className="col-sm-4 control-label">Status</label>
                    <div className="col-sm-8">
                      <select
                        className="form-control m-b"
                        onChange={this.handleStatusChange.bind(this)}
                        style={{width: "100%"}}>
                        <option></option>
                        <option value='false'>Open</option>
                        <option value='true'>Completed</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-lg-12">
                      <div className="col-sm-4">
                      </div>
                      <div className="col-sm-8">
                          <button
                            style={style}
                            className="btn btn-sm btn-primary pull-right"
                            type="submit">Search
                          </button>
                      </div>
                   </div>
                </form>
            </div>
          </div>
        );
    }
}

class ObservationSearch extends Component {
    constructor(props, context) {
        super(props);
        this.handleUserInput = this.handleUserInput.bind(this);
        this.handlePage = this.handlePage.bind(this);
        this.handleSize = this.handleSize.bind(this);

        this.state = {
            observations: [],
            filterText: '',
            page: 0,
            size: 10,
            totalPages: 10,
            searchCriteriaData: {}
        };

        this.updateSearchCriteria = this.updateSearchCriteria.bind(this);
    }

    handleUserInput(e){
        var formattedDate = Object.assign(moment(this.state.searchCriteriaData.date, 'DD/MM/YYYY').format('YYYY-MM-DD'));
        var data = Object.assign(this.state.searchCriteriaData, {date: formattedDate});
        this.getObservationBySearchCriteria(data)
    }

    getObservationBySearchCriteria(searchCriteria){
        var data = JSON.stringify(searchCriteria);
        console.log(data);
        $.ajax ({
            type: 'POST',
            url: '/api/observations/search?page=' + this.state.page + '&size=' + this.state.size,
            contentType: "application/json",
            data: data,
            success: function (response) {
                this.setState ({
                    observations: response['content'],
                    totalPages: response['totalPages']
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getObservationBySearch(filter){
        $.ajax({
            type: 'GET',
            url: "api/observations/search?filter=" + filter + "&page=" + this.state.page + "&size=" + this.state.size,
            success: function(response) {
                this.setState({
                    observations: response["content"],
                    totalPages: response["totalPages"]
                });
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    }

    getDataObservation() {
        $.ajax({
            type: 'GET',
            url: "/api/observations?page="+this.state.page+"&size="+this.state.size,
            success: function(response) {
                this.setState({
                    observations: response["content"],
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
        this.getDataObservation();
    }

    componentDidUpdate(prevProps, prevState) {
        if ((prevState.page != this.state.page) || (prevState.size != this.state.size)) {
            if (this.state.filterText != '') {
                this.getObservationBySearch(this.state.filterText);
            }
            else {
                this.getDataObservation();
            }
        }
    }

    updateSearchCriteria(data) {
        var newCriteria = Object.assign(this.state.searchCriteriaData, data)
        this.setState({searchCriteriaData: newCriteria});
    }

    render() {
        var errorMessage = null;
        if(this.props.errorMessage != null) {
            errorMessage = (
                <div className="alert alert-danger">
                    <a href="#" className="close" data-dismiss="alert" aria-label="close">&times;</a>
                    {this.props.errorMessage}
                </div>
            );
        }
        return (
            <div className="wrapper-content animated fadeInRight">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ibox float-e-margins">
                            {errorMessage}
                            <div className="ibox-title">
                                <h2>Observation Search</h2>
                            </div>
                            <div className="ibox-content">
                                <div className="table-responsive">
                                    <SearchBar
                                        onUserInput={this.handleUserInput}
                                        updateSearchCriteria = {this.updateSearchCriteria}
                                        searchCriteria = {this.state.searchCriteriaData}
                                    />
                                    <ObservationTable 
                                        observations={this.state.observations}
                                        redirectTo={this.props.redirectTo}
                                        role={this.props.role}
                                    />
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

export default ObservationSearch;