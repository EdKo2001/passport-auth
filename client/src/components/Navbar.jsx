import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setAuth, setToken, setUserData } from "../features/auth/authSlice";

import axios from "../utils/axios.jsx";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();

  const logout = async () => {
    try {
      await axios.get("/auth/logout");
      localStorage.removeItem("token");
      dispatch(setToken(""));
      dispatch(setAuth(false));
      dispatch(setUserData({}));
    } catch (err) {
      console.error("Logout failed: ", err);
    }
  };

  return (
    <div className="navbar">
      <span className="logo">
        <Link className="link" to="/">
          Passport Auth App
        </Link>
      </span>
      {Object.keys(user).length > 0 ? (
        <ul className="list">
          {user?.photos?.[0]?.value && (
            <li className="listItem">
              <img
                src={user.photos[0].value}
                alt={user.displayName ?? user.email}
                className="avatar"
              />
            </li>
          )}
          <li className="listItem">{user.displayName ?? user.email}</li>
          <li className="listItem" onClick={logout}>
            Logout
          </li>
        </ul>
      ) : (
        <Link className="link" to="login">
          Login
        </Link>
      )}
    </div>
  );
};

export default Navbar;
