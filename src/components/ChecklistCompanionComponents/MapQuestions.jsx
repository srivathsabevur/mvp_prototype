import { Button, Checkbox, Empty, Form, Card, notification } from "antd";
import React, { useMemo, useState } from "react";

const MapQuestions = () => {
  // Generate sections/questions once so IDs stay stable across renders
  const sections = useMemo(
    () =>
      Array.from({ length: 2 }, (_, i) => ({
        sectionName: `Section ${i + 1}`,
        sectionId: crypto.randomUUID(),
      })),
    []
  );

  const questions = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        question: `Question ${i + 1}`,
        questionId: crypto.randomUUID(),
      })),
    []
  );

  // Initialize mapping with all sections, empty selections
  const [mapQuestions, setMapQuestions] = useState(() =>
    sections.map((s) => ({ sectionId: s.sectionId, questions: [] }))
  );

  // Store submitted mappings to render as cards below
  const [mappings, setMappings] = useState([]);

  // Quick lookup helpers for rendering names by id
  const sectionNameById = useMemo(() => {
    const m = new Map(sections.map((s) => [s.sectionId, s.sectionName]));
    return (id) => m.get(id) ?? id;
  }, [sections]);

  const questionTextById = useMemo(() => {
    const m = new Map(questions.map((q) => [q.questionId, q.question]));
    return (id) => m.get(id) ?? id;
  }, [questions]);

  const isChecked = (sectionId, questionId) =>
    !!mapQuestions
      .find((m) => m.sectionId === sectionId)
      ?.questions.includes(questionId);

  const handleCheckBox = (e, questionId, sectionId) => {
    const { checked } = e.target;
    setMapQuestions((prev) =>
      prev.map((entry) => {
        if (entry.sectionId !== sectionId) return entry;
        const exists = entry.questions.includes(questionId);
        const nextQuestions = checked
          ? exists
            ? entry.questions
            : [...entry.questions, questionId]
          : entry.questions.filter((id) => id !== questionId);
        return { ...entry, questions: nextQuestions };
      })
    );
  };

  const handleFinish = () => {
    // Filter out sections with no selected questions
    const sectionsWithQuestions = mapQuestions.filter(
      (m) => m.questions.length > 0
    );

    // Check if any sections have questions selected
    if (sectionsWithQuestions.length === 0) {
      notification.warning({
        message: "No Selection",
        description:
          "Please select at least one question before creating a mapping.",
        placement: "topRight",
      });
      return;
    }

    // Create mapping only for sections with selected questions
    setMappings((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        items: sectionsWithQuestions.map((m) => ({
          sectionId: m.sectionId,
          questions: [...m.questions],
        })),
      },
    ]);

    // Show success notification
    notification.success({
      message: "Mapping Created",
      description: `Successfully created mapping with ${sectionsWithQuestions.length} section(s).`,
      placement: "topRight",
    });
  };

  return (
    <div className="flex flex-col gap-3 p-5 bg-white w-full rounded-lg max-h-[80vh] overflow-y-auto">
      <Form
        onFinish={handleFinish}
        layout="vertical"
        style={{ maxWidth: "100%" }}
      >
        {sections.length === 0 ? (
          <div className="w-full flex flex-col gap-5 justify-center items-center">
            <Empty description="" />
            <h1 className="text-center text-xl font-semibold">
              Insufficient data available for mapping
            </h1>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-5">
              {sections.map((section) => (
                <div
                  key={section.sectionId}
                  className="bg-gray-50 border border-black/10 rounded-lg p-5"
                >
                  <h1 className="text-lg">{section.sectionName}</h1>
                  <div className="flex flex-col border-l-2 border-black/25 pl-2 ml-2">
                    {questions.map((question) => (
                      <div
                        key={question.questionId}
                        className="flex justify-start items-center gap-2 mt-1"
                      >
                        <Checkbox
                          checked={isChecked(
                            section.sectionId,
                            question.questionId
                          )}
                          onChange={(e) =>
                            handleCheckBox(
                              e,
                              question.questionId,
                              section.sectionId
                            )
                          }
                        />
                        <h1 className="text-base">{question.question}</h1>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-end items-center">
              <Button type="primary" htmlType="submit">
                Create Mapping
              </Button>
            </div>
          </>
        )}
      </Form>

      {/* Render created mappings as Cards below */}
      {mappings.length > 0 && (
        <div className="grid grid-cols-2 gap-5 mt-5">
          {mappings.map((mapping, idx) => (
            <Card key={mapping.id} title={`Mapping ${idx + 1}`} size="small">
              {mapping.items.map((item) => (
                <div key={item.sectionId} className="mb-3">
                  <div className="font-medium">
                    {sectionNameById(item.sectionId)}
                  </div>
                  <ul className="list-disc ml-5 mt-1">
                    {item.questions.map((qid) => (
                      <li key={qid}>{questionTextById(qid)}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MapQuestions;
