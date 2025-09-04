import React from "react";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import { DoubleRightOutlined } from "@ant-design/icons";

const ProcedureMetaData = ({ onFinish }) => {
  const roles = ["Operator", "Supervisor", "Cleaner", "Admin"];
  const roleOptions = roles.map((value) => ({ label: value, value }));

  const templateOptions = Array.from({ length: 5 }, (_, i) => ({
    label: `Template ${i + 1}`,
    value: `Template ${i + 1}`,
  }));

  const procedureOptions = Array.from({ length: 5 }, (_, i) => ({
    label: `Procedure ${i + 1}`,
    value: `Procedure ${i + 1}`,
  }));

  return (
    <div className="p-5 bg-white w-full h-auto rounded-lg">
      <Form layout="vertical" style={{ maxWidth: "100%" }} onFinish={onFinish}>
        <div className="flex flex-col h-full">
          <div className="flex flex-col md:flex-row gap-5 w-full">
            {/* Template */}
            <Form.Item
              label={<span className="text-xl font-bold">Template</span>}
              name="template"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please select a template" }]}
            >
              <Select
                placeholder="Select a template"
                options={templateOptions}
              />
            </Form.Item>

            {/* Procedure */}
            <Form.Item
              label={<span className="text-xl font-bold">Procedure</span>}
              name="procedure"
              style={{ width: "100%" }}
              rules={[{ required: true, message: "Please select a procedure" }]}
            >
              <Select
                placeholder="Select a procedure"
                options={procedureOptions}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col md:flex-row gap-5 w-full">
            {/* Risk */}
            <Form.Item
              label={<span className="text-xl font-bold">Risk</span>}
              style={{ width: "100%" }}
              name="risk"
              rules={[
                {
                  required: true,
                  message: "Please select at least one risk level",
                },
              ]}
              initialValue="low"
            >
              <Radio.Group defaultValue="low">
                <Radio.Button value="low">Low</Radio.Button>
                <Radio.Button value="medium">Medium</Radio.Button>
                <Radio.Button value="high">High</Radio.Button>
              </Radio.Group>
            </Form.Item>
            {/* Roles */}
            <Form.Item
              label={<span className="text-xl font-bold">Roles</span>}
              name="roles"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Please select at least one role" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Select a role"
                options={roleOptions}
              />
            </Form.Item>
          </div>
          <div className="flex flex-col md:flex-row gap-5 w-full">
            {/* Validity  */}
            <Form.Item
              label={<span className="text-xl font-bold">Validity</span>}
              name="validity"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Please pick a validity date" },
              ]}
            >
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>

            {/* Assets/Equipments */}
            <Form.Item
              label={
                <span className="text-xl font-bold">Assets/Equipments</span>
              }
              name="assets"
              style={{ width: "100%" }}
              rules={[
                { required: true, message: "Please enter assets/equipments" },
              ]}
            >
              <Input placeholder="Enter the Equipments/Assets required" />
            </Form.Item>
          </div>
        </div>

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

export default ProcedureMetaData;
