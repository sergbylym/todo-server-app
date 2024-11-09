import React from "react";
import ReactDOM from "react-dom/client";
import Home from "./components/sreens/Home/Home";
import Layout from "./components/sreens/Home/layout/Layout";

import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Layout>
      <Home />
    </Layout>
  </React.StrictMode>
);
