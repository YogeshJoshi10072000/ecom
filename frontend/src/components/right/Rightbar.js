import React from 'react'
import { Link } from "react-router-dom";

import "./Rightbar.css";
import { Users } from '../../Data';
import Online from '../online/Online';
import { AuthContext } from '../../Context/AuthContext';
import { useState,useContext ,useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Add , Remove} from "@mui/icons-material"
import { Button } from '@mui/material';
export default function Rightbar({user}) {

//   // const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState((currentUser.followings.includes(user?.id))
  );

// // user=(user===null)?currentUser:user;

  useEffect(() => {
    if(user)
    {
      setFollowed(currentUser.followings.includes(user._id));

    
    const y=currentUser.followings.includes(user._id);

  console.log(y);
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/api/user/friends/"+user._id);
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }
   
  }, [user]);

  const his=useNavigate();

  const handleclick=(e)=>{
    his(`/${user.username}/update`);
  }

  const handleClick = async () => {

    // alert(user._id);

    try {
      if (followed) {
        await axios.put(`/api/user/${user._id}/unfollow`, {
          userid: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`/api/user/${user._id}/follow`, {
          userid: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };


  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          {/* <img className="birthdayImg" src="" alt="" /> */}
          {/* <span className="birthdayText"> */}
            {/* <b>Your Friend</b> and <b>3 other friends</b> have a birhday today. */}
          {/* </span> */}
        </div>
        <img className="rightbarAd" src="assets/ad.png" alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
        
          {friends.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightbar = () => {

   
    return (
      <>
      {user.username !== currentUser.username && (
          <Button  onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </Button>
        )}



  {
       user.username === currentUser.username && (
          // <button  onClick={handleclick}>
        
<Button variant="contained" onClick={handleclick}>Update Information</Button>
          // </button>

       )}

        <h4 className="rightbarTitle">User information</h4>
        <div className="rightbarInfo">
        <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Desc:</span>
            <span className="rightbarInfoValue">{user.desc}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>

          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue"> 
            {user.relationship === "no"
                ? "Single"
                : user.relationship === "yes"
                ? "Married"
                : "-"}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
                      :  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
 
    <div className="rightbar">
      <div className="rightbarWrapper">
         {user ? <ProfileRightbar />  :  <HomeRightbar />} 
        {/* <HomeRightbar />  */}
      </div>
    </div> 
  );
}