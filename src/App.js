import React, { Component } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'
import Home from './components/Home'
import ListTopicsPage from './components/topics/topics-list/ListTopicsPage'
import Navbar from './components/Navbar'
import PrivateRoute from './components/PrivateRoute'
import TopicForm from './components/topics/topic-form/TopicForm'
import TopicPage from './components/topics/topic-details/TopicPage'
import Logout from './components/users/Logout'
import AddReplyPage from './components/replies/AddReplyPage'
import Api from './services/Api';
import SettingsMenu from './components/SettingsMenu';
import Auth from './services/Auth';
import Theme from './services/Theme';
import Registration from './components/users/Registration';
import Messanger from './components/messanger/MessangerPage';
import UsersListPage from './components/users/users-list/UsersListPage';

import './App.css'
import './styles/default-styles/default-theme'


import Role from './components/users/Role'

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      theme: 'default',
      currentUser: null
    }
  }

  componentDidMount () {
    this.initUserData();
  }

  initUserData = () => {
    if (Auth.isAuthenticate()) {
      Api.setInterseptor(this.props)
      .getUser()
      .then((response) => {
        // set current user
        Auth.setUser(response.data);

        // set user theme
        let theme = response.data.theme;
        Theme.changeBodyStyle(theme);
        this.setUserThemeStyle(theme);

        this.setState({
          theme: theme,
          currentUser: response.data
        });
        this.props.history.push('/topics')
      })
    }
  }

  changeTheme  = (theme) => {
    if (Auth.isAuthenticate()) {
      Api.setInterseptor(this.props)
      .changeUserTheme(theme)
      .then((response) => {
        this.setState({
          theme: theme
        });
      })
    } else {
      this.setState({
        theme: theme
      });
    }
    this.setUserThemeStyle(theme);
    Theme.changeBodyStyle(theme);
  }

  getMainThemeClass = () => {
    return Theme.getMainThemeClass(this.state.theme);
  }

  setUserThemeStyle = (theme) => {
    if( theme === 'dark') {
      require('./styles/dark-styles/dark-theme.js');
    } else if (theme === 'blue') {
      require('./styles/blue-styles/blue-theme.js');
    } else if (theme === 'red') {
      require('./styles/red-styles/red-theme.js');
    } else { // default theme
      require('./styles/default-styles/default-theme.js');
    }
  }
  render () {
    return (
      <div className={this.getMainThemeClass()}>
        <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet" />
        <Navbar {...this.props} theme={this.state.theme}/>
        {/* <ChatSection {...this.props}/> */}
        <SettingsMenu changeTheme={this.changeTheme} theme={this.state.theme}/>
        <div className='container'>
          <Switch>
            <Route path='/' exact 
              render={ (props)=> <Home {...props} initUserTheme={this.initUserData}/>} />
            <Route path='/home' 
              render={ (props)=> <Home {...props} initUserTheme={this.initUserData}/>} />
            <Route path='/registration' 
              render={ (props)=> <Registration {...props} initUserTheme={this.initUserData}/>} />
            <PrivateRoute path='/logout' exact 
              roles={[Role.Admin, Role.User]}
              component={Logout} />
            <PrivateRoute path='/topics' exact 
              roles={[Role.Admin, Role.User]}
              component={ListTopicsPage} />
            <PrivateRoute path='/topics/add' exact 
              roles={[Role.Admin, Role.User]}
              component={TopicForm} />
            <PrivateRoute path='/topics/:topicId' exact 
              roles={[Role.Admin, Role.User]}
              component={TopicPage} />
            <PrivateRoute path='/topics/:topicId/add' exact 
              roles={[Role.Admin, Role.User]}
              component={AddReplyPage} />
            <PrivateRoute path='/users' exact 
              roles={[Role.Admin]}
              component={UsersListPage} />
            <PrivateRoute path='/messanger' exact 
              roles={[Role.Admin, Role.User]}
              component={Messanger} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default withRouter(App)