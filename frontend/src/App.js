import './App.css';
import Home from './pages/home/Home';
import Profile from './pages/profilr/Profile';
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import {useContext } from"react";
import { AuthContext } from './Context/AuthContext';
import { Navigate } from "react-router-dom";
import Messaging from "./components/Messaging/Messaging";
import ChatOnline from './components/Chating/Chating';
import Messenger from './pages/Messenger/Messenger';
import Update from './components/Update/Update';

function App() {
  const { user ,isFetching,error } = useContext(AuthContext);
  // const user=1;.
  // alert(user);
  // if(user)
  // {
  //   alert("user init")
  // //  console.log(error);
  // }
  return (

    // <ChatOnline></ChatOnline>
    <Router>
    <Routes>

        <Route exact path="/" element=
          { user ? <Home /> : <Register />} >
        </Route>

        <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />}></Route>
        <Route exact  path="/register" element=
          {user ? <Navigate to="/" /> : <Register />} >
        </Route>


        <Route exact path="/profile/:username" element={<Profile /> }>
        </Route> 
  <Route exact path="/:username/update" element=
          { user ? <Update /> : <Register />} >
        </Route>
        
      <Route exact path="/messaging" element={!user ? <Navigate to="/" /> : <Messenger /> }>
        </Route>

        {/* <Route exact path="/profile/:username1/:username2" element={<Showprofile />}> */}
        {/* </Route>  */}
    </Routes>
    </Router> 
  );
}

export default App;
