import axios from "axios";
import { useEffect, useState } from "react";
import "./Conversation.css";
let t=0;
export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
//   const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    // friendId.replace(' ',"");
    console.log(friendId);
   
    if(friendId)
    {
    const getUser = async () => {


        try {
          const res = await axios.get(`/api/user?userid=${friendId}`);
          setUser(res.data);
        } catch (err) {
          console.log(err);
        }
      };
      t++;
      getUser();
    }
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={
          user?.profilePicture
            ?  user.profilePicture
            :  "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}