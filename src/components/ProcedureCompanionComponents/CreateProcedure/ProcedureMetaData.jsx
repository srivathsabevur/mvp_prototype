import React, { useState } from "react";
import { Button, DatePicker, Form, Input, Radio, Select } from "antd";
import {
  DoubleRightOutlined,
  PlusOutlined,
  DeleteOutlined,
} from "@ant-design/icons";

const ProcedureMetaData = ({ onFinish }) => {
  const roles = ["Operator", "Supervisor", "Cleaner", "Admin"];
  const roleOptions = roles.map((value) => ({ label: value, value }));

  const templateOptions = Array.from({ length: 5 }, (_, i) => ({
    label: `Template ${i + 1}`,
    value: `Template ${i + 1}`,
  }));

  const [procedures, setProcedures] = useState([
    {
      id: crypto.randomUUID(),
      procedureNum: "",
      procedureName: "",
      risk: "low",
      roles: [],
      validity: null,
      assets: "",
      template: "",
    },
  ]);

  const addNewProcedure = () => {
    const newProcedure = {
      id: crypto.randomUUID(),
      procedureNum: "",
      procedureName: "",
      risk: "low",
      roles: [],
      validity: null,
      assets: "",
      template: "",
    };
    setProcedures([...procedures, newProcedure]);
  };

  const removeProcedure = (id) => {
    if (procedures.length > 1) {
      setProcedures(procedures.filter((proc) => proc.id !== id));
    }
  };

  const handleFormFinish = (values) => {
    // Combine form values with procedure dnpm run deata
    const formData = {
      procedures: procedures,
      ...values,
    };
    onFinish(formData);
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      <Form
        layout="vertical"
        style={{ maxWidth: "100%" }}
        onFinish={handleFormFinish}
      >
        <div className="flex flex-col h-full">
          {procedures.map((procedure, index) => (
            <div
              key={procedure.id}
              className="border-2 border-gray-200 rounded-lg p-4 mb-4"
            >
              {/* Procedure Card Header */}
              <div className="flex justify-end items-center mb-4">
                {procedures.length > 1 && (
                  <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => removeProcedure(procedure.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </Button>
                )}
              </div>

              {/* First Row: Template and Procedure Number */}
              <div className="flex flex-col md:flex-row gap-5 w-full mb-4">
                <Form.Item
                  label={<span className="text-xl font-bold">Template</span>}
                  name={`template_${procedure.id}`}
                  style={{ width: "100%" }}
                  rules={[
                    { required: true, message: "Please select a template" },
                  ]}
                >
                  <Select
                    placeholder="Select a template"
                    options={templateOptions}
                  />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-xl font-bold">Procedure Number</span>
                  }
                  name={`procedureNum_${procedure.id}`}
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter procedure number",
                    },
                  ]}
                >
                  <Input placeholder="Enter procedure number (e.g., P001)" />
                </Form.Item>
              </div>

              {/* Second Row: Procedure Name */}
              <div className="flex flex-col w-full mb-4">
                <Form.Item
                  label={
                    <span className="text-xl font-bold">Procedure Name</span>
                  }
                  name={`procedureName_${procedure.id}`}
                  style={{ width: "100%" }}
                  rules={[
                    { required: true, message: "Please enter procedure name" },
                  ]}
                >
                  <Input placeholder="Enter procedure name" />
                </Form.Item>
              </div>

              {/* Third Row: Risk and Roles */}
              <div className="flex flex-col md:flex-row gap-5 w-full mb-4">
                <Form.Item
                  label={<span className="text-xl font-bold">Risk</span>}
                  style={{ width: "100%" }}
                  name={`risk_${procedure.id}`}
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

                <Form.Item
                  label={<span className="text-xl font-bold">Roles</span>}
                  name={`roles_${procedure.id}`}
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please select at least one role",
                    },
                  ]}
                >
                  <Select
                    mode="multiple"
                    allowClear
                    style={{ width: "100%" }}
                    placeholder="Select roles"
                    options={roleOptions}
                  />
                </Form.Item>
              </div>

              {/* Fourth Row: Validity and Assets */}
              <div className="flex flex-col md:flex-row gap-5 w-full">
                <Form.Item
                  label={<span className="text-xl font-bold">Validity</span>}
                  name={`validity_${procedure.id}`}
                  style={{ width: "100%" }}
                  rules={[
                    { required: true, message: "Please pick a validity date" },
                  ]}
                >
                  <DatePicker style={{ width: "100%" }} />
                </Form.Item>

                <Form.Item
                  label={
                    <span className="text-xl font-bold">Assets/Equipments</span>
                  }
                  name={`assets_${procedure.id}`}
                  style={{ width: "100%" }}
                  rules={[
                    {
                      required: true,
                      message: "Please enter assets/equipments",
                    },
                  ]}
                >
                  <Input placeholder="Enter the Equipments/Assets required" />
                </Form.Item>
              </div>
            </div>
          ))}

          {/* Add New Procedure Button */}
          <div className="flex gap-5">
            <Button
              type="dashed"
              onClick={addNewProcedure}
              icon={<PlusOutlined />}
              size="large"
              className="w-full md:w-auto"
            >
              Add New Procedure
            </Button>
            <Form.Item className="text-center">
              <Button
                iconPosition="end"
                icon={<DoubleRightOutlined />}
                type="primary"
                htmlType="submit"
                size="large"
              >
                Save
              </Button>
            </Form.Item>
          </div>

          {/* Save Button */}
        </div>
      </Form>
    </div>
  );
};

export default ProcedureMetaData;
