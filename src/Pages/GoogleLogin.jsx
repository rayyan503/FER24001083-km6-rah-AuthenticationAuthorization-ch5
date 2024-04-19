import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function GoogleLogin({ buttonText }) {
  const navigate = useNavigate();

  const registerLoginWithGoogleAction = async (accessToken) => {
    try {
      const response = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/google",
        { access_token: accessToken },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const { token } = response.data.data;
      localStorage.setItem("token", token);
      navigate("/homeuser", {
        state: { token: token, success: "Login Berhasil" },
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("Error:", error.response.data);
      }
    }
  };

  const loginWithGoogle = useGoogleLogin({
    onSuccess: (responseGoogle) => {
      localStorage.setItem("login", "google function");
      registerLoginWithGoogleAction(responseGoogle.access_token);
    },
  });

  return (
    <>
      <button
        type="button"
        className="py-2 px-5 mt-2 bg-yellow-500 text-white rounded-md hover:bg-green-400 flex items-center justify-center"
        onClick={() => loginWithGoogle()}
      >
        {buttonText} Login dengan Google
      </button>
    </>
  );
}

export default GoogleLogin;
