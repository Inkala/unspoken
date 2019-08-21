import React from 'react';

import { ReactComponent as Logout } from '../svg/publish.svg';
import { ReactComponent as Close } from '../svg/cancel.svg';
import withAuth from '../hoc/withAuth';
import text from '../translations/texts_ES.json';

const CardMenu = props => {
  const { greating, logout } = text.profile_menu;

  return (
    <nav className={`side-menu${props.showing ? " showing" : ''}`}>
      <div className="greeting">
        <p>
          {greating}, <strong>{props.user.username}</strong>
        </p>
        <Close onClick={props.handleClose}/>
      </div>
      <ul>
        <li>
          <Logout />
          <p onClick={props.logout}>{logout}</p>
        </li>
      </ul>
    </nav>
  );
};

export default withAuth(CardMenu);
