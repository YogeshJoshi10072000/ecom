import axios from "axios";
import { useEffect, useState } from "react";
import "./Chatting.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    console.log("online "+onlineUsers);
    const getFriends = async () => {
      const res = await axios.get(`/api/user/friends/${currentId}`);
      setFriends(res.data);
    };

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `/api/conversation/find/${currentId}/${user._id}`
        );
        // console.log(res.data+"chatting ");
        if(res.data)
         setCurrentChat(res.data);
        else{

          const res1 = await axios.post(
            `/api/conversation/`,{
              senderid:user._id,
              receiverid:currentId

            });

            const res = await axios.get(
              `/api/conversation/find/${currentId}/${user._id}`
              );
              setCurrentChat(res.data);


        }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">online
      {onlineFriends.map((o) => (
        <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
          <div className="chatOnlineImgContainer">
            <img
              className="chatOnlineImg"
              src={
                o?.profilePicture
                  ?  o.profilePicture
                  : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
              }
              alt=""
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
}