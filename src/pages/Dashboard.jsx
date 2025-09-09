import { Button, FloatButton } from "antd";
import React, { useRef, useState } from "react";
import ActionCompanion from "./ActionCompanion/ActionCompanion";
import ProcedureCompanion from "./ProcedureCompanion/ProcedureCompanion";
import LogbookCompanion from "./LogbookCompanion/LogbookCompanion";
import ChecklistCompanion from "./ChecklistCompanion/ChecklistCompanion";
import Navbar from "../components/Navbar";
import {
  BookOutlined,
  CheckSquareOutlined,
  OrderedListOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import Sidenavbar from "../layout/Sidenavbar";

const Dashboard = () => {
  const [option, setOption] = useState("actionCompanion");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
    setIsSidebarOpen(!isSidebarOpen);
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

  // const handleSideBarToggle = (e) => {
  //   if (sideBarRef.current) {
  //     sideBarRef.current.classList.toggle("-translate-x-full");
  //     sideBarRef.current.classList.toggle("translate-x-0");
  //   }
  // };

  const handleSideBarToggle = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="relative sm:flex w-screen h-screen">
      {/* Sidebar */}
      <Sidenavbar
        sideBarRef={sideBarRef}
        isSidebarOpen={isSidebarOpen}
        dashboardOptions={dashboardOptions}
        handleButtonClick={handleButtonClick}
        option={option}
      />

      {/* Main content area */}
      <div className="flex flex-col flex-1 h-full">
        {/* Navbar */}
        <Navbar
          handleSideBarToggle={handleSideBarToggle}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Content area */}
        <div className="flex-1 pt-14 sm:pt-0 overflow-auto">
          {handleOptions()}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
