import { ControlPointSharp } from "@mui/icons-material";

const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      console.log("login start "+action.type+" "+action.payload);
      return {
        user: null,
        isFetching: true,
        error: false,
      };
      case "LOGIN_SUCCESS":
        console.log("login sucess "+action.type+" "+action.payload);
        return {
          user: action.payload,
          isFetching: false,
          error: false,
        };
        case "LOG_OUT":
        // console.log("logout "+action.type+" "+action.payload);
        return {
          user: null,
          isFetching: false,
          error: false,
        };
      case "LOGIN_FAILURE":
        console.log("login failure "+action.type+" "+action.payload);
        return {
          user: null,
          isFetching: false,
          error: true,
        };
      case "FOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            followings: [...state.user.followings, action.payload],
          },
        };
      case "UNFOLLOW":
        return {
          ...state,
          user: {
            ...state.user,
            followings: state.user.followings.filter(
              (following) => following !== action.payload
            ),
          },
        };
      default:
        return state;
    }
  };
  
  export default AuthReducer;