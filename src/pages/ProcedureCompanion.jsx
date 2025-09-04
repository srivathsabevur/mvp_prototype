import React, { useState } from "react";
import ViewAllProcedures from "../components/ViewAllProcedures";
import CreateProcedure from "../components/CreateProcedure";
import SetupTemplate from "../components/SetupTemplate";

const ProcedureCompanion = () => {
  const [option, setOption] = useState("viewAllProcedures");

  const handleComponentView = () => {
    let curComponent;
    switch (option) {
      case "viewAllProcedures":
        curComponent = <ViewAllProcedures setOption={setOption} />;
        break;
      case "createProcedure":
        curComponent = <CreateProcedure setOption={setOption} />;
        break;
      case "setupTemplate":
        curComponent = <SetupTemplate setOption={setOption} />;
        break;
      default:
        console.error("Invalid Option");
        break;
    }
    return curComponent;
  };

  return <div className="-z-100 h-full">{handleComponentView()}</div>;
};

export default ProcedureCompanion;
