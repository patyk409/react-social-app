import React from 'react'
import '../styles/utilities/Preloader.scss'

const Preloader = (props) => {
  // JSX
  return (
    <div
      className={
        props.isVisible
          ? 'preloader-container preloader-active'
          : 'preloader-container'
      }
    >
      <div className="preloader"></div>
    </div>
  )
}

export default Preloader
