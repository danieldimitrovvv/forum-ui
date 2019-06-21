import React, { Component } from 'react'
import Select from 'react-select'
import Theme from '../services/Theme';

const options = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 15, label: '15' },
  { value: 20, label: '20' },
  { value: 30, label: '30' },
  { value: 40, label: '40' }
]

class Pagination extends Component {
  constructor (props) {
    super(props)
    this.state = { 
      pages: this.getPages()
    }
  }

  getPaginationThemeClass = () => {
    return Theme.getPaginationThemeClass(this.props.theme);
  } 

  getPages = () => {
    // this.props.countItems contain size all records
    // this.props.size contains current page visible elements

    if ( this.props.countItems < this.props.size ) {
      return 1;
    }

    
    let pages = Math.round(this.props.countItems / this.props.size);

    // if calculate pages * size (items in page) < all items increment page with 1.
    let increment = ((this.props.countItems <= (pages * this.props.size))) ? 0 : 1;
    pages += increment; 

    return pages;
  }

  pageChange = (page) => {
    return () => {
      this.props.pageChange(page, this.props.size);
    }
  }

  changePageDisplayElementSize = (option) => {
    this.props.pageChange(0, option.value);
  }

  getSelectOptions = () => {
    return options.find(option => option.value === this.props.size);
  }

  showPaginationAndsetVisibleElementSize() {
    return (
      <div className={this.getPaginationThemeClass()} style={{ margin: '3px' }}>
        <hr/>
        { this.getChangeVisibleElements() }
        { this.getPaginationSection() }
        <hr/>
      </div>
    )
  }

  getPaginationSection = () => {
    return <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={(this.props.activePage <= 1) ? 'page-item disabled': 'page-item'}>
                <span className="page-link" onClick={this.pageChange(this.props.activePage - 2)}>{'<<'}</span>
              </li>

              <li className={(this.props.activePage === 0) ? 'page-item disabled': 'page-item'}>
                <span className="page-link" onClick={this.pageChange(this.props.activePage - 1)}>{'<'}</span>
              </li>

              <li className={(this.props.activePage === 0) ? 'page-item active': 'page-item'}>
                <span className="page-link" onClick={this.pageChange(0)}>1</span>
              </li>

              { this.state.pages > 2 &&
                this.props.activePage !== 0 &&
                this.props.activePage !== 1 &&
                this.props.activePage !== (this.state.pages - 1) &&
                (
                  <li className="page-item disabled">
                    <span className="page-link"> ... </span>
                  </li>
                )
              }

              { this.props.activePage !== 0 && this.props.activePage !== (this.state.pages -1) && (
                <li className="page-item active">
                  <span className="page-link" onClick={this.pageChange(this.props.activePage)}>
                    {this.props.activePage + 1}
                  </span>
                </li>
                )
              }

            { this.state.pages > 2 &&  
              this.props.activePage !== 0 && 
              this.props.activePage !== (this.state.pages - 1) &&
              this.props.activePage !== (this.state.pages - 2) && (
                  <li className="page-item disabled">
                      <span className="page-link"> ... </span>
                  </li>
                )
              }

              { this.state.pages > 2 && 
                (this.props.activePage === 0  || this.props.activePage === (this.state.pages -1)) &&
                <li className="page-item disabled">
                  <span className="page-link"> ... </span>
                </li>
              }


              <li className={(this.props.activePage === this.state.pages - 1) ? 'page-item active': 'page-item'}>
                <span className="page-link" onClick={this.pageChange(this.state.pages - 1)}>{this.state.pages}</span>
              </li>

              <li className={((this.props.activePage + 1) === this.state.pages) ? 'page-item disabled': 'page-item'}>
                <span className="page-link" onClick={this.pageChange(this.props.activePage + 1)}>{'>'}</span>
              </li>

              <li className={((this.props.activePage + 2) >= this.state.pages) ? 'page-item disabled': 'page-item'}>
                <span className="page-link" onClick={this.pageChange(this.props.activePage + 2)}>{'>>'}</span>
              </li>

            </ul>
          </nav>;
  }

  getChangeVisibleElements = () => {
    // Change Size section
   return <div 
            className={this.getPaginationThemeClass()}
            style = {{
              width: '10%',
              minWidth:'80px',
              float: 'left',
              marginRight: '5px',
              position: 'relative'
            }}
          >
            <Select 
              options={options} 
              defaultValue={this.getSelectOptions()} 
              onChange={this.changePageDisplayElementSize}/>
          </div>
  }

  render () {
    if (this.props.countItems > 5 && this.state.pages > 1) {
      return this.showPaginationAndsetVisibleElementSize();
    } else if (this.props.countItems > 0) {
      return <div 
              className={this.getPaginationThemeClass()}
              style={{margin: '3px'}}
            >
              <hr/>
              {this.getChangeVisibleElements()}
              <div style={{clear: 'both'}}></div>
              <hr/>
            </div>;
    } else {
      return <h4 style={{width: '100%', textAlign: 'center'}}>...</h4>;
    }
  }
}

export default Pagination
