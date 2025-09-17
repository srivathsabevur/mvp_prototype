import React, { Suspense, useState } from "react";
import ViewAllChecklist from "./ViewAllChecklist";
import CreateChecklist from "./CreateChecklist";
import { ErrorBoundary } from "react-error-boundary";

const ChecklistCompanion = () => {
  const [option, setOption] = useState("viewAllChecklist");

  const handleOptions = () => {
    let curOption = null;
    switch (option) {
      default:
        console.error("Invalid option");
        break;
      case "viewAllChecklist":
        curOption = <ViewAllChecklist setOption={setOption} />;
        break;
      case "createChecklist":
        curOption = (
          <ErrorBoundary fallback={<div>Somethig went wrong</div>}>
            <CreateChecklist setOption={setOption} />
          </ErrorBoundary>
        );
        break;
    }
    return curOption;
  };
  return <div className="h-full">{handleOptions()}</div>;
};

export default ChecklistCompanion;
