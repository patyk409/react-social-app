import React, { useContext } from 'react'
import '../../../../styles/components/dashboard/dashboard-users/searched-user/SearchedUser.scss'

import { GlobalContext } from '../../../../context/CreateContext'

const SearchedUser = (props) => {
  // GLOBAL CONTEXT
  const { setSearchedUserTrigger } = useContext(GlobalContext)

  return (
    <>
      <div className="searched-user-result">
        {props.usersInputInfo ? (
          <div className="searched-user-info-container">
            <p className="searched-user-info">
              {props.usersInputInfo}
            </p>
          </div>
        ) : (
          <div className="searched-user">
            <img
              src={props.searchedUserAvatar}
              alt="user_avatar"
              className="searched-user-avatar"
            />

            <div className="searched-user-data">
              <p className="searched-user-data-name">
                {props.searchedUserName}
              </p>

              <p className="searched-user-data-email">
                {props.searchedUserEmail}
              </p>
            </div>

            <div
              className="follow-icon"
              onClick={() => {
                props.followUser(props.searchedUserId)
              }}
              tabIndex="0"
            >
              <i className="fas fa-plus"></i>
            </div>
          </div>
        )}
      </div>

      <div
        className="searched-user-result-closer"
        onClick={() => {
          setSearchedUserTrigger(false)
        }}
      >
        <i className="fas fa-times"></i>
      </div>
    </>
  )
}

export default SearchedUser
