import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { listAvatar } from "../assets/avatar";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SearchHero() {
  const [hero, setHero] = useState([]);
  const [heroName, setHeroName] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [searchHero, setSearchHero] = useState("");
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

  async function searchDataHero() {
    try {
      const response = await axios.get(
        `https://api.dazelpro.com/mobile-legends/role?roleName=${filterRole}`
      );
      console.log("RESPON DATA : ", response.data.hero);
      setSearchHero(heroName);
      setHero(response.data.hero);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleChange = (event) => {
    setHeroName(event.target.value);
  };

  const handleRoleChange = (event) => {
    setFilterRole(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (heroName === "") {
      toast.info("Masukkan nama Hero untuk mencari !!!");
    } else {
      const selectedHero = hero.find(
        (e) => e.hero_name.toLowerCase() === heroName.toLowerCase()
      );
      if (selectedHero && selectedHero.hero_role !== filterRole) {
        toast.error(
          "Role yang dipilih tidak sesuai dengan Hero yang dimasukkan!"
        );
        setHeroName("");
        setFilterRole("");
        setSearchHero("");
      } else {
        searchDataHero();
      }
    }
  };

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <ToastContainer />
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

      <div className="bg-gray-100 min-h-screen flex flex-col items-center justify-center py-8 ">
        <h1 className="text-3xl font-bold mb-4 text-center">
          Pencarian Hero Mobile Legends
        </h1>
        <form onSubmit={handleSubmit} className="flex items-center ">
          <input
            type="text"
            placeholder="Cari Hero"
            value={heroName}
            onChange={handleChange}
            className="px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:border-blue-500"
          />
          <select
            value={filterRole}
            onChange={handleRoleChange}
            className="px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:border-blue-500"
          >
            <option value="">Pilih Role</option>
            <option value="Fighter">Fighter</option>
            <option value="Tank">Tank</option>
            <option value="Assassin">Assassin</option>
            <option value="Marksman">Marksman</option>
            <option value="Support">Support</option>
            <option value="Mage">Mage</option>
          </select>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none"
          >
            Cari
          </button>
        </form>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 ">
          {hero
            ?.filter((e) =>
              e?.hero_name?.toLowerCase().includes(searchHero?.toLowerCase())
            )
            .map((datahero) => (
              <div
                key={datahero.hero_id}
                onClick={() => {
                  navigate("detail", { state: { hero_id: datahero.hero_id } });
                }}
                className="bg-white rounded-lg shadow-md p-4 flex flex-col items-center"
              >
                <h2 className="text-xl font-bold mb-2 underline">
                  {datahero.hero_name}
                </h2>
                <h2 className="text-md mb-2">Role: {datahero.hero_role}</h2>
                <h2 className="text-md mb-2">
                  Specialist: {datahero.hero_specially}
                </h2>
                <img
                  src={`${listAvatar?.find((gambar) =>
                    gambar
                      ?.toLowerCase()
                      .includes(datahero?.hero_name?.toLowerCase())
                  )}`}
                  alt={datahero.hero_name}
                  className="w-40 h-auto mt-4 rounded-lg"
                />
                <button
                  type="submit"
                  className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mt-5 mb-2"
                >
                  Detail
                </button>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}
