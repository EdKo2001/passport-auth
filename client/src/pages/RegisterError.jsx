import React, { useEffect } from "react";

const RegisterError = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const text = urlParams.get("text");

    window.opener.dispatchEvent(
      new CustomEvent("userError", { detail: { text } })
    );

    window.close();
  }, []);

  return <></>;
};

export default RegisterError;
