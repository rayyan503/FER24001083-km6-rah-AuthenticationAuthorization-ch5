import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import axios from "axios";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function DataHero() {
  const [hero, setHero] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Pastikan pengguna sudah login, jika tidak maka arahkan ke halaman login
    if (localStorage.getItem("token") === null) {
      alert("Silahkan login terlebih dahulu");
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    // Hapus token dari local storage
    localStorage.removeItem("token");

    // Tambahan: Hapus token dari server jika diperlukan

    // Arahkan pengguna kembali ke halaman login
    console.log("Logout berhasil!");
    navigate("/login", {
      state: {
        info: "Logout berhasil",
      },
    });
  };

  async function getDataHero() {
    try {
      const response = await axios.get(
        "https://api.dazelpro.com/mobile-legends/hero"
      );
      console.log("RESPON DATA : ", response.data.hero);
      setHero(response.data.hero);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    getDataHero();
  }, []);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div>
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mx-20 mt-10">
        {hero.map((datahero) => (
          <div
            key={datahero.hero_id}
            className="bg-white rounded-lg p-4 shadow-md"
          >
            <div className="font-3xl font-bold underline">
              {datahero.hero_name}
            </div>
            <div className="font-md">Role :{datahero.hero_role}</div>
            <div className="font-md">Specialist :{datahero.hero_specially}</div>

            <img
              src={`${listAvatar?.find((gambar) =>
                gambar
                  ?.toLowerCase()
                  .includes(datahero?.hero_name?.toLowerCase())
              )}`}
              alt={datahero.hero_name}
              className="w-full h-auto rounded-lg mt-5"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
