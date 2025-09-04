import { UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import logo from "../assets/hxplabs_logo.png";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = ({ handleSideBarToggle }) => {
  const items = [
    {
      key: 1,
      label: <a href="#">My account</a>,
    },
    {
      key: 2,
      label: <a href="#">Settings</a>,
    },
    {
      key: 3,
      label: <a href="#">Logout</a>,
    },
  ];
  return (
    <nav
      className="fixed sm:static top-0 left-0 right-0 sm:left-auto
                        flex justify-between w-full sm:w-auto
                        bg-white z-50 p-1 border-b border-black/10"
    >
      <img className="rounded-full w-[50px]" src={logo} alt="logo" />
      <div className="flex justify-center items-center gap-2">
        <Dropdown menu={{ items }}>
          <Button size="large" icon={<UserOutlined className="text-2xl" />} />
        </Dropdown>
        <button
          onClick={handleSideBarToggle}
          className="flex items-center p-2 bg-white rounded-full sm:hidden"
        >
          <MenuOutlined className="text-xl" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
