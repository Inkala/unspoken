import React from 'react';

import { ReactComponent as ArrowDown } from '../svg/arrow-down.svg';
import { ReactComponent as Like } from '../svg/like.svg';
import { ReactComponent as Comments } from '../svg/comments.svg';
import { ReactComponent as More } from '../svg/more.svg';
import text from '../translations/texts_ES.json';

const MessageCard = props => {
  const {
    category,
    comments,
    content,
    created_at,
    likes,
    reactions,
    _id
  } = props.message;
  const {i_understand, } = text.home;
  return (
    <article className="message-card">
      <p className="message-content">{content}</p>
      <div className="message-bottom" />
      <section className="message-info">
        <p><strong>{_id}</strong></p>
        <p>{created_at}</p>
        <button className="categories">
          {category ? {category} : "Categoría"}<ArrowDown />
        </button>
      </section>
      <section className="message-reactions">
        <button className="reaction-btn text-button">
          "{i_understand}"
        </button>
        {reactions.length}
        <button className="reaction-btn">
          <Like className="like"/>
        </button>
        {likes.length}
        <button className="reaction-btn">
          <Comments />
        </button>
        {comments.length}
        <button className="reaction-btn" onClick={() => { props.handleDeleteMessage(_id)}} >
          <More />
        </button>
      </section>
    </article>
  );
};

export default MessageCard;
