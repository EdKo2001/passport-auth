import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setToken } from "../features/auth/authSlice";

const LoginSuccess = () => {
  // const dispatch = useDispatch();

  // // useEffect(() => {

  // // }, [])

  // const urlParams = new URLSearchParams(window.location.search);
  // const token = urlParams.get("token");
  // console.log(token);

  // dispatch(setToken(token));

  window.close();

  return <></>;
};

export default LoginSuccess;
