import React from "react";
import "./Popup.css";

const Popup = props => {
  /*
   * jsx
   */
  return (
    <div className="ConfirmationPopup">

      <p className="ConfimationPopup-text">Do you really want to delete this post?</p>

      <div className="ConfirmationPopup-buttonBox">
        <button
          className="ConfirmationPopup-button Confirm"
          onClick={() => props.deletePost(props.postId)}>
          <i className="fas fa-check ConfimationPopup-button-confirmIcon"></i>
        </button>

        <button
          className="ConfirmationPopup-button Deny"
          onClick={() => props.setConfirmationPopup(false)}>
          <i className="fas fa-times ConfimationPopup-button-denyIcon"></i>
        </button>
      </div>
    </div>
  );
};

export default Popup;
