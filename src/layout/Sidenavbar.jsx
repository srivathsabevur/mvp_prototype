import React from "react";

const Sidenavbar = ({
  sideBarRef,
  isSidebarOpen,
  dashboardOptions,
  handleButtonClick,
  option,
}) => {
  return (
    <div
      ref={sideBarRef}
      className={`fixed sm:static sm:translate-x-0 transition-transform duration-500 sm:flex sm:flex-col w-64 h-full border border-black/10 bg-[#051A2E] p-3 z-100 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
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
              {btn.icon}
              {btn.value}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidenavbar;
