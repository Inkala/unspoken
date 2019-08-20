import React from 'react';

import withAuth from '../hoc/withAuth';
import text from '../translations/texts_ES.json';
import { ReactComponent as Send } from '../svg/send.svg';

const CommentsForm = props => {
  const { comment } = text.message_actions;
  return (
    <form className="comments-form" onSubmit={props.handleSubmit}>
      <p><strong>{props.user.username}</strong></p>
      <textarea
        id="comment"
        rows="1"
        value={props.content}
        onChange={props.handleChange}
        placeholder={comment}
      />
      <button type="submit"><Send /></button>
    </form>
  );
};

export default withAuth(CommentsForm);
