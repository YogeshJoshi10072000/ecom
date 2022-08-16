import { useContext, useRef } from "react";
import "./Login.css";
import { loginCall } from "../../apiCalls";

import { AuthContext } from "../../Context/AuthContext";
import { CircularProgress } from '@mui/material';
import { useNavigate } from "react-router-dom";

export default function Login() {
  const email = useRef();
  const password = useRef();
  const {user, isFetching, dispatch } = useContext(AuthContext);
  const history=useNavigate();
  // const { user  } = useContext(AuthContext);
  const handleclick = (e) => {
history('/register')

  }
  
  const handleClick = (e) => {

    if(!email.current.value || !password.current.value)
    {
      alert("Please fill Info Properly");
      

    }
    else
    {

      e.preventDefault();
      loginCall(
        { email: email.current.value, password: password.current.value },
        dispatch
        );
        // console.log("afterlogin");
        // if(user)
        // {
          //   alert(user);
          
          // }
        }
        }
        
        //  alert("login");
        
        return (
          <>


<div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          {/* <h3 className="loginLogo">DevelopeBook</h3> */}
          <span className="loginDesc">
            {/* Connect with friends and the world around you on Lamasocial. */}
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              className="loginInput"
              ref={email}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="submit" 
            disabled={isFetching}
            >
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Log In"
              )}

            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton" onClick={handleclick}>
              {isFetching ? (
                <CircularProgress color="white" size="20px" />
              ) : (
                "Create a New Account"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>






   

    </>
  );
}