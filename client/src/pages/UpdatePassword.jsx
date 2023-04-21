import { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "../utils/axios.jsx";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      password: "",
    }
  );
  const navigate = useNavigate();

  const onResetSubmit = async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");

    await axios
      .post(
        `${process.env.REACT_APP_API_URL}/auth/update-password/${token}`,
        formData
      )
      .then((res) => {
        e.target.reset();
        setMessage(res.data.message);
        setTimeout(() => navigate("/login"), 3000);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Update password</h1>
      <form onSubmit={onResetSubmit}>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setFormData({ password: e.target.value })}
          required
        />
        <button className="submit">Update password</button>
        {message && message}
      </form>
    </div>
  );
};

export default ResetPassword;
