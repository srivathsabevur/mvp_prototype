import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Tabs } from "antd";
import ErrorBoundary from "antd/es/alert/ErrorBoundary";
import React, { useState } from "react";
import Metadata from "../../components/ChecklistCompanionComponents/Metadata";
import Section from "../../components/ChecklistCompanionComponents/Section";
import Questions from "../../components/ChecklistCompanionComponents/Questions";
import MapQuestions from "../../components/ChecklistCompanionComponents/MapQuestions";

const CreateChecklist = ({ setOption }) => {
  const [activeKey, setActiveKey] = useState("1");

  const fallback = <div>Something went wrong</div>;

  const items = [
    {
      key: "1",
      label: "Description",
      children: (
        <ErrorBoundary fallback={fallback}>
          <Metadata />
        </ErrorBoundary>
      ),
    },
    {
      key: "2",
      label: "Section",
      children: (
        <ErrorBoundary fallback={fallback}>
          <Section />
        </ErrorBoundary>
      ),
    },
    {
      key: "3",
      label: "Questions",
      children: (
        <ErrorBoundary fallback={fallback}>
          <Questions />
        </ErrorBoundary>
      ),
    },
    {
      key: "4",
      label: "Map Questions",
      children: (
        <ErrorBoundary fallback={fallback}>
          <MapQuestions />
        </ErrorBoundary>
      ),
    },
  ];
  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100  -z-100">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-semibold">Create Checklist</h1>
        <Button
          onClick={() => setOption("viewAllChecklist")}
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

export default CreateChecklist;
