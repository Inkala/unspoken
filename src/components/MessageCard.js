import React from 'react';

import { ReactComponent as ArrowDown } from '../svg/arrow-down.svg';
import { ReactComponent as Like } from '../svg/like.svg';
import { ReactComponent as Comments } from '../svg/comments.svg';
import { ReactComponent as More } from '../svg/more.svg';

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
          "Te entiendo"
        </button>
        {reactions.length}
        <button className="reaction-btn">
          <img src={process.env.PUBLIC_URL + '/img/icons/like.svg'} alt="" />
        </button>
        {likes.length}
        <button className="reaction-btn">
          <img src={process.env.PUBLIC_URL + '/img/icons/comments.svg'} alt="" />
        </button>
        {comments.length}
        <button className="reaction-btn" onClick={() => { props.deleteHandler(_id)}} >
          <img src={process.env.PUBLIC_URL + '/img/icons/more.svg'} alt="" />
        </button>
      </section>
    </article>
  );
};

export default MessageCard;
