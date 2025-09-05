import React, { useEffect, useState } from "react";
import RichTextEditor from "./RichTextEditor";
import { Checkbox, DatePicker, Form, Button, Radio } from "antd";
import TextArea from "antd/es/input/TextArea";
import {
  DollarCircleOutlined,
  DoubleRightOutlined,
  SettingOutlined,
  WarningOutlined,
} from "@ant-design/icons";

const ProcedureInfo = ({ onFinish }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const handleFinish = (values) => {
    console.log("Form submitted:", values);
  };
  const radioOptions = [
    {
      value: "Financial",
      label: (
        <span className="flex gap-1 text-[#16a34a] md:text-lg text-xs">
          <DollarCircleOutlined /> Financial
        </span>
      ),
    },
    {
      value: "Critical",
      label: (
        <span className="flex gap-1 text-[#dc2626] md:text-lg text-xs">
          <WarningOutlined /> Critical
        </span>
      ),
    },
    {
      value: "Operational",
      label: (
        <span className="flex gap-1 text-[#2563eb] md:text-lg text-xs">
          <SettingOutlined /> Operational
        </span>
      ),
    },
  ];
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          procedureInfo: [],
        }}
      >
        {/* -------- Purposes -------- */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-3">Purpose</h2>
          <div className="flex flex-col md:flex-row w-full md:w-[90%] md:gap-5">
            <Form.Item
              name="procedureInfoText"
              rules={[
                { required: true, message: "Please enter procedure info" },
              ]}
              valuePropName="value"
              getValueFromEvent={(val) => val}
              initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}
              className="flex-1"
            >
              <RichTextEditor placeholder="Write your procedure info here..." />
            </Form.Item>

            <Form.Item
              name="purposeTag"
              rules={[
                { required: true, message: "Please select at least one tag" },
              ]}
            >
              <Radio.Group
                size="small"
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  gap: isMobile ? 2 : 5,
                  marginTop: isMobile ? 3 : 42,
                }}
                options={radioOptions}
              />
            </Form.Item>
          </div>
        </div>

        {/* -------- Scope -------- */}
        <div className="w-full">
          <h2 className="text-xl font-bold mb-3">Scope</h2>
          <div className="flex flex-col md:flex-row w-full md:w-[90%] md:gap-5">
            <Form.Item
              name="scope"
              rules={[{ required: true, message: "Please enter scope" }]}
              valuePropName="value"
              getValueFromEvent={(val) => val}
              initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}
              className="flex-1"
            >
              <RichTextEditor placeholder="Write your scope here..." />
            </Form.Item>

            <Form.Item
              name="scopeTag"
              rules={[
                { required: true, message: "Please select at least one tag" },
              ]}
            >
              <Radio.Group
                style={{
                  display: "flex",
                  flexDirection: isMobile ? "row" : "column",
                  gap: "1rem",
                  marginTop: isMobile ? 3 : 42,
                }}
                options={radioOptions}
              />
            </Form.Item>
          </div>
        </div>

        {/* -------- When to Execute -------- */}
        <Form.Item
          label={
            <span className="text-xl font-bold mb-3">When to execute</span>
          }
          style={{ width: "100%" }}
          name="executionDate"
          rules={[{ required: true, message: "Please select a date" }]}
          getValueFromEvent={(val) => val}
          initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}
        >
          <RichTextEditor />
        </Form.Item>

        <Form.Item
          name="instructions"
          style={{ width: "100%" }}
          label={<span className="text-xl font-bold mb-3">Instructions</span>}
          rules={[{ required: true, message: "Please enter instructions" }]}
          getValueFromEvent={(val) => val}
          initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}
        >
          <RichTextEditor />
        </Form.Item>

        <Form.Item>
          <Button
            iconPosition="end"
            icon={<DoubleRightOutlined />}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ProcedureInfo;
