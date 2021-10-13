import React from 'react';
import { Link } from 'react-router-dom';
import './Followed.css';

const Followed = props => {
  /*
   * jsx
   */
  return (
    <div className="AllFollowed">

      <h3 className="AllFollowed-header">Followed
        <i className="fas fa-user-friends AllFollowed-headerIcon"></i>
      </h3>

      <ul className="AllFollowed-list">
        {(props.allFollowed.length === 0) ?
          <p className="AllFollowed-text">Seems like you don't follow anyone...</p> :
          props.allFollowed.map(user => {
            return (
              <li className="AllFollowed-listItem" key={user.id}>
                <img src={user.avatar_url} alt="user_avatar" className="AllFollowed-listItem-avatar" />

                <div className="AllFollowed-listItem-data">
                  <p className="AllFollowed-listItem-data-name">{user.username}</p>
                  <p className="AllFollowed-listItem-data-email">{user.email}</p>
                </div>

                <div className="FollowIcon" onClick={() => { props.unfollowUser(user.id) }} tabIndex="0">
                  <i className="fas fa-minus AllFollowed-listItem-unfollowIcon"></i>
                </div>
              </li>
            )
          })}
      </ul>

      <div className="Closer">
        <Link
          className="Closer-link"
          to="/"
          onClick={props.closePopup}>
          <i className="fas fa-times Closer-linkIcon"></i>
        </Link>
      </div>

    </div>
  );
};

export default Followed
