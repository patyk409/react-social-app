import PostAuthor from './PostAuthor'
import LikeBox from './LikeBox'

const Post = (props) => {
  return (
    <li className="post-list__post-item">
      <p className="post-item__content">{props.data.content}</p>
      {props.userToken && (
        <LikeBox
          headerConfigAuth={props.headerConfigAuth}
          likes={props.data.likes}
          post={props.data}
        />
      )}
    </li>
  )
}

export default Post
