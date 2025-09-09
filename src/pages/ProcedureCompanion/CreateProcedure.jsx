import { Button, message, Tabs } from "antd";
import React, { useState } from "react";

import { ErrorBoundary } from "react-error-boundary";

import { ArrowLeftOutlined } from "@ant-design/icons";
import ProcedureMetaData from "../../components/ProcedureCompanionComponents/CreateProcedure/ProcedureMetaData";
import ProcedureInfo from "../../components/ProcedureCompanionComponents/CreateProcedure/ProcedureInfo";
import Tasks from "../../components/ProcedureCompanionComponents/CreateProcedure/Tasks";

const CreateProcedure = ({ setOption }) => {
  const fallback = <div>Something went wrong</div>;
  const [activeKey, setActiveKey] = useState("1");

  const onFinish = (values) => {
    try {
      console.log(values);
      if (activeKey === "1") {
        setActiveKey("2");
      } else if (activeKey === "2") {
        setActiveKey("3");
      }

      message.success("Form submitted successfully!");
    } catch (error) {
      message.error("Form submission failed!");
    }
  };

  const items = [
    {
      key: "1",
      label: "Metadata",
      children: (
        <ErrorBoundary fallback={fallback}>
          <ProcedureMetaData onFinish={onFinish} />
        </ErrorBoundary>
      ),
    },
    {
      key: "2",
      label: "Procedure Info",
      children: (
        <ErrorBoundary fallback={fallback}>
          <ProcedureInfo onFinish={onFinish} />
        </ErrorBoundary>
      ),
    },
    {
      key: "3",
      label: "Action/Task",
      children: (
        <ErrorBoundary fallback={fallback}>
          <Tasks onFinish={onFinish} />
        </ErrorBoundary>
      ),
    },
  ];

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100  -z-100">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-semibold">Create Procedure</h1>
        <Button
          onClick={() => setOption("viewAllProcedures")}
          type="primary"
          size="middle"
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      </div>

      <Tabs activeKey={activeKey} onChange={setActiveKey} items={items} />
    </div>
  );
};

export default CreateProcedure;
