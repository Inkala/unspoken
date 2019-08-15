import React from 'react';

const Header = props => {
  return (
    <header className="counds-header">
      <img src={process.env.PUBLIC_URL + '/img/logo.svg'} alt="Unspoken logo" />
      <img className="clouds left-cloud" src={process.env.PUBLIC_URL + '/img/left-clouds.png'} alt="" />
      <img className="clouds right-cloud" src={process.env.PUBLIC_URL + '/img/right-clouds.png'} alt="" />
    </header>
  );
};

export default Header;

/* <p onClick={this.props.logout}>Logout</p> */
