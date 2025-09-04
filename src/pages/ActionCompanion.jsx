import { IdcardOutlined, TableOutlined } from "@ant-design/icons";
import { Button, Empty, Table } from "antd";
import React, { useState } from "react";

const ActionCompanion = () => {
  const [showInGrid, setShowInGrid] = useState(true);

  const showDate = () => {
    const date = new Date();
    return date.toLocaleDateString();
  };

  const data = Array.from({ length: 9 }, (_, i) => ({
    key: i + 1,
    task: `Task ${i + 1}`,
    subject: "Ullamco quis esse esse veniam ad",
    assignedDate: showDate(),
  }));

  const coloumns = [
    {
      key: "task",
      title: "Tasks",
      dataIndex: "task",
    },
    {
      key: "subject",
      title: "Subject",
      dataIndex: "subject",
    },
    {
      key: "assignedDate",
      title: "Assigned Date",
      dataIndex: "assignedDate",
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100">
      <div className="pr-1 flex w-full justify-end items-end">
        <Button
          size="large"
          icon={showInGrid ? <IdcardOutlined /> : <TableOutlined />}
          onClick={() => setShowInGrid(!showInGrid)}
        />
      </div>
      {showInGrid ? (
        <div className="mt-10 overflow-y-scroll">
          <Table
            dataSource={data}
            columns={coloumns}
            pagination={false}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "bg-blue-100" : "bg-white"
            }
            className="rounded-lg shadow-sm"
          />
        </div>
      ) : (
        <div
          className={`w-[100%] grid grid-cols-1 md:grid-cols-3  gap-6 mt-5 overflow-y-auto p-2`}
        >
          {data.length === 0 ? (
            <>
              <Empty />
            </>
          ) : (
            data.map((value, index) => {
              return (
                <div
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-blue-100" : "bg-white"
                  }  flex flex-col  p-3 gap-3 border border-black/10 rounded-lg transform-translate-full duration-150 ease-in hover:shadow-[0_2px_7px_rgba(0,0,0,0.2)] hover:-translate-y-0.5`}
                >
                  <h1 className="text-lg font-medium">{value.task}</h1>
                  <div>
                    <h3 className="font-bold">Subject</h3>
                    <p className="leading-snug">{value.subject}</p>
                  </div>
                  <div>
                    <h3 className="font-bold ">Assigned Date</h3>
                    <p>{value.assignedDate}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default ActionCompanion;
