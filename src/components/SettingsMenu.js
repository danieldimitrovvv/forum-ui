import React, { Component } from 'react'
import  FontAwesome  from 'react-fontawesome';
import Theme from '../services/Theme';

class SettingsMenu extends Component {
  constructor (props) {
    super(props);
    this.state = {};
  }

  changeTheme  = (theme) => {
    return () => {
      this.props.changeTheme(theme);
    }
  }

  getThemeClass = () => {
    return Theme.getSettingsThemeClass(this.props.theme);
  }

  render(){
    return (
      <div className={this.getThemeClass()}>
        <div className="settings-section">
          <div className="btn-group dropleft">
            <button type="button" className="btn btn-secondary dropdown-toggle" 
              data-toggle="dropdown" aria-haspopup="false" aria-expanded="false">
              <FontAwesome
                className="settings-fa-fa-icon"
                size="lg"
                name="cog"
              />
            </button>
            <div className="dropdown-menu">
              <div className="theme-section">
                <div className="title-section">Theme</div>
                <ul>
                  <li onClick={this.changeTheme('default')}>white</li>
                  <li onClick={this.changeTheme('red')}>red</li>
                  <li onClick={this.changeTheme('blue')}>blue</li>
                  <li onClick={this.changeTheme('dark')}>dark</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default SettingsMenu
