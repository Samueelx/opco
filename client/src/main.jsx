import React from "react";
import ReactDOM from "react-dom/client";

import { AuthContextProvider } from "./context/AuthContext.jsx";
import App from "./App.jsx";

import "./index.css";
import { UsersContextProvider } from "./context/UsersContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
    <AuthContextProvider>
      <UsersContextProvider>
        <App />
      </UsersContextProvider>
    </AuthContextProvider>
  // </React.StrictMode>
);
