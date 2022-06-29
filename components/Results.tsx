import React, { FC } from "react";
import { IResultProps } from "../helpers/types";

const Results: FC<IResultProps> = ({ response }) => {
  //const modifiedString = response.data.split("\n").map((str, index) => <p key={str}>{str}</p>);
  const modifiedString = response.data.split("\n").map((str, i) => (
    <pre data-prefix={i + 1} key={i}>
      <code>{str}</code>
    </pre>
  ));

  const handleExport = () => {
    const contentDivElem = document.getElementById("contentDiv");
    if (contentDivElem) {
      const inHTML = contentDivElem.innerHTML;
      const link = document.createElement("a");
      link.setAttribute("download", "result.html");
      link.setAttribute("href", "data:" + "text/html" + ";charset=utf-8," + encodeURIComponent(inHTML));
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="flex flex-col w-full border border-red-200 p-6 my-4 mx-2 overflow-auto">
      <h5 className="font-medium text-lg text-center">
        Result :
        <span className={`${response.success ? "text-teal-600" : "text-red-600"}`}>
          {response.success ? " Başarılı" : " Hata"}
        </span>
      </h5>
      <div className="res flex flex-col mt-2">
        <div className="mockup-code flex flex-col w-full text-white" id="contentDiv">
          {modifiedString}
        </div>
      </div>
      <div className="export flex items-center justify-center mt-2">
        <button
          onClick={handleExport}
          className="inline-flex items-center px-8 py-3 mt-2 text-white bg-teal-600 border border-teal-600 rounded hover:bg-transparent hover:text-teal-600 active:text-teal-500 focus:outline-none focus:ring"
        >
          <span className="text-sm font-medium">Export Result</span>
        </button>
      </div>
    </div>
  );
};

export default Results;
