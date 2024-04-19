import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, Zoom, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { listAvatar } from "../assets/avatar";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function HomeUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);
  const [name, setName] = useState();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Pastikan pengguna sudah login, jika tidak maka arahkan ke halaman login
    if (localStorage.getItem("token") === null) {
      alert("Silahkan login terlebih dahulu");
      navigate("/login");
    }
    console.log("cek dulu", location.state);
    if (location.state) {
      if (location.state.info) toast.info(location.state.info);
      else if (location.state.success) {
        toast.success(location.state.success);
      }
      navigate(".", { replace: false });
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        if (localStorage.getItem("login") === "google component") {
          const decoded = jwtDecode(localStorage.getItem("token"));
          console.log("isi decoded", decoded);
          if (decoded?.exp < new Date() / 1000) {
            alert("Token telah kadaluwarsa");
          }
        } else {
          if (localStorage.getItem("login") === "facebook") {
            return;
          }
          const response = await axios.get(
            "https://shy-cloud-3319.fly.dev/api/v1/auth/me",
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          if (response.request.status === 200) {
            setName(response?.data?.data?.name);
            console.log("Data pertama:", response.data);
          } else {
            alert("token expire");
          }
          console.log("response", response);
        }
      } catch (error) {
        console.log("Error:", error);
        alert("token expire");
      }
    }
    fetchData();
  }, []);

  // Fungsi untuk pindah avatar
  const nextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % listAvatar.length);
  };

  useEffect(() => {
    // Ganti avatar setiap 2 detik
    const interval = setInterval(() => {
      nextAvatar();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentAvatarIndex]);

  // Fungsi logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Hapus token dari local storage
    localStorage.removeItem("login");

    console.log("Logout berhasil!");
    navigate("/login", {
      state: {
        info: "Logout berhasil",
      },
    });
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 shadow-md">
        <ToastContainer transition={Zoom} />
        <div className="container mx-auto px-4 py-4 md:flex md:justify-between md:items-center">
          <div className="flex items-center justify-between">
            <span className="text-white text-xl font-bold ml-8">
              Mobile Legends
            </span>
            <button
              className="block md:hidden text-white"
              onClick={toggleNavbar}
            >
              <img className="w-6 p6" src="/menu.png" alt="Menu" />
            </button>
          </div>
          <ul
            className={`${
              isOpen ? "block" : "hidden"
            } md:flex md:space-x-4 items-center`}
          >
            <li>
              <Link to="/homeuser" className="text-white hover:text-gray-400 ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-400">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-400">
                Contact us
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-cyan-50 px-6 py-2 mx-4 hover:bg-yellow-300 rounded"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Selamat Datang {name} di Mobile Legends
          </h2>
          <p className="text-lg">
            Bersiaplah untuk petualangan epik di medan pertempuran yang
            menegangkan, cari hero favorit Anda sesuai peran.
          </p>
          <Link
            to={"/search"}
            className="inline-block px-4 py-2 mt-10 bg-blue-400 text-white rounded-md hover:bg-green-600 transition duration-300 ease-in-out"
          >
            Cari Hero
          </Link>
        </div>
      </div>
      <div className="container flex flex-col md:flex-row px-6 mx-auto">
        <div className="flex flex-1 flex-col justify-center p-5 bg-white">
          <h1 className="md:mb-5 text-3xl font-bold">
            Data Semua Hero Mobile Legends
          </h1>
          <p className="md:mb-0">
            Mobile Legends memiliki banyak karakter yang bisa kita mainkan. Hero
            permainan dibagi menjadi banyak peran seperti Assassin, Tank,
            Marksman, Fighter, Mage, dan Support. Untuk mendapatkan salah satu
            hero di Mobile Legends, kita bisa menggunakan BP hingga 32000 atau
            battle point atau menggunakan tiket jika ada.
          </p>
          <Link
            to={"/hero"}
            className="bg-green-500 text-cyan-50 p-3 md:p-3 py-2 w-fit mt-2 md:mt-5 hover:bg-red-400 rounded-md inline-block"
          >
            Lihat Hero
          </Link>
        </div>
        <div className="flex flex-1 mt-10 justify-center relative mx-auto rounded-sm">
          <img
            src={listAvatar[currentAvatarIndex]}
            className="w-80 h-72 rounded-md"
            alt="Banner Mobile Legends"
          />
        </div>
      </div>
    </>
  );
}

export default HomeUser;
