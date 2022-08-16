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
    // console.log(isFetching);
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

//  alert("login");

  return (
  
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">DevelopeBook</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial.
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
  );
}


.login {
    width: 100vw;
    height: 100vh;
    background-color: #f0f2f5;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .loginWrapper {
    width: 70%;
    height: 70%;
    display: flex;
  }
  
  .loginLeft,
  .loginRight {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  
  .loginLogo {
    font-size: 50px;
    font-weight: 800;
    color: #1775ee;
    margin-bottom: 10px;
  }
  
  .loginDesc {
    font-size: 24px;
  }
  
  .loginBox{
      height: 300px;
      padding: 20px;
      background-color: white;
      border-radius: 10px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
  }
  
  .loginInput{
      height: 50px;
      border-radius: 10px;
      border: 1px solid gray;
      font-size: 18px;
      padding-left: 20px;
  }
  
  .loginInput:focus{
      outline: none;
  }
  
  .loginButton{
      height: 50px;
      border-radius: 10px;
      border: none;
      background-color: #1775ee;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
  }
  
  .loginButton:focus{
    outline: none;
  }
  
  .loginButton:disabled{
    cursor: not-allowed;
  }
  
  .loginForgot{
      text-align: center;
      color: #1775ee;
  }
  
  .loginRegisterButton{
      width: 60%;
      align-self: center;
      height: 50px;
      border-radius: 10px;
      border: none;
      background-color: #42b72a;
      color: white;
      font-size: 20px;
      font-weight: 500;
      cursor: pointer;
  }