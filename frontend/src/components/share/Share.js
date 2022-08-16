import "./Share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
}from "@mui/icons-material"
import { useContext, useRef, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
  export default function Share() {
    const [thisuser, setthisUser] = useState({});
   
    // const { user } = useContext(AuthContext);
    const { user } = useContext(AuthContext);
  const Navigate=useNavigate();
    const desc = useRef();
    const [file, setFile] = useState(null);
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


  
  
    const submitHandler = async (e) => {
      e.preventDefault();
      const newPost = {
        userid: user._id,
        desc: desc.current.value,
      };
      if (file) {
        const data = new FormData();
        const thisname=Date.now() + file.name;
        const fileName = "/images/"+file.name;
        data.append("name", thisname);
        data.append("file", file);
        newPost.img = fileName;
        console.log(newPost);
        try {
          await axios.post("/api/upload", data);
        } catch (err) {}
      }
      try {
        await axios.post("/api/post/create", newPost);
        window.location.reload();
      } catch (err) {}

      // Navigate('/');
    };

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
         <img
            className="shareProfileImg"
            src={
              thisuser.profilePicture
                ?  thisuser.profilePicture
                :  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
            }
            alt=""
            />
          <input
            placeholder={"What's in your mind " + user.username + "?"}
            className="shareInput"
            ref={desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}

<form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
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
  );
}