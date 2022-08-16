import React from 'react'
import Sidebar from '../sidebar/sidebar';
import Topbar from '../topbar/topbar';
import Rightbar from '../right/Rightbar';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';
import { useContext } from 'react';
export default function Update() {

  
    const email = useRef();
    
    const history = useNavigate();
    const [file, setFile] = useState(null);

    const [cover, setFile2] = useState(null);

    const password = useRef();
    const passwordAgain = useRef();
  const desc=useRef();
  const city=useRef();
  const from=useRef();
  const relationship=useRef();

    const [user, setUser] = useState({});
    // const [thisuser,setthisUser] =useState({});
    const username = useParams().username;
    // const { user } = useContext(AuthContext);
  
    useEffect(() => {
      const fetchUser = async () => {
        const res = await axios.get(`/api/user?username=${username}`);
        setUser(res.data);
        // setthisUser(res.data);
        // alert(res);
      };
      fetchUser();
  
    }, [username]);

    // const thisuser=user;
    const handleClick = async (e) => {
      // setthisUser(user);
     
        e.preventDefault();
        if (passwordAgain.current.value != password.current.value) {
          passwordAgain.current.setCustomValidity("Passwords don't match!");
        } else {
          
    var thisuser={
  _id:user._id,
  email:user._email,
  password:user._password,
  
    };
    // alert(thisuser.email);
    
    
   
      
    if(email.current.value!=null) thisuser.email=email.current.value;
    if(password.current.value!=null) thisuser.password=password.current.value;
    if(desc.current.value!=null) thisuser.desc=desc.current.value;
    if(city.current.value!=null) thisuser.city=city.current.value;
    if(from.current.value!=null) thisuser.from=from.current.value;
    if(relationship.current.value!=null) thisuser.relationship=relationship.current.value;
    // alert(thisuser.email+" emial");
          if (file) 
          {
            const data = new FormData();
          
           
          
            const thisname=user._id+file.name ;
            const fileName = "/images/"+user._id+file.name;
          
            data.append("name", thisname);
            data.append("file", file);
            data.append("id",user._id);
         
          

            thisuser.profilePicture = fileName;
         
          

            try {
              await axios.post("/api/upload", data);
            } catch (err) {
                  //  alert(err);

            }
            
            
          }
      //  alert(cover);
          if (cover) {
            const data = new FormData();
            const thisname=Date.now() + cover.name;
            const fileName = "/images/"+user._id+cover.name;
            data.append("name", thisname);
            data.append("file", cover);
            data.append("id",user._id);
            thisuser.coverPicture = fileName;
            // console.log(newPost);
            // alert(fileName);
            try {
              await axios.post("/api/upload", data);
            } catch (err) {}
            
            
          }
     
    
          try {
            await axios.put(`/api/user/${user._id}/update`, thisuser);
            alert("your want to update ?");
            history("/");
          } catch (err) {
            // console.log(err);
            // alert(err);
            
          }
        }
      };



  return (
    // <div>
<>
<Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={
                  user.coverPicture
                    ?  user.coverPicture
                    :  "data:image/jpeg;base64,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"
                }
               
              />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ?  user.profilePicture
                    : "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg"
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h1 className="profileInfoDesc">Update Information</h1>
            </div>
          </div>
         

     <br></br>

     <div style={{height:1000}} className="login">
      <div className="loginWrapper">
        {/* <div className="loginLeft">
        
        </div> */}
        <div className="loginRight">
        Email Update
          <form className="loginBox" >
          <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />

<button className="loginButton" type="submit" onClick={handleClick}>
            Update
            </button>
            </form>
           
         
            Password Update
           <form className="loginBox" >
           
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
             required
              ref={passwordAgain}
              className="loginInput"
              type="password"
              minLength="6"
            />
          <button className="loginButton" type="submit" onClick={handleClick}>
            Update
            </button>
            </form>
            
        
            Profile Picture Update
           <form className="loginBox" >
          
          <input
             placeholder="Profile Picture Update"
                // style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
                <button className="loginButton" type="submit" onClick={handleClick}>
            Update
            </button>
            </form>
            

 
            {/* coverPicture Update
           <form className="loginBox" >
          
    <input
             placeholder='coverPicture'
                // style={{ display: "none" }}
                type="file"
                id="cover"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile2(e.target.files[0])}
              />


            <button className="loginButton" type="submit" onClick={handleClick}>
            Update
            </button>
            
          </form> */}

          Basic Information Update
          <form className="loginBox" >
          <input
              placeholder="Add about yourself"
             
              ref={desc}
              className="loginInput"
              type="text"
            />
        <input
              placeholder="which city you belongs ?"
             
              ref={city}
              className="loginInput"
              type="text"
            />
             <input
              placeholder="Which country you belongs ?"
             
              ref={from}
              className="loginInput"
              type="text"
            />
             <input
              placeholder="Are you in relationship ? ans yes or no"
             
              ref={relationship}
              className="loginInput"
              type="text"
            />
<button className="loginButton" type="submit" onClick={handleClick}>
            Update
            </button>
            </form>
          
        {/* </div> */}
      </div>
      </div>
    
        



          </div>
        </div>
      </div>
    </>
       



    // </div>
  )
}


