import { useReducer, useState } from "react";

import axios from "../utils/axios.jsx";

const ResetPassword = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useReducer(
    (prev, next) => {
      return { ...prev, ...next };
    },
    {
      email: "",
    }
  );

  const onResetSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(`${process.env.REACT_APP_API_URL}/auth/reset-password`, formData)
      .then((res) => {
        e.target.reset();
        setMessage(res.data.message);
      })
      .catch((err) => {
        console.error(err);
        setMessage(err.response.data.message);
      });
  };

  return (
    <div className="login">
      <h1 className="loginTitle">Reset password</h1>
      <form onSubmit={onResetSubmit}>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setFormData({ email: e.target.value })}
          required
        />
        <button className="submit">Reset password</button>
        {message && message}
      </form>
    </div>
  );
};

export default ResetPassword;
