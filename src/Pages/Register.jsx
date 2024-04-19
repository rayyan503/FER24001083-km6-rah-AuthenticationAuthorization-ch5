import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Konfirmasi password tidak cocok.");
      return;
    }

    if (!validatePassword(password)) {
      toast.error("Password harus diawali dengan huruf kapital.");
      return;
    }

    try {
      const responseRegister = await axios.post(
        "https://shy-cloud-3319.fly.dev/api/v1/auth/register",
        {
          email,
          name,
          password,
          expiresInMins: 30,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      if (responseRegister.status === 201) {
        navigate("/register/login", {
          state: {
            success: "Register Berhasil",
          },
        });
      } else {
        alert(
          `Gagal melakukan registrasi. Silakan coba lagi: ${responseRegister.data.message}`
        );
      }
    } catch (error) {
      console.error("Error during registration:", error);
      if (error.response && error.response.status === 400) {
        toast.error("Email sudah terdaftar. Gunakan email lain.");
      } else {
        toast.error("Gagal melakukan registrasi. Silakan coba lagi.");
      }
    }
  };

  const validatePassword = (password) => {
    const firstChar = password.charAt(0);
    return firstChar === firstChar.toUpperCase() && /[a-zA-Z]/.test(firstChar);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle visibilitas password
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-4">
          Register New Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-4 mt-5">
          <div>
            <label htmlFor="email" className="text-gray-700 font-bold">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div>
            <label htmlFor="name" className="text-gray-700 font-bold">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Masukkan nama lengkap Anda"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              required
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
                placeholder="Masukkan password (minimal 8 karakter)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                minLength={8}
                required
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                className="absolute right-3 top-3 cursor-pointer text-gray-400"
                onClick={togglePasswordVisibility}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="text-gray-700 font-bold"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Konfirmasi password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              minLength={8}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:bg-indigo-600"
          >
            Daftar
          </button>
          <p className="text-center mt-4">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-indigo-500 underline">
              Masuk di sini
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
