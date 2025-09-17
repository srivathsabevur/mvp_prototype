import { PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";
import React from "react";

const ViewAllChecklist = ({ setOption }) => {
  const data = Array.from({ length: 8 }, (_, i) => ({
    checklist: `Checklist ${i + 1}`,
  }));

  return (
    <div className="flex flex-col p-5 bg-gray-50 h-full">
      <div className="md:flex w-full gap-2">
        <input
          type="text"
          className="md:w-[70%] bg-white w-full border p-2 border-black/10 focus:outline-none rounded-lg"
          placeholder="Search"
        />

        <div className="md:w-[30%] w-full flex gap-2 md:mt-0 mt-3">
          <button
            value="createChecklist"
            onClick={() => setOption("createChecklist")}
            className="btn-primary text-sm flex justify-center items-center gap-2 "
          >
            <PlusOutlined />
            Create Checklist
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5 w-full overflow-y-auto">
        {data.length === 0 ? (
          <Empty />
        ) : (
          data.map((value, index) => (
            <div
              key={index}
              className="flex flex-col bg-white border border-black/10 rounded-lg gap-5 p-5 w-full transform-translate-full duration-150 ease-in hover:shadow-[0_2px_7px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
            >
              <h1>{value.checklist}</h1>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAllChecklist;
