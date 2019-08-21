import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Close } from '../svg/cancel.svg';
import withAuth from '../hoc/withAuth';
import text from '../translations/texts_ES.json';

const NotificationsMenu = props => {
  const { notifications, showing, handleClose, handleFilter } = props;
  const {
    not_seen,
    reaction,
    pre_like,
    people,
    like,
    comment
  } = text.notifications;
  return (
    <nav className={`notifications-menu${showing ? ' showing' : ''}`}>
      <div className="title">
        <p>{not_seen}</p>
        <Close onClick={handleClose} />
      </div>
      <ul>
        {notifications.map(message => {
          let likesLi, reactionsLi, commentLi = null;
          if (message.likes.length) {
            likesLi = (
              <Link to={`/messages/${message.id}`}>
                <p><strong>
                  {`${pre_like ? pre_like : null}${message.likes.length} ${people} `}
                </strong>{like}</p>
                <small>{message.content}</small>
              </Link>
            );
          }
          if (message.reactions.length) {
            reactionsLi = (
              <Link to={`/messages/${message.id}`}>
                <p><strong>
                  {`${message.reactions.length} ${people} `}
                </strong>{reaction}</p>
                <small>{message.content}</small>
              </Link>
            );
          }
          if (message.comments.length) {
            commentLi = (
              <Link to={`/messages/${message.id}`}>
                <p><strong>
                {`${message.comments.length} ${people} `}
                </strong>{comment}</p>
                <small>{message.content}</small>
              </Link>
            );
          }
          return (
            <React.Fragment key={`${message.id}`}>
              {likesLi && (
                <li className="notification-item" onClick={() => {
                  handleClose();
                  handleFilter();
                }}>{likesLi}</li>
                )}
              {reactionsLi && (
                <li className="notification-item" onClick={() => {
                  handleClose();
                  handleFilter();
                }}>{reactionsLi}</li>
                )}
              {commentLi && (
                <li className="notification-item" onClick={() => {
                  handleClose();
                  handleFilter();
                }}>{commentLi}</li>
              )}
            </React.Fragment>
          );
        })}
      </ul>
    </nav>
  );
};

export default withAuth(NotificationsMenu);
