import axios from "axios";
import { useRef ,useState} from "react";
import "./Register.css";
import { useNavigate } from "react-router";

// import { loginCall } from "../../apiCalls";

export default function Register() {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const fullname = useRef();
  const history = useNavigate();
  const [file, setFile] = useState(null);
  const handleclick = async (e) => {
history('/login')
  }
 


  const handleClick = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
     

   


      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };

     
      if (file) {
        const data = new FormData();
        const thisname=Date.now() + file.name;
        const fileName = "/images/"+file.name;
        data.append("name", thisname);
        data.append("file", file);
        user.profilePicture = fileName;
        // console.log(newPost);
       
        try {
          await axios.post("/api/upload", data);
        } catch (err) {}
        
      }
    
 

      try {
        await axios.post("/api/user/register", user);
        history("/login");
      } catch (err) {
        console.log(err);
      }
    }
  };

 

  return (

<>

<div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">Lamasocial</h3> */}
          {/* <span className="loginDesc">
          
          </span> */}
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Email"
              required
              ref={email}
              className="loginInput"
              type="email"
            />
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
            />
             <input
                // style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />

            <button className="loginButton" type="submit">
              Sign Up
            </button>
            <button className="loginRegisterButton" onClick={handleclick}>Log into Account</button>
          </form>
        </div>
      </div>
    </div>




</>



  );
}

