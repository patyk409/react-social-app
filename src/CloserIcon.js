import React from 'react'
import './CloserIcon.css'

const CloserIcon = (props) => {
  /*
   * jsx
   */
  return (
    <div className='closer-box'>
      {props.post.user.username === localStorage.getItem('name') && (
        <div
          className='closer-icon'
          onClick={() => {
            props.showConfirmationPopup(props.post.id)
          }}
          tabIndex='0'
        >
          <i className='fas fa-times closer'></i>
        </div>
      )}
    </div>
  )
}

export default CloserIcon
