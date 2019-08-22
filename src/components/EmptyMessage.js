import React from 'react';

import text from '../translations/texts_ES.json';

const EmptyMessage = props => {
  const { no_message } = text.errors;
  return (
    <section className="confirmation-wraper">
      <div className="confirmation-modal">
        <h2>{no_message}</h2>
        <div className="modal-buttons">
          <button
            onClick={() => {
              props.handleClose();
            }}
          >Ok</button>
        </div>
      </div>
    </section>
  );
};

export default EmptyMessage;
