import React, { Component } from 'react'

class RecentMessageSearchForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      username: ''
    }
  }

  onChangeInput = (event) => {
    let username = event.target.value.trim();
    this.setState({username})
  }

  submitForm = () => {
    this.props.changeSearchValue(this.state.username)
  }

  render () {
    return (
    	<div>
        <div className="srch_bar">
          <div className="stylish-input-group">
            <input type="text"
              className="search-bar" 
              placeholder="Search" 
              onInput={this.onChangeInput}
              name="searchValue"/>
            <span className="input-group-addon">
            <button type="button" onClick={this.submitForm}> 
              <i className="fa fa-search" aria-hidden="true"></i> 
            </button>
            </span>
          </div>
        </div>
		</div>
    )
  }
}

export default RecentMessageSearchForm
