import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Productos from "./pages/Productos";
import DetalleProducto from "./pages/DetalleProducto";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "sobre-nosotros",
        element: <h1>Sobre nosotros</h1>,
      },
      {
        path: "contacto",
        element: <h1>Contacto</h1>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/productos",
    element: <Productos />,
  },
  {
    path: "/productos/:id",
    element: <DetalleProducto />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
