import React, { Component } from 'react'
import Api from '../../../services/Api'

class MessagingForm extends Component {
  constructor (props) {
    super(props)
    this.state = {
      message:'',
      error:{}
    }
  }

  handleOnChange = (event) => {
    let { name, value } = event.target
    this.setState({ [name]: value })
  }

  validate = () => {
    const phoneRegEx = new RegExp(/^[a-zA-Z0-9\s!.,;:'"?]+$/);
    const hasError = !phoneRegEx.test(this.state.message);
    if (hasError) {
      let error = {};
      error.message = 'Message must containt a-z A-Z 0-9 ! . , ; : \' " ?';
      this.setState({error})
    }
    return !hasError
  }

  handleOnSumbit = (event) => {
    event.preventDefault()
    if (this.validate()) {
      let { receiverId } = this.props
      const message = {
        message: this.state.message,
        receiverId
      }
      Api.setInterseptor(this.props).createMessage(message)
        .then((response) => {
          this.props.changeCurrentSessionSentMessages();
        })
      this.setState({message: '', error: {}})
    }
  }
  render () {
    let {error} = this.state
    return (
    	<div>
        <div className="type_msg">
          <div className="input_msg_write">
            <input 
              type="text" 
              className="write_msg" 
              placeholder="Type a message"
              name="message"
              value ={this.state.message}
              onChange={this.handleOnChange}/>
            <button className="msg_send_btn" type="button" onClick={this.handleOnSumbit}>
                <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
            </button>
            { error.message && <small>{error.message}</small> }
          </div>
        </div>
      </div>
    )
  }
}

export default MessagingForm
