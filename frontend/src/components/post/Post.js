import "./Post.css";
import { MoreVert } from "@mui/icons-material";
// import { Users } from "../../Data"
import DeleteIcon from '@mui/icons-material/Delete';
import { Chip } from "@mui/material";
import { useState ,useEffect,useContext } from "react";
import Comment from "../Comment/Comment";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [inputarea,setinputarea]=useState(0);
 
  const { user: currentUser } = useContext(AuthContext);
  const mystyle = {
   
    color: 'black',
    cursor:'pointer'
   
  };
  
  const  commentpost=()=>{

     alert("u want to comment ?")
     setinputarea(1-inputarea);

  }
  const likeHandler = () => {
    try {
      axios.put("/api/post/" + post._id + "/like", { userid: currentUser._id });
    } catch (err) {}
    const p=like;
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
    if(p>like)
    {
      alert("hell");
      try {
        axios.put("/api/post/" + post._id + "/dislike", { userid: currentUser._id });
      } catch (err) {}
    }
  };

  const deletepost=()=>{
    // alert(post._id+" "+currentUser._id);
    try {
      axios.post("/api/post/" + post._id + "/delete", { userid: currentUser._id });
    } catch (err) {}
    window.location.reload();


  }

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/user?userid=${post.userid}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userid]);

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture?user.profilePicture:"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"}
              alt="">
            
            </img>
              </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {/* <MoreVert  /> */}
          

                <DeleteIcon style={mystyle} onClick={deletepost}  />
   
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="https://static.vecteezy.com/system/resources/previews/000/422/468/non_2x/like-icon-vector-illustration.jpg" onClick={likeHandler} alt="https://static.vecteezy.com/system/resources/previews/000/422/468/non_2x/like-icon-vector-illustration.jpg" />
            <img className="likeIcon" src="https://www.iconpacks.net/icons/2/free-instagram-like-icon-3507-thumb.png" onClick={likeHandler} alt="https://www.iconpacks.net/icons/2/free-instagram-like-icon-3507-thumb.png" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText" onClick={commentpost}>{post.comment} comments</span>
           {inputarea===1 && <Comment />}

            
          </div>
        </div>
      </div>
    </div>
  );
}