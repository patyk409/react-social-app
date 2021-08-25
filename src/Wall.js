import React from "react";
import "./Wall.css";
import Popup from "./Popup";
import moment from 'moment';

const Wall = props => {
  /*
   * jsx
   */
  return (
    <main className="Wall-container">
      <ul className="Wall">
        {props.latestPosts.map(post => {
          return (
            <li className="Post-container" key={post.id}>

              <div className="Post-author">
                <img src={post.user.avatar_url} alt="user_avatar" />
                <div>
                  <p>{post.user.username}</p>
                  <span>{post.user.email}</span>
                </div>

                {props.userToken &&
                  <div className="Follow-icon" onClick={() => { props.unfollowUser(post.user.id) }} tabIndex="0">
                    <i className="fas fa-minus"></i>
                  </div>}
              </div>
              <p className="Post-content">{post.content}</p>

              <div className="Post-info">
                <span>{moment(post.created_at).fromNow()}</span>

                <div className="Like-container">
                  <span>{post.likes.length}</span>

                  <i className={post.likes.filter(like => like.username === localStorage.getItem("name")).length > 0 ? "far fa-grin-wink Post-liked" : "far fa-grin-wink"} onClick={(event) => {
                    if (!props.userToken) {
                      return null;
                    } else if (!event.target.classList.contains("Post-liked")) {
                      event.target.classList.add("Post-liked");
                      props.postLike(post.id);
                    } else {
                      event.target.classList.remove("Post-liked");
                      props.postDislike(post.id);
                    }
                  }} tabIndex="0"></i>
                </div>
              </div>

              {post.user.username === localStorage.getItem("name") &&
                <div className="Closer" onClick={() => { props.showConfirmationPopup(post.id) }} tabIndex="0">
                  <i className="fas fa-times"></i>
                </div>}
            </li>
          )
        })}

        {(props.confirmationPopup) ?
          <aside className="App-popup">
            <Popup
              setConfirmationPopup={props.setConfirmationPopup}
              postId={props.postId}
              deletePost={props.deletePost} />
          </aside> : null}
      </ul>

      {props.isVisible ?
        <div className="Preloader-container">
          <div className="Preloader"></div>
        </div> : null}
    </main>
  );
};

export default Wall;
