import React from 'react'
import { useState,useContext } from 'react';
import {
    PermMedia,
    Label,
    Room,
    EmojiEmotions,
    Cancel,
  }from "@mui/icons-material"
  import { AuthContext } from '../../Context/AuthContext';
export default function Comment() {
    const { user } = useContext(AuthContext);
    const [comment,setcomment]=useState("");
    const likeHandler = () => {
        try {
          // axios.put("/api/post" + post._id + "/like", { userid: user._id });
        } catch (err) {}
      
      };
    return (
        <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
         <img
            className="shareProfileImg"
            src={
              user.profilePicture
                ?  user.profilePicture
                :  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            }
            alt=""
            />
          <input
            placeholder={"comment as " + user.username + ""}
            className="shareInput"
            // ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {/* {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )} */}

<form className="shareBottom" >
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              {/* <PermMedia htmlColor="tomato" className="shareIcon" /> */}
              
           
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
          
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
    )
}
