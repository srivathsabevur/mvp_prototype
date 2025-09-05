import { Button, FloatButton } from "antd";
import React, { useRef, useState } from "react";
import ActionCompanion from "./ActionCompanion";
import ProcedureCompanion from "./ProcedureCompanion";
import LogbookCompanion from "./LogbookCompanion";
import ChecklistCompanion from "./ChecklistCompanion";
import Navbar from "../components/Navbar";
import {
  BookOutlined,
  CheckSquareOutlined,
  OrderedListOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  const [option, setOption] = useState("actionCompanion");
  const sideBarRef = useRef(null);

  const dashboardOptions = [
    {
      name: "actionCompanion",
      value: "Action Companion",
      icon: <ThunderboltOutlined />,
    },
    {
      name: "procedureCompanion",
      value: "Procedure Companion",
      icon: <OrderedListOutlined />,
    },
    {
      name: "logbookCompanion",
      value: "Logbook Companion",
      icon: <BookOutlined />,
    },
    {
      name: "checklistCompanion",
      value: "Checklist Companion",
      icon: <CheckSquareOutlined />,
    },
  ];

  const handleButtonClick = (e) => {
    const { name } = e.target;
    setOption(name);
  };

  const handleOptions = () => {
    let curOption;
    switch (option) {
      case "actionCompanion":
        curOption = <ActionCompanion />;
        break;
      case "procedureCompanion":
        curOption = <ProcedureCompanion />;
        break;
      case "logbookCompanion":
        curOption = <LogbookCompanion />;
        break;
      case "checklistCompanion":
        curOption = <ChecklistCompanion />;
        break;
      default:
        console.log("Invalid Case");
        break;
    }
    return curOption;
  };

  const handleSideBarToggle = (e) => {
    if (sideBarRef.current) {
      sideBarRef.current.classList.toggle("-translate-x-full");
      sideBarRef.current.classList.toggle("translate-x-0");
    }
  };

  return (
    <div className="relative sm:flex w-screen h-screen">
      {/* Sidebar */}
      <div
        ref={sideBarRef}
        className="fixed sm:static sm:translate-x-0 -translate-x-full 
                   transition-transform duration-500
                   sm:flex sm:flex-col w-[350px] h-full 
                   border border-black/10 bg-[#051A2E] p-3 z-100"
      >
        <div className="flex flex-col justify-center items-center">
          <img
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D"
            alt="user_profile_img"
            className="rounded-full w-[150px]"
          />
          <h1 className="text-lg text-white font-medium">John Doe</h1>
        </div>
        <div className="flex flex-col gap-3 justify-start items-start mt-6">
          {dashboardOptions.map((btn, index) => {
            return (
              <button
                key={index}
                name={btn.name}
                onClick={handleButtonClick}
                className={`${
                  btn.name === option
                    ? "flex justify-start items-center gap-2 bg-[#FF9933] text-white text-start px-2 py-1 rounded-lg font-medium cursor-pointer"
                    : "flex justify-start items-center gap-2 text-[#FF9933] px-2 py-1 text-start rounded-lg font-medium cursor-pointer transform translate-all ease-in duration-150 hover:bg-[#FF9933] hover:text-white"
                } text-lg w-full`}
              >
                {" "}
                {btn.icon}
                {btn.value}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Navbar */}
        <Navbar handleSideBarToggle={handleSideBarToggle} />

        {/* Content area */}
        <div className="flex-1 pt-14 sm:pt-0 overflow-auto">
          {handleOptions()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
