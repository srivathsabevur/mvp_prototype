import {
  ArrowLeftOutlined,
  PlusOutlined,
  SaveOutlined,
  StepBackwardOutlined,
} from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Upload } from "antd";
import React, { useState } from "react";
import RichTextEditor from "./RichTextEditor";

const SetupTemplate = ({ setOption }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const roles = ["Operator", "Supervisor", "Cleaner", "Admin"];
  const options = roles.map((value) => ({ label: value, value }));

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = reject;
    });

  const handleOnFinish = (values) => {
    console.log("Form Submitted:", values);
  };

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || "");
  };

  const handleChange = ({ fileList: newList }) => setFileList(newList);

  const uploadButton = (
    <div>
      <PlusOutlined />
      <div className="mt-1 h-full">Upload</div>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-lg md:text-3xl font-semibold">Setup Template</h1>
        <Button
          onClick={() => setOption("viewAllProcedures")}
          type="primary"
          size="middle"
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      </div>

      <div className="p-5 bg-white w-full h-fit mt-5 rounded-lg overflow-y-auto">
        <Form
          onFinish={handleOnFinish}
          style={{ maxWidth: "100%" }}
          layout="vertical"
        >
          <div className="flex flex-col md:flex-row flex-1 gap-5 h-full">
            <div className="md:w-1/2 w-full">
              <Form.Item
                label={<span className="text-xl font-bold">Template Name</span>}
                name="templateName"
                rules={[
                  { required: true, message: "Please enter template name" },
                ]}
              >
                <Input type="text" placeholder="Enter template name" />
              </Form.Item>
              <Form.Item
                label={<span className="text-xl font-bold">Company Name</span>}
                name="companyName"
                rules={[
                  { required: true, message: "Please enter company name" },
                ]}
              >
                <Input type="text" placeholder="Enter company name" />
              </Form.Item>
              <Form.Item
                label={<span className="text-xl font-bold">Roles</span>}
                name="role"
                rules={[{ required: true, message: "Please select a role" }]}
              >
                <Select
                  mode="multiple"
                  options={options}
                  placeholder="Select desired role"
                />
              </Form.Item>
            </div>
            <div className="md:w-1/2 w-full h-full">
              <Form.Item
                label={<span className="text-xl font-bold">Company Logo</span>}
                name="companyLogo"
                valuePropName="fileList"
                style={{ height: "100%" }}
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  { required: true, message: "Please upload company logo" },
                ]}
              >
                <Upload
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={handlePreview}
                  onChange={handleChange}
                  maxCount={1}
                  style={{ width: "100%", height: 220 }}
                  accept="image/*"
                >
                  {fileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Form.Item>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                style={{ width: "100%", height: 220 }}
                onCancel={() => setPreviewOpen(false)}
              >
                <img
                  alt="preview"
                  style={{ width: "100%" }}
                  src={previewImage}
                />
              </Modal>
            </div>
          </div>

          <Form.Item
            label={<span className="text-xl font-bold">Rules</span>}
            name="rules"
            valuePropName="value"
            getValueFromEvent={(val) => val}
            rules={[{ required: true, message: "Please enter rules" }]}
            initialValue={[
              {
                type: "paragraph",
                children: [{ text: "Start writing here..." }],
              },
            ]}
          >
            <RichTextEditor placeholder="Enter rules here..." />
          </Form.Item>

          <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
            Save Template
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SetupTemplate;
