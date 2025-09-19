import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Select, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const Metadata = ({ setOption }) => {
  const [description, setDescription] = useState("");
  const [metadata, setMetadata] = useState([]);

  const handleCreateMetadata = () => {
    if (metadata.length === 0) {
      setMetadata([{ id: crypto.randomUUID(), key: "", responseType: "" }]);
    }
  };

  const handleAddMetadata = () => {
    setMetadata([
      ...metadata,
      { id: crypto.randomUUID(), key: "", responseType: "" },
    ]);
  };

  const handleMetadataChange = (index, field, value) => {
    const updatedMetadata = [...metadata];
    updatedMetadata[index] = { ...updatedMetadata[index], [field]: value };
    setMetadata(updatedMetadata);
  };

  const handleRemoveMetadata = (index) => {
    const updatedMetadata = metadata.filter((_, i) => i !== index);
    setMetadata(updatedMetadata);
  };

  const handleSubmit = (values) => {
    console.log({ description, metadata });
  };

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100  -z-100">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg md:text-3xl font-semibold">
          Create Checklist & Metadata
        </h1>
        <Button
          onClick={() => setOption("viewAllChecklist")}
          type="primary"
          size="middle"
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      </div>
      <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
        <Form
          onFinish={handleSubmit}
          layout="vertical"
          style={{ maxWidth: "100%" }}
        >
          <Form.Item
            label={<span className="text-xl font-bold">Checklist Name</span>}
          >
            <Input
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter Checklist Name"
            />
          </Form.Item>
          {metadata.length === 0 ? (
            <Button
              className="mr-2"
              onClick={handleCreateMetadata}
              type="primary"
              icon={<PlusOutlined />}
            >
              Create Metadata
            </Button>
          ) : (
            metadata.map((item, index) => (
              <div
                key={item.id}
                className="flex flex-col gap-3 p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex gap-5">
                  <Form.Item
                    label={
                      <span className="text-lg font-medium">Metadata Key</span>
                    }
                    style={{ width: "100%" }}
                  >
                    <Input
                      value={item.key}
                      placeholder="Enter Key"
                      onChange={(e) =>
                        handleMetadataChange(index, "key", e.target.value)
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    label={
                      <span className="text-lg font-medium">Response Type</span>
                    }
                    style={{ width: "100%" }}
                  >
                    <Select
                      onChange={(value) =>
                        handleMetadataChange(index, "responseType", value)
                      }
                      placeholder="Select Response Type"
                    >
                      <Select.Option key="text" value="text">
                        Text
                      </Select.Option>
                      <Select.Option key="date" value="date">
                        Date
                      </Select.Option>
                      <Select.Option key="checkbox" value="checkbox">
                        Checkbox
                      </Select.Option>
                      <Select.Option key="calendar" value="calendar">
                        Calendar
                      </Select.Option>
                    </Select>
                  </Form.Item>
                </div>
                <div className="flex gap-3">
                  {index === metadata.length - 1 && (
                    <Button
                      onClick={handleAddMetadata}
                      type="primary"
                      icon={<PlusOutlined />}
                    >
                      Add Metadata
                    </Button>
                  )}
                  {metadata.length > 1 && (
                    <Button onClick={() => handleRemoveMetadata(index)} danger>
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
          <Button
            className="mt-2"
            icon={<SaveOutlined />}
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Metadata;
