import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { Card, ConfigProvider } from "antd";
const App = () => {
  return (
    <Fragment>
      <ConfigProvider
        theme={{
          token: {
            // Seed Token
            colorPrimary: "#FF9933",
          },
          components: {
            Card: {
              colorBgContainer: "#E6E6E6 ",
              headerBg: "#051A2E",
              colorTextHeading: "white",
            },
            Table: {
              headerBg: "white",
            },
          },
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </ConfigProvider>
    </Fragment>
  );
};

export default App;
