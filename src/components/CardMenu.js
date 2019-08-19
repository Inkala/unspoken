import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Delete } from '../svg/delete.svg';
import { ReactComponent as Edit } from '../svg/edit.svg';
import text from '../translations/texts_ES.json';

const CardMenu = props => {
  const { remove, edit } = text.message_actions;
  return (
    <div className="card-menu">
      <ul>
        <li onClick={props.handleDeleteMessage}>
          <Delete /> {remove}
        </li>
        <li>
          <Link to={`${props.messageId}/edit`}>
            <Edit /> {edit}
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default CardMenu;
