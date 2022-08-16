import "./Closefriend.css";
import { Link } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import { useContext } from "react";
export default function CloseFriend({user}) {
  const { user: currentUser } = useContext(AuthContext);
  return (
    <li className="sidebarFriend">
      <Link to={`/profile/${user.username}`}>
      <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ?  user.profilePicture
                :  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            }
            alt=""
            />
      {/* <img className="sidebarFriendImg" src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg" alt="" /> */}
      </Link>
      <span className="sidebarFriendName">{user?.username}</span>
    </li>
  );
}