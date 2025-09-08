import { Form, Select } from "antd";
import React, { useState } from "react";

const Rules = () => {
  const [rules, setRules] = useState([
    {
      id: crypto.randomUUID(),
      type: "",
      rules: [{ ruleId: crypto.randomUUID(), rule: "" }],
    },
  ]);

  const handleRuleTypeSelection = (type, ruleId) => {
    setRules(
      rules.map((rule) =>
        rule.id === ruleId
          ? {
              ...rule,
              type: type,
            }
          : rule
      )
    );
  };

  const rulesTypes = ["Checklist", "Non-checklist", "Routine"];
  const rulesTypesOptions = rulesTypes.map((value) => ({
    label: value,
    value,
  }));
  return (
    <div className="flex flex-col flex-1 gap-5 h-full mb-5">
      {rules.map((rule, index) => (
        <div
          key={rule.id}
          className="w-full flex-col border border-black/10 p-3 rounded-lg"
        >
          <div className="flex gap-5 justify-between items-center">
            <h2 className="text-xl font-bold">Rules</h2>
            <Select
              options={rulesTypesOptions}
              placeholder="Select rule type"
              onChange={(value) => handleRuleTypeSelection(value, rule.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Rules;
