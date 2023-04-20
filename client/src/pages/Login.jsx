import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { setAuth, setToken, setUserData } from "../features/auth/authSlice";

import axios from "../utils/axios.jsx";

import Google from "../img/google.png";
import Facebook from "../img/facebook.png";

const Login = () => {
  const dispatch = useDispatch();
  const google = () => {
    const googleAuthUrl = `${process.env.REACT_APP_API_URL}/auth/google`;
    window.open(googleAuthUrl, "_blank", "width=500, height=600");

    window.addEventListener("userData", (e) => {
      const userData = e.detail;
      localStorage.setItem("token", userData.token);
      dispatch(setAuth(true));
      dispatch(setToken(userData.token));
      dispatch(setUserData(userData.user));
    });
  };

  const facebook = () => {
    const facebookAuthUrl = `${process.env.REACT_APP_API_URL}/auth/facebook`;
    window.open(facebookAuthUrl, "_blank", "width=500, height=600");

    window.addEventListener("userData", (e) => {
      const userData = e.detail;
      console.log(userData);
      localStorage.setItem("token", userData.token);
      dispatch(setAuth(true));
      dispatch(setToken(userData.token));
      dispatch(setUserData(userData.user));
    });
  };

  const [formData, setFormData] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      email: "",
      password: "",
    }
  );

  const onLoginSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, formData)
      .then((res) => {
        e.target.reset();
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(setToken(token));
        dispatch(setAuth(true));
        dispatch(setUserData({ email: user.email }));
      })
      .catch((err) => console.error(err));
  };

  const onRegisterSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/register`, formData)
      .then((res) => {
        const user = res.data.user;
        const token = res.data.token;
        localStorage.setItem("token", token);
        dispatch(setToken(token));
        dispatch(setAuth(true));
        dispatch(
          setUserData({
            email: user.email,
          })
        );
        e.target.reset();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Choose a Login Method</h1>
      <div className="wrapper">
        <div className="left">
          <div className="loginButton google" onClick={google}>
            <img src={Google} alt="" className="icon" />
            Google
          </div>
          <div className="loginButton facebook" onClick={facebook}>
            <img src={Facebook} alt="" className="icon" />
            Facebook
          </div>
        </div>
        <div className="center">
          <div className="line" />
          <div className="or">OR</div>
        </div>
        <div className="right">
          <form onSubmit={onLoginSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setFormData({ email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setFormData({ password: e.target.value })}
              required
            />
            <button className="submit">Login</button>
          </form>
          <div className="center" style={{ margin: "20px 0" }}>
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <form onSubmit={onRegisterSubmit}>
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setFormData({ email: e.target.value })}
              required
            />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setFormData({ password: e.target.value })}
              required
            />
            <button className="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
