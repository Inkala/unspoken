import React from 'react';
import {ReactComponent as Logo} from '../svg/logo.svg';

const Header = props => {
  return (
    <header className="clouds-header">
      <Logo />
      <img className="clouds left-cloud" src={process.env.PUBLIC_URL + '/img/left-clouds.png'} alt="" />
      <img className="clouds right-cloud" src={process.env.PUBLIC_URL + '/img/right-clouds.png'} alt="" />
    </header>
  );
};

export default Header;
