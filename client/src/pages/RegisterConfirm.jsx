import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import axios from "../utils/axios";

import { setAuth, setToken, setUserData } from "../features/auth/authSlice";

const RegisterConfirm = () => {
  const [isApproved, setApproved] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const confirm = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");

      try {
        const res = await axios.post(
          `/auth/register/confirm`,
          {},
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        if (res.status !== 200) {
          setErrorMessage("Service Unavailable Error, Please try later");
        }

        const user = res.data.user;
        const newToken = res.data.token;
        localStorage.setItem("token", newToken);
        dispatch(setAuth(true));
        dispatch(setToken(newToken));
        dispatch(setUserData(user));
        setApproved(true);
      } catch (err) {
        console.error(err);
        setErrorMessage(err.response.data.message);
      }
      setLoading(false);
    };

    confirm();
  }, []);

  if (isLoading) {
    return "Loading...";
  }

  return <>{isApproved ? "Your account has been approved" : errorMessage}</>;
};

export default RegisterConfirm;
