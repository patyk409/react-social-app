import React from 'react'
import './DownbarInfo.css'

const DownbarInfo = (props) => {
  return (
    <aside
      className={
        props.messageContent.includes('removed') ||
        props.messageContent.includes('deleted') ||
        props.messageContent.includes('out')
          ? 'app-message app-message--red'
          : 'app-message app-message--green'
      }
    >
      <p className='app-message__content'>{props.messageContent}</p>
    </aside>
  )
}

export default DownbarInfo
