import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  TimePicker,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";

const Section = () => {
  const [sections, setSections] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm(); // Create form instance

  const handleModelOk = () => {
    form
      .validateFields()
      .then((values) => {
        // Create new section with form values
        setSections([
          ...sections,
          {
            sectionId: crypto.randomUUID(),
            sectionName: values.sectionName,
            sectionDescription: values.sectionDescription,
          },
        ]);

        // Reset form and close modal
        form.resetFields();
        setOpenModal(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields(); // Reset form when canceling
    setOpenModal(false);
  };

  const handleDelete = (sectionId) => {
    setSections(sections.filter((value) => value.sectionId !== sectionId));
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      <Form layout="vertical" style={{ maxWidth: "100%" }}>
        {sections.length === 0 ? (
          <div className="w-full flex flex-col gap-5 justify-center items-center">
            <Empty description="" />
            <h1 className="text-center text-xl font-semibold">No sections</h1>
            <Button
              onClick={() => setOpenModal(true)}
              size="large"
              type="primary"
            >
              Create New Section
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="flex justify-end items-center">
              <Button
                onClick={() => setOpenModal(true)}
                icon={<PlusOutlined />}
                className="w-fit"
                type="primary"
              >
                Add Section
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {sections.map((section, index) => (
                <div
                  key={section.sectionId}
                  className="relative w-full bg-gray-50 rounded-lg p-5 max-w-[350px]"
                >
                  <div className="absolute top-0 right-0 p-3">
                    <Button
                      onClick={() => handleDelete(section.sectionId)}
                      danger
                      icon={<DeleteOutlined />}
                    />
                  </div>
                  <h1 className="text-lg font-medium truncate pr-12">
                    {section.sectionName}
                  </h1>
                  <p className="text-base text-gray-600 leading-snug line-clamp-3">
                    {section.sectionDescription}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        <Modal
          title="New Section"
          closable={{ "aria-label": "Custom Close Button" }}
          onCancel={handleCancel}
          onOk={handleModelOk}
          open={openModal}
        >
          <Form form={form} layout="vertical" style={{ width: "100%" }}>
            <Form.Item
              name="sectionName"
              style={{ width: "100%" }}
              label={<span className="text-lg font-bold">Section Name</span>}
              rules={[
                { required: true, message: "This field cannot be empty" },
              ]}
            >
              <Input style={{ width: "100%" }} placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              name="sectionDescription"
              style={{ width: "100%" }}
              label={<span className="text-lg font-bold">Description</span>}
              rules={[
                { required: true, message: "This field cannot be empty" },
              ]}
            >
              <TextArea
                placeholder="Enter description"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Form>
        </Modal>
      </Form>
    </div>
  );
};

export default Section;
