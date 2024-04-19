import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import HomeUser from "./Pages/HomeUser.jsx";
import SearchHero from "./Pages/SearchHero.jsx";
import DetailHero from "./Pages/DetailHero.jsx";
import DataHero from "./Pages/DataHero.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/login/homeuser",
    element: <HomeUser />,
  },
  {
    path: "/register/login/homeuser",
    element: <HomeUser />,
  },
  {
    path: "/homeuser",
    element: <HomeUser />,
  },
  {
    path: "/search",
    element: <SearchHero />,
  },
  {
    path: "/hero",
    element: <DataHero />,
  },
  {
    path: "/search/detail",
    element: <DetailHero />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="3926213107-qa75ehp4erc5okp17ffaa67onkdi1na8.apps.googleusercontent.com">
    <RouterProvider router={router} />
  </GoogleOAuthProvider>
);
