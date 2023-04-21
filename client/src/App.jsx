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
import LoginSuccess from "./pages/LoginSuccess";
import RegisterConfirm from "./pages/RegisterConfirm";
import RegisterError from "./pages/RegisterError";
import ResetPassword from "./pages/ResetPassword";
import UpdatePassword from "./pages/UpdatePassword";

import Navbar from "./components/Navbar";

import { setAuth, setToken, setUserData } from "./features/auth/authSlice";

import "./app.css";

const App = () => {
  const { userData, isAuth } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const getUser = async () => {
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
          const { email } = user;
          dispatch(setToken(token));
          dispatch(setAuth(true));
          dispatch(
            setUserData({
              email,
            })
          );
        })
        .catch((err) => {
          console.error(err);
        });
    };
    getUser();
  }, [dispatch]);

  return (
    <Router>
      <div>
        {window.location.pathname !== "/login/success" && (
          <Navbar user={userData} />
        )}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route
            exact
            path="/login"
            element={isAuth ? <Navigate to="/" /> : <Login />}
          />
          <Route exact path="/register/confirm" element={<RegisterConfirm />} />
          <Route exact path="/register/error" element={<RegisterError />} />
          <Route exact path="/login/success" element={<LoginSuccess />} />
          <Route exact path="/reset-password" element={<ResetPassword />} />
          <Route exact path="/update-password" element={<UpdatePassword />} />

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
