import React, { Component } from 'react';

class PageInfo extends Component {
  disablePrevious() {
    if (this.props.page === 0) {
      return 'disabled'
    }
  }

  disableNext() {
    if (this.props.page + 1 === this.props.totalPages) {
      return 'disabled'
    }
  }

  onChangePage(page) {
    this.props.handlePage(page-1);
  }

  listNumberPage(start, end) {
    var pages = [];
    // Because API page start from 0, my suggestion maybe we can change API to start from 1, for easy to read
    var activeNum =  this.props.page + 1;
    var active = '';
    for (var num = start; num <= end; num++) {
      if (activeNum === num) {
        active = 'active'
      }
      pages.push(<li className={active}><a onClick={this.onChangePage.bind(this, num)}>{num}</a></li>);
      active = '';
    }

    return pages;
  }

  renderPage() {
    // Because API page start from 0
    // Current assumption every data will be more than 5 pages, need to figure out what if less than 5 pages
    var initPage = this.props.page + 1;
    var pages = [];
    if (this.props.totalPages < 5){
      pages = this.listNumberPage(1,this.props.totalPages);
    }
    else{
      if (initPage < 4) {
        pages = this.listNumberPage(1,5);
      }
      else{
        var startPage = initPage - 2;
        var endPage = initPage + 2;
        if (endPage >= this.props.totalPages) {
          startPage = startPage - (endPage - this.props.totalPages)
          endPage = this.props.totalPages
        }
        pages = this.listNumberPage(startPage, endPage);
      }
    }
    return pages;
  }

  renderSizeOption() {
    var size = [];
    var active = '';
    [5, 10, 20, 50, 100].forEach(function(val) {
      if (this.props.size === val){
        active = 'active'
      }
      size.push(<li className={active}><a onClick={() => this.props.handleSize(val)}>{val}</a></li>);
      active = '';
    }, this)
    return size;
  }

  render() {
    return (
      <div>
        <nav aria-label="navigation" className="pull-left">
          <ul className="pagination">
            {this.renderSizeOption()}
          </ul>
        </nav>
        <nav aria-label="navigation" className="pull-right">
          <ul className="pagination">
            <li className={this.disablePrevious()}>
              <a aria-label="Previous" onClick={this.disablePrevious() === 'disabled' ? '' : () => this.props.handlePage(this.props.page-1)} >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>
            {this.renderPage()}
            <li className={this.disableNext()}>
              <a aria-label="Next" onClick={this.disableNext() === 'disabled' ? '' :() => this.props.handlePage(this.props.page+1)}>
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default PageInfo;