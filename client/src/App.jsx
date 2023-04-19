import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import axios from "./utils/axios.jsx";

import Home from "./pages/Home";
import Post from "./pages/Post";
import Login from "./pages/Login";

import LoginSuccess from "./components/LoginSuccess";
import Navbar from "./components/Navbar";

import { setAuth, setToken, setUserData } from "./features/auth/authSlice";

import "./app.css";

const App = () => {
  const { userData, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
      console.log(localStorage.getItem("token"));
      await axios
        .get("/auth/user", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.status !== 200)
            throw new Error("Authentication has been failed!");
          const user = res.data.user;
          const token = res.data.token;
          const { displayName, photos, provider, email, emails } = user;
          dispatch(setToken(token));
          dispatch(setAuth(Object.keys(user).length > 0));
          dispatch(
            setUserData({
              displayName,
              photos,
              provider,
              email: email ?? emails[0].value,
            })
          );
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser();
  }, []);

  return (
    <Router>
      <div>
        <Navbar user={userData} />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={isAuth ? <Navigate to="/" /> : <Login />}
          />
          <Route exact path="/login/success" element={<LoginSuccess />} />
          <Route
            exact
            path="/post/:id"
            element={isAuth ? <Post /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
