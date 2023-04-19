import React, { useEffect } from "react";

const LoginSuccess = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    const user = JSON.parse(urlParams.get("user"));

    window.opener.dispatchEvent(
      new CustomEvent("userData", { detail: { token, user } })
    );

    window.close();
  }, []);

  return <></>;
};

export default LoginSuccess;
