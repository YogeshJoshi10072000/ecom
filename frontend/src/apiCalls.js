
import { ConstructionOutlined } from "@mui/icons-material";
import axios from "axios";
import { useContext } from "react";


export const loginCall = async (userCredential, dispatch) => {


  
    // dispatch({ type: "LOGIN_START" });
  
    try {
      // alert(userCredential.email);
      const res = await axios.post("/api/user/login", userCredential);
   
   dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      //  alert("login sucess");
      console.log(res.data);
    


    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err });
    }
 
};


export const logout = ( dispatch) => {


  
  dispatch({ type: "LOG_OUT"});
  // dispatch({ type: "LOGIN_START" });

  // try {
  //   // alert(userCredential.email);
  //   // const res = await axios.post("http://localhost:4000/api/user/login", userCredential);
 
  //   //  alert("login sucess");
  //   // console.log(res.data);
  


  // } catch (err) {
  //   dispatch({ type: "LOGIN_FAILURE", payload: err });
  // }

};

