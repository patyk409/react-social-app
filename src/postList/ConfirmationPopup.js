import React from 'react'
import './ConfirmationPopup.css'

const ConfirmationPopup = (props) => {
  /*
   * jsx
   */
  return (
    <div className="confirmation-popup">
      <p className="confimation-popup__text">
        Do you really want to delete this post?
      </p>
      <div className="confirmation-popup__button-box">
        <button
          className="confirmation-popup__btn yes"
          onClick={() => props.deletePost(props.postId)}
        >
          <i className="fas fa-check confirmation-popup__btn-yes"></i>
        </button>
        <button
          className="confirmation-popup__btn no"
          onClick={() => props.setConfirmationPopup(false)}
        >
          <i className="fas fa-times confirmation-popup__btn-no"></i>
        </button>
      </div>
    </div>
  )
}

export default ConfirmationPopup
