import React from 'react';

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
          {category ? <p>{category}</p> : <p>"Categoría"</p>}v
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
