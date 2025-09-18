import {
  PlusOutlined,
  DeleteOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Modal,
  Select,
  Radio,
  InputNumber,
  Empty,
  Switch,
} from "antd";
import React, { useState } from "react";
const { Option } = Select;

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [form] = Form.useForm();

  // Mock sections data
  const sections = [
    { sectionId: "1", sectionName: "General Information" },
    { sectionId: "2", sectionName: "Technical Skills" },
    { sectionId: "3", sectionName: "Experience" },
  ];

  const handleModalOk = () => {
    form
      .validateFields()
      .then((values) => {
        const newQuestion = {
          questionId: crypto.randomUUID(),
          sectionId: values.sectionId,
          question: values.question,
          isHeading: values.isHeading,
          responseType: values.responseType,
          responses:
            values.responseType === "single"
              ? [values.singleResponse || ""]
              : values.multipleResponses || [],
          subQuestions: values.isHeading
            ? values.subQuestions?.map((subQ) => ({
                subQuestionId: crypto.randomUUID(),
                subQuestion: subQ.subQuestion,
                responseType: subQ.responseType,
                responses:
                  subQ.responseType === "single"
                    ? [subQ.singleResponse || ""]
                    : subQ.multipleResponses || [],
              })) || []
            : [],
        };
        setQuestions((prev) => [...prev, newQuestion]);
        form.resetFields();
        setOpenModal(false);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
      });
  };

  const handleCancel = () => {
    form.resetFields();
    setOpenModal(false);
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      {questions.length === 0 ? (
        <div className="w-full flex flex-col gap-5 justify-center items-center">
          <Empty description="" />
          <h1 className="text-center text-xl font-semibold">No questions</h1>
          <Button
            onClick={() => setOpenModal(true)}
            size="large"
            type="primary"
          >
            Create New Question
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
              Add Question
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {questions.map((question) => (
              <div
                key={question.questionId}
                className="relative w-full bg-gray-50 rounded-lg p-5"
              >
                <div className="absolute top-0 right-0 p-3">
                  <Button
                    danger
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      setQuestions((prev) =>
                        prev.filter((q) => q.questionId !== question.questionId)
                      );
                    }}
                  />
                </div>
                <div className="pr-12">
                  {question.isHeading && (
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded mb-2 inline-block">
                      Heading Question
                    </span>
                  )}
                  <h2 className="text-lg font-medium mb-2 truncate">
                    {question.question}
                  </h2>
                  <div className="text-sm text-gray-500 mb-3">
                    Section:{" "}
                    {
                      sections.find((s) => s.sectionId === question.sectionId)
                        ?.sectionName
                    }
                  </div>
                  <div className="text-sm text-gray-600 mb-3">
                    Response Type: {question.responseType} | Responses:{" "}
                    {question.responses.length}
                  </div>

                  {question.isHeading && question.subQuestions.length > 0 && (
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium text-gray-700">
                        Sub Questions:
                      </h3>
                      {question.subQuestions.map((subQ, index) => (
                        <div
                          key={subQ.subQuestionId}
                          className="text-sm text-gray-600"
                        >
                          <div className="truncate">
                            {index + 1}. {subQ.subQuestion}
                          </div>
                          <div className="text-xs text-gray-400">
                            Type: {subQ.responseType} | Responses:{" "}
                            {subQ.responses.length}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <Modal
        title="Create New Question"
        open={openModal}
        onOk={handleModalOk}
        onCancel={handleCancel}
        width={800}
        className="top-4"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            isHeading: false,
            responseType: "single",
            responseCount: 1,
            subQuestions: [
              {
                subQuestion: "",
                responseType: "single",
                responseCount: 1,
              },
            ],
          }}
        >
          <Form.Item
            name="sectionId"
            label={<span className="text-lg font-bold">Section</span>}
            rules={[{ required: true, message: "Please select a section" }]}
          >
            <Select placeholder="Select a section" size="large">
              {sections.map((section) => (
                <Option key={section.sectionId} value={section.sectionId}>
                  {section.sectionName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="question"
            label={<span className="text-lg font-bold">Question</span>}
            rules={[{ required: true, message: "Question is required" }]}
          >
            <Input placeholder="Enter question" size="large" />
          </Form.Item>

          <Form.Item
            name="responseType"
            label="Response Type"
            rules={[{ required: true, message: "Response type is required" }]}
          >
            <Radio.Group>
              <Radio value="single">Single Response</Radio>
              <Radio value="multiple">Multiple Responses</Radio>
            </Radio.Group>
          </Form.Item>

          {/* Main question responses */}
          <Form.Item noStyle dependencies={["responseType"]}>
            {({ getFieldValue }) => {
              const responseType = getFieldValue("responseType");

              if (responseType === "single") {
                return (
                  <Form.Item
                    name="singleResponse"
                    label="Response"
                    rules={[
                      { required: true, message: "Response is required" },
                    ]}
                  >
                    <Input placeholder="Enter response" />
                  </Form.Item>
                );
              }

              return (
                <>
                  <Form.Item
                    name="responseCount"
                    label="Number of Responses"
                    rules={[
                      { required: true, message: "Response count is required" },
                    ]}
                  >
                    <InputNumber
                      min={1}
                      max={10}
                      placeholder="Enter count"
                      className="w-full"
                    />
                  </Form.Item>

                  <Form.Item noStyle dependencies={["responseCount"]}>
                    {({ getFieldValue }) => {
                      const responseCount = getFieldValue("responseCount") || 1;
                      return (
                        <div className="ml-4">
                          <label className="text-sm font-medium text-gray-700 mb-2 block">
                            Responses ({responseCount})
                          </label>
                          {Array.from({ length: responseCount }, (_, index) => (
                            <Form.Item
                              key={`main-response-${index}`}
                              name={["multipleResponses", index]}
                              rules={[
                                {
                                  required: true,
                                  message: `Response ${index + 1} is required`,
                                },
                              ]}
                              className="mb-2"
                            >
                              <Input placeholder={`Response ${index + 1}`} />
                            </Form.Item>
                          ))}
                        </div>
                      );
                    }}
                  </Form.Item>
                </>
              );
            }}
          </Form.Item>

          <Form.Item
            name="isHeading"
            label="Heading Question"
            valuePropName="checked"
          >
            <Switch />
          </Form.Item>

          {/* Sub-questions */}
          <Form.Item noStyle dependencies={["isHeading"]}>
            {({ getFieldValue }) =>
              getFieldValue("isHeading") && (
                <>
                  <div className="text-lg font-bold mb-4">Sub Questions</div>
                  <Form.List name="subQuestions">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div
                            key={key}
                            className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
                          >
                            <div className="flex justify-between items-center mb-3">
                              <span className="font-medium">
                                Sub Question {name + 1}
                              </span>
                              {fields.length > 1 && (
                                <Button
                                  type="text"
                                  danger
                                  icon={<MinusCircleOutlined />}
                                  onClick={() => remove(name)}
                                >
                                  Remove
                                </Button>
                              )}
                            </div>

                            <Form.Item
                              {...restField}
                              name={[name, "subQuestion"]}
                              rules={[
                                {
                                  required: true,
                                  message: "Sub question is required",
                                },
                              ]}
                            >
                              <Input placeholder="Enter sub question" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, "responseType"]}
                              label="Response Type"
                              rules={[
                                {
                                  required: true,
                                  message: "Response type is required",
                                },
                              ]}
                            >
                              <Radio.Group>
                                <Radio value="single">Single Response</Radio>
                                <Radio value="multiple">
                                  Multiple Responses
                                </Radio>
                              </Radio.Group>
                            </Form.Item>

                            {/* Sub-question responses */}
                            <Form.Item
                              noStyle
                              dependencies={[
                                ["subQuestions", name, "responseType"],
                              ]}
                            >
                              {({ getFieldValue }) => {
                                const responseType = getFieldValue([
                                  "subQuestions",
                                  name,
                                  "responseType",
                                ]);

                                if (responseType === "single") {
                                  return (
                                    <Form.Item
                                      {...restField}
                                      name={[name, "singleResponse"]}
                                      label="Response"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Response is required",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Enter response" />
                                    </Form.Item>
                                  );
                                }

                                return (
                                  <>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "responseCount"]}
                                      label="Number of Responses"
                                      rules={[
                                        {
                                          required: true,
                                          message: "Response count is required",
                                        },
                                      ]}
                                    >
                                      <InputNumber
                                        min={1}
                                        max={10}
                                        placeholder="Enter count"
                                        className="w-full"
                                      />
                                    </Form.Item>

                                    <Form.Item
                                      noStyle
                                      dependencies={[
                                        ["subQuestions", name, "responseCount"],
                                      ]}
                                    >
                                      {({ getFieldValue }) => {
                                        const responseCount =
                                          getFieldValue([
                                            "subQuestions",
                                            name,
                                            "responseCount",
                                          ]) || 1;

                                        return (
                                          <div className="ml-4">
                                            <label className="text-sm font-medium text-gray-700 mb-2 block">
                                              Responses ({responseCount})
                                            </label>
                                            {Array.from(
                                              { length: responseCount },
                                              (_, index) => (
                                                <Form.Item
                                                  key={`sub-${name}-response-${index}`}
                                                  {...restField}
                                                  name={[
                                                    name,
                                                    "multipleResponses",
                                                    index,
                                                  ]}
                                                  rules={[
                                                    {
                                                      required: true,
                                                      message: `Response ${
                                                        index + 1
                                                      } is required`,
                                                    },
                                                  ]}
                                                  className="mb-2"
                                                >
                                                  <Input
                                                    placeholder={`Response ${
                                                      index + 1
                                                    }`}
                                                  />
                                                </Form.Item>
                                              )
                                            )}
                                          </div>
                                        );
                                      }}
                                    </Form.Item>
                                  </>
                                );
                              }}
                            </Form.Item>
                          </div>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() =>
                              add({ responseType: "single", responseCount: 1 })
                            }
                            block
                            icon={<PlusOutlined />}
                          >
                            Add Sub Question
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </>
              )
            }
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Questions;
