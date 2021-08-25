import React from "react";
import "./Popup.css";

const Popup = props => {
  /*
   * jsx
   */
  return (
    <div className="Confirmation-popup">
      <p>Do you really want to delete this post?</p>

      <div className="Button-container">
        <button
          className="Button Yes"
          onClick={() => props.deletePost(props.postId)}>
          <i className="fas fa-check"></i>
        </button>

        <button
          className="Button No"
          onClick={() => props.setConfirmationPopup(false)}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
};

export default Popup;
