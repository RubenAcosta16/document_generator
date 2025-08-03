import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./modules/Auth/routes/Login.tsx";
import Register from "./modules/Auth/routes/Register.tsx";
import ProtectedPage from "./modules/Auth/routes/ProtectedPage.tsx";
import App from "./App.tsx";
import Templates from "./modules/TemplateGenerator/routes/Templates.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
  },
  {
    path: "login",
    element: <Login></Login>,
  },
  {
    path: "register",
    element: <Register></Register>,
  },
  {
    path: "protected",
    element: <ProtectedPage></ProtectedPage>,
  },
  {
    path: "templates",
    element: <Templates></Templates>,
  },
]);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
