import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate, Link, useLocation } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import GoogleLogin from "./GoogleLogin";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import FacebookLogin from "@greatsumini/react-facebook-login";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();

  // Cek apakah pengguna sudah login saat komponen dimuat
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homeuser"); // Redirect ke halaman home jika sudah login
      toast.info("Anda sudah login.");
    }
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      toast.success(location.state.success);
      navigate(".", { replace: false });
    }
  }, []); // Hanya berjalan sekali saat komponen dimuat

  const dataLogin = async () => {
    try {
      const responseLogin = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("isi", responseLogin.data);
      localStorage.setItem("token", responseLogin?.data?.data?.token);
      navigate("/homeuser", {
        state: {
          success: "Login Berhasil",
        },
      });
    } catch (err) {
      console.log("error fetching data: ", err);
      toast.warning("Email atau password salah!");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.info("Mohon lengkapi email dan password.");
    } else {
      dataLogin();
    }
  };

  const handleFacebookLogin = (response) => {
    console.log("Login Success!", response);
    if (response?.userID) {
      localStorage.setItem("login", "facebook");
      localStorage.setItem("token", "facebook");
      navigate("/homeuser", {
        state: {
          success: "Login Berhasil",
        },
      });
    } else {
      toast.error("Gagal melakukan login dengan Facebook.");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Sign In Your Account
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4 mt-5">
          <div>
            <label htmlFor="email" className="text-gray-700 font-bold">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-gray-700 font-bold">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                placeholder="Masukkan password Anda"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Login
          </button>
          <div className="text-center mt-4 mx-20">
            <p>Atau masuk dengan:</p>
            <GoogleLogin
              buttonText={
                <span className="flex items-center justify-center">
                  <FaGoogle className="mr-3" />
                </span>
              }
            />
            <FacebookLogin
              appId="1683118858884398"
              onSuccess={handleFacebookLogin}
              onFail={(error) => {
                console.log("Login Failed!", error);
                toast.error("Login dengan Facebook gagal!");
              }}
              onProfileSuccess={(response) => {
                console.log("Get Profile Success!", response);
              }}
              useRedirect={false}
              render={(renderProps) => (
                <button
                  type="button"
                  onClick={renderProps.onClick}
                  className="py-2 px-4 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
                >
                  <FaFacebook className="mr-1" />
                  Login dengan Facebook
                </button>
              )}
            />
          </div>
        </form>
        <p className="text-center mt-4">
          Belum punya akun?{" "}
          <Link to="/register" className="text-indigo-500 underline">
            Daftar di sini
          </Link>
        </p>
      </div>
    </div>
  );
}
