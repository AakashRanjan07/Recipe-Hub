/* eslint-disable react/jsx-no-undef */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.jsx";
import CreateRecipe from "./pages/CreateRecipe.jsx";
import Auth from "./pages/Auth.jsx";
import { SavedRecipes } from "./pages/SavedRecipes.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/create-recipe",
        element: <CreateRecipe />,
      },
      {
        path: "/saved-recipe",
        element: <SavedRecipes />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
