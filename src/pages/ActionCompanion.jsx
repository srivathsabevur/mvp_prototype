import {
  IdcardOutlined,
  OrderedListOutlined,
  TableOutlined,
} from "@ant-design/icons";
import { Button, Card, Empty, Table, Tooltip } from "antd";
import React, { useState } from "react";

const ActionCompanion = () => {
  const [showInGrid, setShowInGrid] = useState(false);

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

  const gridStyle = {
    width: "50%",
    textAlign: "center",
  };

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-50">
      <div className="pr-1 flex w-full justify-end items-end">
        <Tooltip title={showInGrid ? "Card layout" : "Table layout"}>
          <Button
            size="large"
            icon={showInGrid ? <IdcardOutlined /> : <TableOutlined />}
            onClick={() => setShowInGrid(!showInGrid)}
          />
        </Tooltip>
      </div>
      {showInGrid ? (
        <div className="mt-10 overflow-y-scroll border border-black/10 rounded-t-lg">
          <Table
            rowHoverable={false}
            dataSource={data}
            columns={coloumns}
            pagination={false}
            rowClassName={(_, index) =>
              index % 2 === 0 ? "bg-orange-100" : "bg-white"
            }
            className="rounded-lg shadow-sm"
          />
        </div>
      ) : (
        <div
          className={`w-[100%] grid grid-cols-1 md:grid-cols-4  gap-6 mt-5 overflow-y-auto p-2`}
        >
          {data.length === 0 ? (
            <>
              <Empty />
            </>
          ) : (
            data.map((value, index) => {
              {
                /* return (
                <div key={index} className="w-full">
                  <Card hoverable title={value.task}>
                    <div className="flex w-full justify-center items-center text-center">
                      <div className="flex flex-col w-1/2">
                        <h3 className="font-bold">Subject</h3>
                        <p className="leading-snug">{value.subject}</p>
                      </div>
                      <div className="flex flex-col w-1/2">
                        <h3 className="font-bold ">Assigned Date</h3>
                        <p>{value.assignedDate}</p>
                      </div>
                    </div>
                  </Card>
                </div>
              ); */
              }
              /* <div
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
                </div> */
              return (
                <div
                  className="flex flex-col bg-white border border-black/10 rounded-lg gap-5 p-5 w-full transform-translate-full duration-150 ease-in hover:shadow-[0_2px_7px_rgba(0,0,0,0.2)] hover:-translate-y-0.5"
                  key={index}
                >
                  <div className="flex justify-start items-center gap-3">
                    <p className="bg-orange-100 text-[#FF9933] p-2">
                      <OrderedListOutlined />
                    </p>
                    <h1 className="text-lg font-semibold">{value.task}</h1>
                  </div>
                  <div className="flex flex-col gp-1">
                    <h2 className="text-md font-semibold">Subject</h2>
                    <p className="text-medium text-gray-600">{value.subject}</p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 font-semibold">
                      Assigned Date {value.assignedDate}
                    </p>
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
