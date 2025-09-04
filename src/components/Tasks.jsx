import { Card, Checkbox, Input, Upload, Button, Form, Select } from "antd";
import React, { useState } from "react";
import { ReactSortable } from "react-sortablejs";
import RichTextEditor from "./RichTextEditor";
import TextArea from "antd/es/input/TextArea";
import {
  PlusOutlined,
  ArrowRightOutlined,
  ArrowLeftOutlined,
  UploadOutlined,
  SaveOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  DeleteOutlined,
  SafetyCertificateOutlined,
  FileTextOutlined,
  SettingOutlined,
  ExclamationOutlined,
  HolderOutlined,
} from "@ant-design/icons";

const Tasks = ({ onFinish }) => {
  const [data, setData] = useState([
    {
      id: 1,
      step: 1,
      isSubstep: false,
      parentStep: null,
      hideStep: false,
      stepType: "normal",
    },
  ]);

  const stepTypes = {
    normal: {
      label: "Normal Step",
      color: "bg-blue-50 border-blue-200",
      textColor: "text-blue-800",
      icon: <FileTextOutlined />,
    },
    caution: {
      label: "Caution Step",
      color: "bg-yellow-50 border-yellow-300",
      textColor: "text-yellow-800",
      icon: <ExclamationOutlined />,
    },
    critical: {
      label: "High Procedure",
      color: "bg-red-50 border-red-300",
      textColor: "text-red-800",
      icon: <SafetyCertificateOutlined />,
    },
  };

  const checkBoxItems = [
    { label: "Add attachments", value: "Add attachments" },
    { label: "Endorsement", value: "Endorsement" },
    { label: "Review with xyz", value: "Review with xyz" },
  ];

  // Handle data changes and renumber steps
  const handleDataChange = (newData) => {
    const renumberedData = renumberSteps(newData);
    setData(renumberedData);
  };

  // Add new step
  const addNewStep = () => {
    const newStep = {
      id: Math.max(...data.map((item) => item.id)) + 1,
      step:
        Math.max(
          ...data.filter((item) => !item.isSubstep).map((item) => item.step)
        ) + 1,
      isSubstep: false,
      parentStep: null,
      hideStep: false,
      stepType: "normal",
    };
    const newData = [...data, newStep];
    handleDataChange(newData);
  };

  // Delete step
  const deleteStep = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    handleDataChange(updatedData);
  };

  // Convert step to substep
  const convertToSubstep = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        const currentIndex = data.findIndex((i) => i.id === itemId);
        let parentStep = null;
        for (let i = currentIndex - 1; i >= 0; i--) {
          if (!data[i].isSubstep) {
            parentStep = data[i].step;
            break;
          }
        }
        return { ...item, isSubstep: true, parentStep };
      }
      return item;
    });
    handleDataChange(updatedData);
  };

  // Convert substep to main step
  const convertToMainStep = (itemId) => {
    const updatedData = data.map((item) =>
      item.id === itemId
        ? { ...item, isSubstep: false, parentStep: null }
        : item
    );
    handleDataChange(updatedData);
  };

  // Renumber steps
  const renumberSteps = (items) => {
    let mainStepCounter = 1;
    const substepCounters = {};
    return items.map((item) => {
      if (!item.isSubstep) {
        return { ...item, step: mainStepCounter++ };
      } else {
        if (!substepCounters[item.parentStep]) {
          substepCounters[item.parentStep] = 1;
        }
        const substepNumber = substepCounters[item.parentStep]++;
        return { ...item, step: substepNumber };
      }
    });
  };

  // Display text
  const getStepDisplayText = (item) =>
    item.isSubstep
      ? `Step ${item.parentStep}.${item.step}`
      : `Step ${item.step}`;

  const handleHideStep = (id) => {
    setData((prev) => {
      const updatedData = prev.map((value) => {
        if (id === value.id) {
          return {
            ...value,
            hideStep: !value.hideStep,
          };
        }
        return value;
      });
      return updatedData;
    });
  };

  // Change step type
  const changeStepType = (id, newType) => {
    const updatedData = data.map((value) => {
      if (id === value.id) {
        return {
          ...value,
          stepType: newType,
        };
      }
      return value;
    });
    handleDataChange(updatedData);
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          // sample initial values
          task_1: {
            task: [{ type: "paragraph", children: [{ text: "" }] }],
            notes: "",
            checklist: [],
            attachments: [],
          },
        }}
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">Tasks</h1>
          <Button type="primary" icon={<PlusOutlined />} onClick={addNewStep}>
            Add Step
          </Button>
        </div>

        <ReactSortable
          list={data}
          setList={handleDataChange}
          animation={200}
          ghostClass="sortable-ghost"
          chosenClass="sortable-chosen"
          dragClass="sortable-drag"
          className="space-y-5"
          handle=".drag-handle"
          onEnd={(evt) => {
            console.log("Drag ended:", evt);
          }}
        >
          {data.map((value, index) => {
            const fieldPrefix = `task_${value.id}`;
            const stepTypeConfig =
              stepTypes[value.stepType] || stepTypes.normal;

            return (
              <div
                key={value.id}
                className={`flex flex-col gap-3 w-full mx-auto border rounded-lg p-5 ${
                  value.isSubstep ? " bg-gray-50" : ""
                } ${stepTypeConfig.color}`}
              >
                {/* Step Type Banner */}
                {value.stepType !== "normal" && (
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-md ${stepTypeConfig.color} border ${stepTypeConfig.textColor} font-medium`}
                  >
                    {stepTypeConfig.icon}
                    <span>{stepTypeConfig.label}</span>
                  </div>
                )}

                <div className="flex md:flex-row flex-col gap-5 justify-between items-center">
                  <div className="flex items-center gap-3">
                    {/* Drag Handle */}
                    <div className="drag-handle cursor-move p-2 hover:bg-gray-200 rounded transition-colors">
                      <HolderOutlined className="text-gray-500" />
                    </div>
                    {stepTypeConfig.icon}
                    <h2 className="text-xl font-bold">
                      {getStepDisplayText(value)}
                    </h2>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {/* Step Type Selector */}
                    <Select
                      value={value.stepType}
                      onChange={(newType) => changeStepType(value.id, newType)}
                      size="small"
                      style={{ minWidth: 120 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {Object.entries(stepTypes).map(([key, type]) => (
                        <Select.Option key={key} value={key}>
                          <div className="flex items-center gap-2">
                            {type.icon}
                            <span>{type.label}</span>
                          </div>
                        </Select.Option>
                      ))}
                    </Select>

                    {!value.isSubstep && index > 0 && (
                      <Button
                        size="small"
                        icon={<ArrowRightOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          convertToSubstep(value.id);
                        }}
                        title="Convert to substep"
                      >
                        To Substep
                      </Button>
                    )}
                    {value.isSubstep && (
                      <Button
                        size="small"
                        icon={<ArrowLeftOutlined />}
                        onClick={(e) => {
                          e.stopPropagation();
                          convertToMainStep(value.id);
                        }}
                        title="Convert to main step"
                      >
                        To Main Step
                      </Button>
                    )}
                    <Button
                      size="small"
                      icon={
                        value.hideStep ? (
                          <EyeOutlined />
                        ) : (
                          <EyeInvisibleOutlined />
                        )
                      }
                      onClick={(e) => {
                        e.stopPropagation();
                        handleHideStep(value.id);
                      }}
                    >
                      {value.hideStep ? "Show" : "Hide"}
                    </Button>
                    <Button
                      size="small"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteStep(value.id);
                      }}
                      title="Delete step"
                    >
                      Delete
                    </Button>
                  </div>
                </div>

                {/* Task Content - Non-draggable area */}
                <div
                  className={`${
                    value.hideStep ? "hidden" : "block"
                  } flex flex-col w-full`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="flex flex-1 flex-col md:flex-row w-full gap-5">
                    <Form.Item
                      name={[fieldPrefix, "task"]}
                      label="Task"
                      rules={[
                        { required: true, message: "Please enter a task" },
                      ]}
                      style={{ width: "100%" }}
                      initialValue={[
                        { type: "paragraph", children: [{ text: "" }] },
                      ]}
                      valuePropName="value"
                      getValueFromEvent={(val) => val}
                    >
                      <RichTextEditor placeholder="Enter the tasks here..." />
                    </Form.Item>
                    {/* Notes */}
                    <Form.Item
                      name={[fieldPrefix, "notes"]}
                      label="Notes"
                      style={{ width: "100%", height: "100%" }}
                      rules={[
                        { required: true, message: "Please enter notes" },
                      ]}
                    >
                      <TextArea rows={8} />
                    </Form.Item>
                  </div>
                  <div className="flex flex-1 flex-col md:flex-row w-full gap-5">
                    {/* Checklist */}
                    <Form.Item
                      name={[fieldPrefix, "checklist"]}
                      style={{ width: "100%" }}
                    >
                      <Checkbox.Group options={checkBoxItems} />
                    </Form.Item>
                    {/* Attachments */}
                    <Form.Item
                      name={[fieldPrefix, "attachments"]}
                      label="Drawing Attachments"
                      valuePropName="fileList"
                      style={{ width: "100%" }}
                      getValueFromEvent={(e) => e?.fileList}
                    >
                      <Upload beforeUpload={() => false} multiple>
                        <Button icon={<UploadOutlined />}>Upload File</Button>
                      </Upload>
                    </Form.Item>
                  </div>
                </div>
              </div>
            );
          })}
        </ReactSortable>

        <Form.Item>
          <Button
            icon={<SaveOutlined />}
            type="primary"
            htmlType="submit"
            className="mt-4"
          >
            Save
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Tasks;
