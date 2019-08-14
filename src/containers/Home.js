import React, { Component } from 'react'
import withAuth from '../hoc/withAuth.js';
import messagesService from '../services/messages-service';

class Home extends Component {
  state = {
    messages: []
  }

  componentDidMount() {
    messagesService.getAllMessages()
    .then(res => {
      // console.log(res);
      
    }) 
  }
  render() {
    return (
      <div>
        <h1>Home Page</h1>
      </div>
    )
  }
}

export default withAuth(Home);