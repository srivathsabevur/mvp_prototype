import { Button, Checkbox, Empty, Form, Card, notification, Modal } from "antd";
import React, { useMemo, useState } from "react";

const MapQuestions = () => {
  const [form] = Form.useForm();
  const [questionModalVisible, setQuestionModalVisible] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  // Mock checklists data with metadata
  const checklists = useMemo(
    () => [
      {
        checklistId: "checklist-1",
        checklistName: "Pre-Employment Checklist",
        metadata: {
          category: "HR",
          priority: "High",
          estimatedTime: "30 mins",
          department: "Human Resources",
        },
      },
      {
        checklistId: "checklist-2",
        checklistName: "Project Setup Checklist",
        metadata: {
          category: "Technical",
          priority: "Medium",
          estimatedTime: "45 mins",
          department: "Engineering",
        },
      },
      {
        checklistId: "checklist-3",
        checklistName: "Quality Assurance Checklist",
        metadata: {
          category: "QA",
          priority: "High",
          estimatedTime: "60 mins",
          department: "Quality Assurance",
        },
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
    ],
    []
  );

  // Initialize mapping with all checklists, empty sections
  const [mapSections, setMapSections] = useState(() =>
    checklists.map((c) => ({ checklistId: c.checklistId, sections: [] }))
  );

  // Store published mappings to render as cards below
  const [publishedMappings, setPublishedMappings] = useState([]);

  // Quick lookup helpers for rendering names by id
  const checklistNameById = useMemo(() => {
    const m = new Map(checklists.map((c) => [c.checklistId, c.checklistName]));
    return (id) => m.get(id) ?? id;
  }, [checklists]);

  const sectionNameById = useMemo(() => {
    const m = new Map(sections.map((s) => [s.sectionId, s.sectionName]));
    return (id) => m.get(id) ?? id;
  }, [sections]);

  const sectionById = useMemo(() => {
    const m = new Map(sections.map((s) => [s.sectionId, s]));
    return (id) => m.get(id);
  }, [sections]);

  const isChecked = (checklistId, sectionId) =>
    !!mapSections
      .find((m) => m.checklistId === checklistId)
      ?.sections.includes(sectionId);

  const handleCheckBox = (e, sectionId, checklistId) => {
    const { checked } = e.target;
    setMapSections((prev) =>
      prev.map((entry) => {
        if (entry.checklistId !== checklistId) return entry;
        const exists = entry.sections.includes(sectionId);
        const nextSections = checked
          ? exists
            ? entry.sections
            : [...entry.sections, sectionId]
          : entry.sections.filter((id) => id !== sectionId);
        return { ...entry, sections: nextSections };
      })
    );
  };

  const handlePublish = () => {
    // Include only checklists that have selected sections
    const checklistsWithSections = mapSections.filter(
      (m) => m.sections.length > 0
    );

    if (checklistsWithSections.length === 0) {
      notification.warning({
        message: "No Selection",
        description:
          "Please select at least one section before publishing the mapping.",
        placement: "topRight",
      });
      return;
    }

    setPublishedMappings((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        publishedAt: new Date().toLocaleString(),
        items: checklistsWithSections.map((m) => ({
          checklistId: m.checklistId,
          sections: [...m.sections],
        })),
      },
    ]);

    notification.success({
      message: "Mapping Published",
      description: `Successfully published mapping with ${checklistsWithSections.length} checklist(s).`,
      placement: "topRight",
    });

    // Reset selections and form on publish so all checkboxes clear
    setMapSections(
      checklists.map((c) => ({ checklistId: c.checklistId, sections: [] }))
    );
    form.resetFields();
  };

  const showSectionQuestions = (section) => {
    setSelectedSection(section);
    setQuestionModalVisible(true);
  };

  const getSectionQuestions = (questionIds) => {
    return questions.filter((q) => questionIds.includes(q.questionId));
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      {/* Sections Overview */}
      <div className="mb-6">
        <h2 className="text-xl font-bold mb-4">Available Sections</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {sections.map((section) => (
            <Card
              key={section.sectionId}
              size="small"
              title={section.sectionName}
              extra={
                <Button
                  type="link"
                  size="small"
                  onClick={() => showSectionQuestions(section)}
                >
                  View Questions ({section.questionIds.length})
                </Button>
              }
            >
              <p className="text-sm text-gray-600">{section.description}</p>
            </Card>
          ))}
        </div>
      </div>

      <Form
        form={form}
        onFinish={handlePublish}
        layout="vertical"
        style={{ maxWidth: "100%" }}
      >
        {checklists.length === 0 ? (
          <div className="w-full flex flex-col gap-5 justify-center items-center">
            <Empty description="" />
            <h1 className="text-center text-xl font-semibold">
              No checklists available for mapping
            </h1>
          </div>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4">
              Map Sections to Checklists
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {checklists.map((checklist) => (
                <div
                  key={checklist.checklistId}
                  className="bg-gray-50 border border-black/10 rounded-lg p-5"
                >
                  <div className="mb-3">
                    <h1 className="text-lg font-medium">
                      {checklist.checklistName}
                    </h1>
                    <div className="text-sm text-gray-500 mt-1">
                      <div>Category: {checklist.metadata.category}</div>
                      <div>Priority: {checklist.metadata.priority}</div>
                      <div>Est. Time: {checklist.metadata.estimatedTime}</div>
                      <div>Department: {checklist.metadata.department}</div>
                    </div>
                  </div>

                  <div className="flex flex-col border-l-2 border-black/25 pl-3 ml-2">
                    <div className="text-sm font-medium text-gray-700 mb-2">
                      Select Sections:
                    </div>
                    {sections.map((section) => (
                      <div
                        key={section.sectionId}
                        className="flex justify-start items-center gap-2 mt-1"
                      >
                        <Checkbox
                          checked={isChecked(
                            checklist.checklistId,
                            section.sectionId
                          )}
                          onChange={(e) =>
                            handleCheckBox(
                              e,
                              section.sectionId,
                              checklist.checklistId
                            )
                          }
                        />
                        <div className="flex-1 flex items-center justify-between">
                          <div>
                            <span className="text-sm font-medium">
                              {section.sectionName}
                            </span>
                            <div className="text-xs text-gray-500">
                              {section.description}
                            </div>
                            <div className="text-xs text-gray-400">
                              Questions: {section.questionIds.length}
                            </div>
                          </div>
                          <Button
                            type="link"
                            size="small"
                            onClick={() => showSectionQuestions(section)}
                          >
                            View Questions
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center mt-4">
              <Button type="primary" htmlType="submit" size="large">
                Publish Mapping
              </Button>
            </div>
          </>
        )}
      </Form>

      {/* Render published mappings as Cards below */}
      {publishedMappings.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Published Mappings</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {publishedMappings.map((mapping, idx) => (
              <Card
                key={mapping.id}
                title={`Published Mapping ${idx + 1}`}
                size="small"
                extra={
                  <span className="text-xs text-gray-500">
                    Published: {mapping.publishedAt}
                  </span>
                }
              >
                {mapping.items.map((item) => (
                  <div key={item.checklistId} className="mb-4">
                    <div className="font-medium text-base">
                      {checklistNameById(item.checklistId)}
                    </div>
                    <div className="text-sm text-gray-500 mb-2">
                      {item.sections.length} section(s) mapped
                    </div>
                    <div className="space-y-2">
                      {item.sections.map((sectionId) => {
                        const section = sectionById(sectionId);
                        return (
                          <div
                            key={sectionId}
                            className="border-l-4 border-blue-200 pl-3"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="text-sm font-medium">
                                  {sectionNameById(sectionId)}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {section?.questionIds.length} questions
                                </div>
                              </div>
                              <Button
                                type="link"
                                size="small"
                                onClick={() => showSectionQuestions(section)}
                              >
                                View Questions
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Questions Modal */}
      <Modal
        title={
          selectedSection
            ? `Questions in ${selectedSection.sectionName}`
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
        {selectedSection && (
          <div>
            <p className="text-gray-600 mb-4">{selectedSection.description}</p>
            <div className="space-y-4">
              {getSectionQuestions(selectedSection.questionIds).map(
                (question) => (
                  <div
                    key={question.questionId}
                    className="border-l-4 border-blue-200 pl-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{question.question}</h3>
                      {question.isHeading && (
                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                          Heading Question
                        </span>
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
  );
};

export default MapQuestions;
