import React, { Suspense, useState } from "react";
import ViewAllChecklist from "./ViewAllChecklist";
import CreateChecklist from "./CreateChecklist";
import { ErrorBoundary } from "react-error-boundary";
import Section from "../../components/ChecklistCompanionComponents/Section";
import Questions from "../../components/ChecklistCompanionComponents/Questions";
import MapQuestions from "../../components/ChecklistCompanionComponents/MapQuestions";
import Metadata from "../../components/ChecklistCompanionComponents/Metadata";

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
            <Metadata setOption={setOption} />
          </ErrorBoundary>
        );
        break;
      case "createSection":
        curOption = (
          <ErrorBoundary fallback={<div>Somethig went wrong</div>}>
            <Section setOption={setOption} />
          </ErrorBoundary>
        );
        break;
      case "createQuestion":
        curOption = (
          <ErrorBoundary fallback={<div>Somethig went wrong</div>}>
            <Questions setOption={setOption} />
          </ErrorBoundary>
        );
        break;
      case "mapSection":
        curOption = (
          <ErrorBoundary fallback={<div>Somethig went wrong</div>}>
            <MapQuestions setOption={setOption} />
          </ErrorBoundary>
        );
        break;
    }
    return curOption;
  };
  return <div className="h-full">{handleOptions()}</div>;
};

export default ChecklistCompanion;
