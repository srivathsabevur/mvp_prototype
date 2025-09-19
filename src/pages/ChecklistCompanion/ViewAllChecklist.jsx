import { PlusOutlined } from "@ant-design/icons";
import { Empty } from "antd";
import React from "react";

const ViewAllChecklist = ({ setOption }) => {
  const data = Array.from({ length: 8 }, (_, i) => ({
    checklist: `Checklist ${i + 1}`,
    checklistId: `${i + 1}${i + 3}${i + 7}${i + 4}`,
    metaData: [{ key: "Date" }, { key: "Time" }, { key: "Location" }],
  }));

  const menuOptions = [
    {
      key: "createChecklist",
      btnName: "Create Checklist & Metadata",
    },
    {
      key: "createSection",
      btnName: "Checklist Section",
    },
    {
      key: "createQuestion",
      btnName: "Checklist Questions",
    },
    {
      key: "mapSection",
      btnName: "Publish Checklist",
    },
  ];

  return (
    <div className="flex flex-col p-5 bg-gray-50 h-full">
      <div className="w-full flex flex-col md:flex-row gap-3">
        <input
          type="text"
          className="md:w-2/5 w-full bg-white border p-2 border-black/10 focus:outline-none rounded-lg"
          placeholder="Search"
        />

        <div className="md:w-3/5 w-full flex flex-wrap md:flex-nowrap   gap-2">
          {menuOptions.map((btn, index) => (
            <button
              key={index}
              value={btn.key}
              onClick={() => setOption(btn.key)}
              className="btn-primary text-sm flex justify-center items-center gap-2"
            >
              <PlusOutlined />
              {btn.btnName}
            </button>
          ))}
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
              <div className="flex justify-between items-center">
                <h1 className="text-lg font-semibold">{value.checklist}</h1>
                <p className="font-medium text-gray-500">
                  #{value.checklistId}
                </p>
              </div>
              <div>
                <h3 className="font-medium text-base text-gray-700">
                  Metadata
                </h3>
                <div className="flex gap-2 mt-2">
                  {value.metaData.map((obj, id) => (
                    <div
                      key={id}
                      className="text-sm px-2 py-1 rounded-lg text-blue-600 bg-blue-50"
                    >
                      {obj.key}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAllChecklist;
