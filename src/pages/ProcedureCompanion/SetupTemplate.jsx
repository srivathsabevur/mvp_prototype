import { ArrowLeftOutlined, SaveOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Select, Space, Upload } from "antd";
import React, { useState } from "react";
import RichTextEditor from "../../components/RichTextEditor";
import Sites from "../../components/ProcedureCompanionComponents/SetupTemplate/Sites";
import LogoUpload from "../../components/ProcedureCompanionComponents/SetupTemplate/LogoUpload";
import TextArea from "antd/es/input/TextArea";

const SetupTemplate = ({ setOption }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  const roles = ["Operator", "Supervisor", "Cleaner", "Admin"];
  const options = roles.map((value) => ({ label: value, value }));

  const procedureTypes = ["Checklist", "Non-checklist", "Routine"];
  const procedureTypesOptions = procedureTypes.map((value) => ({
    label: value,
    value,
  }));

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
    <div className="w-full h-full">
      <div>
        <h1 className="text-dashboard-text">Company Logo</h1>
        <p>Upload your company logo</p>
      </div>
      <div>
        <div className="border-2 border-dashed border-dashboard-border rounded-lg p-8 text-center hover:border-dashboard-accent transition-smooth">
          <p className="text-dashboard-text-muted mb-2">
            Drop your logo here or
          </p>
          <Button type="primary">Browse Files</Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100">
      <div className="flex justify-between items-center">
        <h1 className="text-xl ml-2 md:text-3xl font-semibold">
          Setup Template
        </h1>
        <Button
          onClick={() => setOption("viewAllProcedures")}
          type="primary"
          size="middle"
          icon={<ArrowLeftOutlined />}
        >
          Back
        </Button>
      </div>

      <div className="w-full h-fit mt-5 overflow-y-auto p-2">
        <Form
          onFinish={handleOnFinish}
          style={{ maxWidth: "100%" }}
          layout="vertical"
        >
          {/* TemplateName CompanyName&Logo ProcedureType and Roles */}
          <div className="flex flex-col md:flex-row gap-5 h-full justify-between mx-auto items-stretch">
            <div className="w-full md:w-[80%] flex  flex-col md:flex-row md:gap-5 gap-0 p-5 bg-white rounded-lg">
              <div className="w-full flex-col md:flex-row">
                <Form.Item
                  label={
                    <span className="text-xl font-bold">Template Name</span>
                  }
                  name="templateName"
                >
                  <Input type="text" placeholder="Enter template name" />
                </Form.Item>
                <Form.Item
                  label={
                    <span className="text-xl font-bold">Company Name</span>
                  }
                  name="companyName"
                >
                  <Input type="text" placeholder="Enter company name" />
                </Form.Item>
              </div>
              <div className="w-full">
                <Form.Item
                  label={<span className="text-xl font-bold">Roles</span>}
                  name="role"
                >
                  <Select
                    mode="tags"
                    options={options}
                    placeholder="Select desired role"
                  />
                </Form.Item>
                <Form.Item
                  name="procedureType"
                  label={
                    <span className="text-xl font-bold">Procedure Type</span>
                  }
                >
                  <Select
                    mode="multiple"
                    options={procedureTypesOptions}
                    placeholder="Select a procedure type"
                  />
                </Form.Item>
              </div>
            </div>

            <div className="md:w-[20%] flex w-full h-full   p-3 bg-white rounded-lg">
              {/* <Form.Item
                label={<span className="text-xl font-bold">Company Logo</span>}
                name="companyLogo"
                valuePropName="fileList"
                style={{ height: "100%", width: "100%" }}
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[
                  { required: true, message: "Please upload company logo" },
                ]}
              ></Form.Item> */}
              <LogoUpload width="w-full" height="h-auto" />
            </div>
          </div>
          {/* Sites */}
          <div className="p-5 bg-white rounded-lg mt-5">
            <Sites />
          </div>

          {/* <div className="flex flex-col w-full"></div>

          <Rules /> */}
          {/* Rules */}
          <div className="p-5 bg-white rounded-lg my-5">
            <Form.Item
              label={<span className="text-xl font-bold">Rules</span>}
              name="rules"
            >
              {/* <RichTextEditor placeholder="Enter rules here..." /> */}
              <TextArea rows={5} placeholder="Enter rules here..." />
            </Form.Item>
          </div>
          <Button icon={<SaveOutlined />} type="primary" htmlType="submit">
            Save Template
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default SetupTemplate;
