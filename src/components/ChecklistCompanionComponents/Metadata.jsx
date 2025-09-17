import { DatePicker, Form, Input, TimePicker } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";

const Metadata = () => {
  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      <Form layout="vertical" style={{ maxWidth: "100%" }}>
        <div className="flex flex-col md:flex-row w-full gap-5">
          <Form.Item
            style={{ width: "100%" }}
            label={<span className="text-xl font-bold">Date&Time</span>}
          >
            <DatePicker style={{ width: "100%" }} showTime />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            label={<span className="text-xl font-bold">Time of Expiry</span>}
          >
            <TimePicker style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row w-full gap-5">
          <Form.Item
            style={{ width: "100%" }}
            label={<span className="text-xl font-bold">Employee</span>}
          >
            <Input placeholder="Enter employee" style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            style={{ width: "100%" }}
            label={<span className="text-xl font-bold">Location</span>}
          >
            <Input placeholder="Enter location" style={{ width: "100%" }} />
          </Form.Item>
        </div>
        <div className="flex flex-col md:flex-row">
          <Form.Item
            style={{ width: "100%" }}
            label={<span className="text-xl font-bold">Location</span>}
          >
            <TextArea placeholder="Enter description" rows={4} />
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};

export default Metadata;
