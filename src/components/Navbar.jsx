import { CloseOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const Navbar = ({ handleSideBarToggle, isSidebarOpen = false }) => {
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
                        flex justify-between w-full sm:w-auto md:h-20 h-16
                        bg-[#051A2E] z-50 p-1 border-b border-black/10"
    >
      <img
        className="md:w-[180px] w-[120px]"
        src={`https://hxplabs.com/wp-content/uploads/2025/07/fulllogo_transparent_nobuffer.png`}
        alt="logo"
      />
      <div className="flex justify-center items-center gap-2">
        <Dropdown menu={{ items }}>
          <Button
            size="large"
            type="primary"
            icon={<UserOutlined className="text-2xl" />}
          />
        </Dropdown>
        <div className="sm:hidden">
          <Button
            size="large"
            type="primary"
            icon={
              isSidebarOpen ? (
                <CloseOutlined className="text-2xl" />
              ) : (
                <MenuOutlined className="text-2xl" />
              )
            }
            onClick={handleSideBarToggle}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
