import React, { useState, useMemo } from "react";
import { Checkbox, Input, Upload, Button, Form, Select, Empty } from "antd";
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

import {
  DndContext,
  closestCenter,
  PointerSensor,
  TouchSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
  arrayMove,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import RichTextEditor from "./RichTextEditor";

const { TextArea } = Input;

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
      label: "Sheer Critical",
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

  // Recompute step numbering for structural edits (add/delete/convert)
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

  // Structural change handler (recomputes numbering)
  const handleDataChange = (newData) => {
    const renumberedData = renumberSteps(newData);
    setData(renumberedData);
  };

  // DnD reorder handler (preserves existing step numbers)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    setData((prev) => {
      const oldIndex = prev.findIndex((i) => i.id === active.id);
      const newIndex = prev.findIndex((i) => i.id === over.id);
      // Reorder only; DO NOT recalculate item.step fields
      return arrayMove(prev, oldIndex, newIndex);
    });
  };

  // Add new main step
  const addNewStep = () => {
    const nextId =
      (data.length ? Math.max(...data.map((item) => item.id)) : 0) + 1;
    const nextMainStep =
      (data.filter((item) => !item.isSubstep).length
        ? Math.max(...data.filter((i) => !i.isSubstep).map((i) => i.step))
        : 0) + 1;

    const newStep = {
      id: nextId,
      step: nextMainStep,
      isSubstep: false,
      parentStep: null,
      hideStep: false,
      stepType: "normal",
    };
    handleDataChange([...data, newStep]);
  };

  // Delete step (renumber after)
  const deleteStep = (itemId) => {
    const updatedData = data.filter((item) => item.id !== itemId);
    handleDataChange(updatedData);
  };

  // Convert step to substep (renumber after)
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

  // Convert substep to main step (renumber after)
  const convertToMainStep = (itemId) => {
    const updatedData = data.map((item) =>
      item.id === itemId
        ? { ...item, isSubstep: false, parentStep: null }
        : item
    );
    handleDataChange(updatedData);
  };

  const getStepDisplayText = (item) =>
    item.isSubstep
      ? `Step ${item.parentStep}.${item.step}`
      : `Step ${item.step}`;

  // Non-structural state changes should not renumber
  const handleHideStep = (id) => {
    setData((prev) =>
      prev.map((value) =>
        id === value.id ? { ...value, hideStep: !value.hideStep } : value
      )
    );
  };

  const changeStepType = (id, newType) => {
    setData((prev) =>
      prev.map((v) => (id === v.id ? { ...v, stepType: newType } : v))
    );
  };

  // dnd-kit sensors (touch-friendly with delay tolerance to avoid accidental drags)
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
    useSensor(KeyboardSensor)
  );

  // IDs for SortableContext
  const itemIds = useMemo(() => data.map((d) => d.id), [data]);

  // Sortable item (handle-only dragging)
  const SortableItem = ({ value, index }) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({
        id: value.id,
      });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition,
    };

    const stepTypeConfig = stepTypes[value.stepType] || stepTypes.normal;
    const fieldPrefix = `task_${value.id}`;

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex flex-col gap-3 w-full mx-auto border rounded-lg p-5 ${
          value.isSubstep ? " bg-gray-50" : ""
        } ${stepTypeConfig.color}`}
      >
        {/* Step Type Banner */}
        {value.stepType !== "normal" && (
          <div className="flex flex-col md:flex-row w-full gap-5">
            <div
              className={`flex w-auto md:w-1/4 h-fit items-center gap-2 px-3 py-1 rounded-md ${stepTypeConfig.color} border ${stepTypeConfig.textColor} font-medium`}
            >
              {stepTypeConfig.icon}
              <span>{stepTypeConfig.label}</span>
            </div>
            <Form.Item
              style={{ width: "100%" }}
              name={[fieldPrefix, "stepTypeNote"]}
            >
              <Input type="text" placeholder="Add Note" />
            </Form.Item>
          </div>
        )}

        <div className="flex md:flex-row flex-col gap-5 justify-between items-center">
          <div className="flex items-center gap-3">
            {/* Drag Handle: attach listeners/attributes to handle only */}
            <div
              className="drag-handle cursor-move p-2 hover:bg-gray-200 rounded transition-colors"
              style={{
                touchAction: "none",
                userSelect: "none",
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
              }}
              {...attributes}
              {...listeners}
              title="Drag to reorder"
            >
              <HolderOutlined className="text-gray-500" />
            </div>
            {stepTypeConfig.icon}
            <h2 className="text-xl font-bold">{getStepDisplayText(value)}</h2>
          </div>
          <div className="flex gap-2 flex-wrap">
            {/* Step Type Selector */}
            <Select
              value={value.stepType}
              onChange={(newType) => changeStepType(value.id, newType)}
              size="small"
              style={{ minWidth: 140 }}
              options={Object.entries(stepTypes).map(([key, type]) => ({
                value: key,
                label: (
                  <div className="flex items-center gap-2">
                    {type.icon}
                    <span>{type.label}</span>
                  </div>
                ),
              }))}
            />

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
              icon={value.hideStep ? <EyeOutlined /> : <EyeInvisibleOutlined />}
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

        {/* Task Content */}
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
              rules={[{ required: true, message: "Please enter a task" }]}
              style={{ width: "100%" }}
              initialValue={[{ type: "paragraph", children: [{ text: "" }] }]}
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
              rules={[{ required: true, message: "Please enter notes" }]}
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

        {data.length === 0 ? (
          <div className="w-full h-full">
            <Empty />
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={itemIds}
              strategy={verticalListSortingStrategy}
            >
              <div className="space-y-5">
                {data.map((value, index) => (
                  <SortableItem key={value.id} value={value} index={index} />
                ))}
              </div>
            </SortableContext>
          </DndContext>
        )}

        <Form.Item>
          <Button
            icon={<SaveOutlined />}
            type="primary"
            disabled={data.length === 0}
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
