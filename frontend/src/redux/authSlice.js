import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const initialState = { token: localStorage.getItem("token") || null };

const LOGIN_SUCCESS = "auth/loginSuccess";
const LOGIN_FAIL = "auth/loginFail";
const LOGOUT = "auth/logout";

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, token: action.payload };
    case LOGIN_FAIL:
      return { ...state, token: null };
    case LOGOUT:
      return { ...state, token: null };
    default:
      return state;
  }
}

export const login = (username, password) => async (dispatch) => {
  try {
    const res = await axios.post("/api/auth/login", { username, password });
    const { token } = res.data;
    localStorage.setItem("token", token);
    dispatch({ type: LOGIN_SUCCESS, payload: token });
    return token;
  } catch (err) {
    dispatch({ type: LOGIN_FAIL });
    throw err;
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch({ type: "auth/logout" });
  toast.info("Logged out successfully ");
};
