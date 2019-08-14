import React, { Component } from 'react'
import withAuth from '../hoc/withAuth.js';

class Profile extends Component {
  render() {
    return (
      <div>
        <h1>Welcome Paquito</h1>
      </div>
    )
  }
}

export default withAuth(Profile);