import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listAvatar } from "../assets/avatar";

function HomePage() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentAvatarIndex, setCurrentAvatarIndex] = useState(0);

  // Fungsi untuk pindah avatar
  const nextAvatar = () => {
    setCurrentAvatarIndex((prevIndex) => (prevIndex + 1) % listAvatar.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextAvatar();
    }, 2000);
    return () => clearInterval(interval);
  }, [currentAvatarIndex]);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className="bg-gray-800 shadow-md">
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
          <ul className={`${isOpen ? "block" : "hidden"} md:flex md:space-x-4`}>
            <li>
              <Link to="/" className="text-white hover:text-gray-400">
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
              <Link to="/login" className="text-white hover:text-green-400">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-white hover:text-yellow-300">
                Register
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <div className="bg-gray-900 text-white py-20">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold">
            Selamat Datang di Mobile Legends
          </h2>
          <p className="text-lg">
            Bersiaplah untuk petualangan epik di medan pertempuran yang
            menegangkan, cari hero favorit anda sesuai role.
          </p>
          <Link
            to={"/login"}
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
            Marksman, Fighter, Mage dan Support. Untuk mendapatkan salah satu
            hero di Mobile Legends ini kita bisa menggunakan BP hingga 32000
            atau battle point atau menggunakan tiket jika ada
          </p>
          <Link
            to={"/login"}
            className="bg-green-500 text-white p-3 md:p-3 py-2 w-fit mt-2 md:mt-5 hover:bg-red-400 rounded-md inline-block"
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

export default HomePage;
