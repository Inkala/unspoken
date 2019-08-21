import React from 'react';

import text from '../translations/texts_ES.json';

const ConfirmationModal = props => {
  const { confirm_delete, delete_message, cancel_delete } = text.confirmation;
  return (
    <section className="confirmation-wraper">
      <div className="confirmation-modal">
        <h2>{confirm_delete}</h2>
        <div className="modal-buttons">
          <button onClick={props.handleDeleteMessage}>{delete_message}</button>
          <button
            onClick={() => {
              props.handleClose();
            }}
          >
            {cancel_delete}
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConfirmationModal;
