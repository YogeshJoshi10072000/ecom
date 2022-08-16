import "./topbar.css";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Search, Person, Chat, Notifications } from "@mui/icons-material"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { logout } from "../../apiCalls";
import { useEffect } from "react";
import axios from "axios";
export default function Topbar() {
  const {user, isFetching, dispatch } = useContext(AuthContext);
  const history=useNavigate();
  const [thisuser, setthisUser] = useState({});
  const username = user.username;
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/api/user?username=${username}`);
        setthisUser(res.data);
        setthisUser(res.data);
        // alert(res);
      };
      fetchUser();
  
    }, [username]);


  const handleclick=(e)=>{
    e.preventDefault();
    logout(
      
      dispatch
      );
      history('/');
      // alert(user);

  }
  return (
    <div className="topbarContainer">You are in topbar
      <div className="topbarLeft">
        <span className="logo" onClick={()=>history("/")}>Developer book </span>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend, post or video"
            className="searchInput"
          />
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
       
          <span className="topbarLink" onClick={()=>history("/")}>Homepage</span>
          
         
          <span className="topbarLink"  onClick={handleclick}>Logout</span>
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <Person onClick={()=>history('/')} />
            <span className="topbarIconBadge"></span>
          </div>
        
          <div className="topbarIconItem" >
            <Chat onClick={()=>history('/messaging')}/>
            <span className="topbarIconBadge"></span>
          </div>
       
          <div className="topbarIconItem">
            <Notifications onClick={()=>history('/messaging')} />
            <span className="topbarIconBadge" ></span>
          </div>
        </div>
        Your Account
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              thisuser.profilePicture
                ?  thisuser.profilePicture
                :"https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            }
            alt=""
            className="topbarImg"
          />
        </Link>
      </div>
    </div>
  );
}