import React from 'react';
import { Link } from 'react-router-dom';
import './Followed.css';

const Followed = props => {
  /*
   * jsx
   */
  return (
    <div className="Followed">

      <h3>Followed
        <i className="fas fa-user-friends"></i>
      </h3>

      <ul className="Users-followed">
        {(props.allFollowed.length === 0) ?
          <p className="Follow-info">Seems like you don't follow anyone...</p> :
          props.allFollowed.map(user => {
            return (
              <li className="Users" key={user.id}>
                <img src={user.avatar_url} alt="user_avatar" className="User-avatar" />

                <div className="User-data">
                  <p className="User-name">{user.username}</p>
                  <p className="User-email">{user.email}</p>
                </div>

                <div className="Follow-icon" onClick={() => { props.unfollowUser(user.id) }} tabIndex="0">
                  <i className="fas fa-minus"></i>
                </div>
              </li>
            )
          })}
      </ul>

      <div className="Closer">
        <Link
          to="/"
          onClick={props.closePopup}>
          <i className="fas fa-times"></i>
        </Link>
      </div>

    </div>
  );
};

export default Followed
