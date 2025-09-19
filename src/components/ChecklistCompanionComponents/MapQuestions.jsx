import {
  Button,
  Select,
  Empty,
  Card,
  notification,
  Modal,
  Space,
  Tag,
} from "antd";
import React, { useMemo, useState } from "react";
import {
  ArrowLeftOutlined,
  EyeOutlined,
  SaveOutlined,
} from "@ant-design/icons";

const { Option } = Select;

const MapQuestions = ({ setOption }) => {
  // State for selections
  const [selectedChecklist, setSelectedChecklist] = useState(null);
  const [selectedSections, setSelectedSections] = useState([]);

  // Modal states
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [selectedSectionForModal, setSelectedSectionForModal] = useState(null);

  // Published mappings
  const [publishedMappings, setPublishedMappings] = useState([]);

  // Mock checklists data with corrected metadata structure
  const checklists = useMemo(
    () => [
      {
        checklistId: "checklist-1",
        checklistName: "Pre-Employment Checklist",
        metadata: [
          { id: crypto.randomUUID(), key: "Timestart", responseType: "Time" },
          { id: crypto.randomUUID(), key: "Date", responseType: "Date" },
          {
            id: crypto.randomUUID(),
            key: "Time of expiry",
            responseType: "Time",
          },
        ],
      },
      {
        checklistId: "checklist-2",
        checklistName: "Project Setup Checklist",
        metadata: [
          { id: crypto.randomUUID(), key: "Timestart", responseType: "Time" },
          { id: crypto.randomUUID(), key: "Date", responseType: "Date" },
          {
            id: crypto.randomUUID(),
            key: "Time of expiry",
            responseType: "Time",
          },
        ],
      },
      {
        checklistId: "checklist-3",
        checklistName: "Quality Assurance Checklist",
        metadata: [
          { id: crypto.randomUUID(), key: "Timestart", responseType: "Time" },
          { id: crypto.randomUUID(), key: "Date", responseType: "Date" },
          {
            id: crypto.randomUUID(),
            key: "Time of expiry",
            responseType: "Time",
          },
        ],
      },
      {
        checklistId: "checklist-4",
        checklistName: "Client Onboarding Checklist",
        metadata: [
          { id: crypto.randomUUID(), key: "Timestart", responseType: "Time" },
          { id: crypto.randomUUID(), key: "Date", responseType: "Date" },
          {
            id: crypto.randomUUID(),
            key: "Time of expiry",
            responseType: "Time",
          },
        ],
      },
    ],
    []
  );

  // Mock sections with descriptions and associated questions
  const sections = useMemo(
    () => [
      {
        sectionId: "section-1",
        sectionName: "General Information",
        description:
          "Basic personal and contact information required for all processes",
        questionIds: ["q1", "q2", "q3"],
      },
      {
        sectionId: "section-2",
        sectionName: "Technical Skills",
        description:
          "Assessment of technical competencies and programming abilities",
        questionIds: ["q4", "q5", "q6", "q7"],
      },
      {
        sectionId: "section-3",
        sectionName: "Experience & Background",
        description:
          "Professional experience, education, and career history details",
        questionIds: ["q8", "q9", "q10"],
      },
      {
        sectionId: "section-4",
        sectionName: "References & Verification",
        description:
          "Reference checks and background verification requirements",
        questionIds: ["q11", "q12"],
      },
      {
        sectionId: "section-5",
        sectionName: "Project Requirements",
        description: "Technical specifications and project setup requirements",
        questionIds: ["q13", "q14", "q15"],
      },
    ],
    []
  );

  // Mock questions from previous component structure
  const questions = useMemo(
    () => [
      {
        questionId: "q1",
        question: "What is your full name?",
        responseType: "single",
        responses: ["Text Input"],
        isHeading: false,
      },
      {
        questionId: "q2",
        question: "What is your email address?",
        responseType: "single",
        responses: ["Email Input"],
        isHeading: false,
      },
      {
        questionId: "q3",
        question: "Contact Information",
        responseType: "multiple",
        responses: ["Phone", "Address", "Emergency Contact"],
        isHeading: true,
        subQuestions: [
          {
            subQuestionId: "sq1",
            subQuestion: "Primary phone number",
            responseType: "single",
            responses: ["Phone Input"],
          },
          {
            subQuestionId: "sq2",
            subQuestion: "Current address",
            responseType: "single",
            responses: ["Address Input"],
          },
        ],
      },
      {
        questionId: "q4",
        question: "Programming Languages",
        responseType: "multiple",
        responses: ["JavaScript", "Python", "Java", "C++"],
        isHeading: false,
      },
      {
        questionId: "q5",
        question: "Years of experience in software development?",
        responseType: "single",
        responses: ["Number Input"],
        isHeading: false,
      },
      {
        questionId: "q6",
        question: "Framework Experience",
        responseType: "multiple",
        responses: ["React", "Angular", "Vue", "Node.js"],
        isHeading: false,
      },
      {
        questionId: "q7",
        question: "Database Knowledge",
        responseType: "multiple",
        responses: ["MySQL", "PostgreSQL", "MongoDB", "Redis"],
        isHeading: false,
      },
      {
        questionId: "q8",
        question: "Previous Work Experience",
        responseType: "multiple",
        responses: ["Company Name", "Position", "Duration"],
        isHeading: true,
        subQuestions: [
          {
            subQuestionId: "sq3",
            subQuestion: "Most recent company",
            responseType: "single",
            responses: ["Company Input"],
          },
          {
            subQuestionId: "sq4",
            subQuestion: "Job responsibilities",
            responseType: "multiple",
            responses: ["Task 1", "Task 2", "Task 3"],
          },
        ],
      },
      {
        questionId: "q9",
        question: "Highest education level?",
        responseType: "single",
        responses: ["Degree Selection"],
        isHeading: false,
      },
      {
        questionId: "q10",
        question: "Professional Certifications",
        responseType: "multiple",
        responses: ["AWS", "Google Cloud", "Microsoft Azure", "Others"],
        isHeading: false,
      },
      {
        questionId: "q11",
        question: "Professional References",
        responseType: "multiple",
        responses: ["Name", "Position", "Contact"],
        isHeading: false,
      },
      {
        questionId: "q12",
        question: "Background Check Consent",
        responseType: "single",
        responses: ["Yes/No"],
        isHeading: false,
      },
      {
        questionId: "q13",
        question: "Project Scope Definition",
        responseType: "multiple",
        responses: ["Timeline", "Budget", "Resources"],
        isHeading: true,
      },
      {
        questionId: "q14",
        question: "Technical Requirements",
        responseType: "multiple",
        responses: ["Technology Stack", "Infrastructure", "Third-party Tools"],
        isHeading: false,
      },
      {
        questionId: "q15",
        question: "Deliverables Specification",
        responseType: "single",
        responses: ["Document Upload"],
        isHeading: false,
      },
    ],
    []
  );

  // Lookup helpers
  const checklistById = useMemo(() => {
    const m = new Map(checklists.map((c) => [c.checklistId, c]));
    return (id) => m.get(id);
  }, [checklists]);

  const sectionById = useMemo(() => {
    const m = new Map(sections.map((s) => [s.sectionId, s]));
    return (id) => m.get(id);
  }, [sections]);

  const getSectionQuestions = (questionIds) => {
    return questions.filter((q) => questionIds.includes(q.questionId));
  };

  // Event handlers
  const handleChecklistChange = (checklistId) => {
    setSelectedChecklist(checklistId);
    setSelectedSections([]); // Reset sections when checklist changes
  };

  const handleSectionChange = (sectionIds) => {
    setSelectedSections(sectionIds);
  };

  const showSectionQuestions = (section) => {
    setSelectedSectionForModal(section);
    setQuestionModalVisible(true);
  };

  const handlePublish = () => {
    if (!selectedChecklist) {
      notification.warning({
        message: "No Checklist Selected",
        description: "Please select a checklist before publishing.",
        placement: "topRight",
      });
      return;
    }

    if (selectedSections.length === 0) {
      notification.warning({
        message: "No Sections Selected",
        description: "Please select at least one section before publishing.",
        placement: "topRight",
      });
      return;
    }

    const newMapping = {
      id: crypto.randomUUID(),
      publishedAt: new Date().toLocaleString(),
      checklistId: selectedChecklist,
      sections: [...selectedSections],
    };

    setPublishedMappings((prev) => [...prev, newMapping]);

    notification.success({
      message: "Mapping Published",
      description: `Successfully published mapping with ${selectedSections.length} section(s).`,
      placement: "topRight",
    });

    // Reset form
    setSelectedChecklist(null);
    setSelectedSections([]);
  };

  // Get total questions count for selected sections
  const getTotalQuestions = () => {
    return selectedSections.reduce((total, sectionId) => {
      const section = sectionById(sectionId);
      return total + (section?.questionIds.length || 0);
    }, 0);
  };

  return (
    <div className="flex flex-col w-full h-full p-3 bg-gray-100  -z-100">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-lg md:text-3xl font-semibold">
          Map Chekclist & Sections
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
      <div className="flex flex-col gap-6 p-6 bg-white w-full rounded-lg max-h-[90vh] overflow-y-auto">
        {/* Selection Form */}
        <div className="space-y-6">
          {/* Checklist Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Checklist
            </label>
            <Select
              placeholder="Search and select a checklist"
              style={{ width: "100%" }}
              size="large"
              showSearch
              allowClear
              value={selectedChecklist}
              onChange={handleChecklistChange}
              optionFilterProp="children"
              filterOption={(input, option) => {
                const checklist = checklists.find(
                  (c) => c.checklistId === option.key
                );
                if (!checklist) return false;
                const searchText = input.toLowerCase();
                const nameMatch = checklist.checklistName
                  .toLowerCase()
                  .includes(searchText);
                return nameMatch;
              }}
            >
              {checklists.map((checklist) => (
                <Option
                  key={checklist.checklistId}
                  value={checklist.checklistId}
                >
                  <div className="py-1">
                    <div className="font-medium text-gray-900 truncate">
                      {checklist.checklistName}
                    </div>
                  </div>
                </Option>
              ))}
            </Select>
            {/* Show selected checklist details */}
            {selectedChecklist && (
              <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-md">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-blue-900 truncate">
                      {checklistById(selectedChecklist)?.checklistName}
                    </h3>
                    <div className="text-sm text-blue-700 mt-1 flex flex-wrap items-center gap-2">
                      {checklistById(selectedChecklist).metadata.map(
                        (metadataObj, index) => (
                          <span key={index}>
                            {metadataObj.key} : {metadataObj.responseType}
                          </span>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {/* Section Selection */}
          {selectedChecklist && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Sections
              </label>
              <Select
                mode="multiple"
                placeholder="Search and select sections"
                style={{ width: "100%" }}
                size="large"
                showSearch
                allowClear
                value={selectedSections}
                onChange={handleSectionChange}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().includes(input.toLowerCase())
                }
                maxTagCount="responsive"
              >
                {sections.map((section) => (
                  <Option key={section.sectionId} value={section.sectionId}>
                    {section.sectionName}
                  </Option>
                ))}
              </Select>
            </div>
          )}
          {/* Selected Sections Preview */}
          {selectedSections.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Selected Sections ({selectedSections.length}) - Total Questions:{" "}
                {getTotalQuestions()}
              </label>
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {selectedSections.map((sectionId) => {
                  const section = sectionById(sectionId);
                  return (
                    <div
                      key={sectionId}
                      className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-gray-900 truncate">
                            {section?.sectionName}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                            {section?.description}
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            {section?.questionIds.length} questions included
                          </div>
                        </div>
                        <Button
                          type="text"
                          icon={<EyeOutlined />}
                          onClick={() => showSectionQuestions(section)}
                          className="flex-shrink-0"
                          size="small"
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
          {/* Publish Button */}
          {selectedChecklist && selectedSections.length > 0 && (
            <div className="flex justify-end pt-4 border-t">
              <Button
                type="primary"
                size="large"
                icon={<SaveOutlined />}
                onClick={handlePublish}
              >
                Publish Mapping
              </Button>
            </div>
          )}
        </div>
        {/* Published Mappings */}
        {publishedMappings.length > 0 && (
          <div className="mt-8 border-t pt-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Published Mappings
            </h2>
            <div className="grid gap-4 max-h-96 overflow-y-auto">
              {publishedMappings.map((mapping, idx) => (
                <Card
                  key={mapping.id}
                  size="small"
                  title={
                    <div className="flex items-center justify-between">
                      <span className="truncate">Mapping {idx + 1}</span>
                      <span className="text-xs font-normal text-gray-500 ml-2">
                        {mapping.publishedAt}
                      </span>
                    </div>
                  }
                >
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm font-medium text-gray-700">
                        Checklist:
                      </div>
                      <div className="text-base truncate">
                        {checklistById(mapping.checklistId)?.checklistName}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-gray-700 mb-2">
                        Mapped Sections ({mapping.sections.length}):
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {mapping.sections.map((sectionId) => {
                          const section = sectionById(sectionId);
                          return (
                            <div
                              key={sectionId}
                              className="flex items-center justify-between p-2 bg-gray-50 rounded"
                            >
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium truncate">
                                  {section?.sectionName}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {section?.questionIds.length} questions
                                </div>
                              </div>
                              <Button
                                type="link"
                                size="small"
                                icon={<EyeOutlined />}
                                onClick={() => showSectionQuestions(section)}
                                className="flex-shrink-0"
                              >
                                View
                              </Button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
        {/* Questions Modal */}
        <Modal
          title={
            selectedSectionForModal
              ? `Questions in ${selectedSectionForModal.sectionName}`
              : "Questions"
          }
          open={questionModalVisible}
          onCancel={() => setQuestionModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setQuestionModalVisible(false)}>
              Close
            </Button>,
          ]}
          width={800}
        >
          {selectedSectionForModal && (
            <div>
              <p className="text-gray-600 mb-4">
                {selectedSectionForModal.description}
              </p>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {getSectionQuestions(selectedSectionForModal.questionIds).map(
                  (question) => (
                    <div
                      key={question.questionId}
                      className="border-l-4 border-blue-200 pl-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{question.question}</h3>
                        {question.isHeading && (
                          <Tag color="blue">Heading Question</Tag>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 mb-2">
                        Response Type:{" "}
                        <span className="font-medium">
                          {question.responseType}
                        </span>
                      </div>
                      <div className="text-sm">
                        <div className="font-medium">Responses:</div>
                        <ul className="list-disc ml-5">
                          {question.responses.map((response, idx) => (
                            <li key={idx}>{response}</li>
                          ))}
                        </ul>
                      </div>
                      {question.subQuestions &&
                        question.subQuestions.length > 0 && (
                          <div className="mt-3 ml-4 border-l-2 border-gray-200 pl-3">
                            <div className="text-sm font-medium mb-2">
                              Sub Questions:
                            </div>
                            {question.subQuestions.map((subQ) => (
                              <div key={subQ.subQuestionId} className="mb-2">
                                <div className="text-sm font-medium">
                                  {subQ.subQuestion}
                                </div>
                                <div className="text-xs text-gray-500">
                                  Type: {subQ.responseType} | Responses:{" "}
                                  {subQ.responses.join(", ")}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                    </div>
                  )
                )}
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
};

export default MapQuestions;
