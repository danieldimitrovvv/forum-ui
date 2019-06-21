import React, { Component } from 'react'
import Api from '../services/Api';
import Auth from '../services/Auth';
import Theme from '../services/Theme';

export default (WrappedComponent) => {
  return class extends Component {
    constructor (props) {
      super(props)
      this._isMounted = false
      this.state = {
        theme: 'default',
        data: [],
        ready: false
      }
    }

    componentDidMount () {
      this._isMounted = true
      this.props.request
        .then(res => {
          if (this._isMounted) {
            this.setState({
              data: res.data,
              ready: true
            })
          }
        })

        this.initTheme();
    }

    initTheme = () => {
      if (Auth.isAuthenticate()) {
        Api.setInterseptor(this.props)
        .getUser()
        .then((response) => {
          if (this._isMounted) {
            let theme = response.data.theme;
          
            Theme.changeBodyStyle(theme);
            this.setState({
              theme: theme
            });
          }
        })
      }
    } 
    componentWillUnmount () {
      this._isMounted = false
    }

    componentWillReceiveProps = (nextProps) => {
      this.setState({ready: false})
      nextProps.request
        .then(res => {
          if (this._isMounted) {
            this.setState({
              data: res.data,
              ready: true
            })
            this.initTheme();
          }
        })
    }

    render () {
      if (this.state.ready) {
        return (<WrappedComponent
          data={this.state.data} {...this.props} theme={this.state.theme}/>)
      } else {
        return (
          <div className="text-center">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        )
      }
    }
  }
}
