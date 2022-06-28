import React, { FC } from "react";
import { IResultProps } from "../helpers/types";

const Results: FC<IResultProps> = ({ response }) => {
  console.log(response);

  //const modifiedString = response.data.split("\n").map((str, index) => <p key={str}>{str}</p>);
  const modifiedString = response.data.split("\n").map((str, i) => (
    <pre data-prefix={i + 1} key={i}>
      <code>{str}</code>
    </pre>
  ));

  return (
    <div className="flex flex-col w-full border border-red-200 p-6 my-4 mx-2 overflow-auto">
      <h5 className="font-medium text-lg text-center">
        Result :
        <span className={`${response.success ? "text-teal-600" : "text-red-600"}`}>
          {response.success ? " Başarılı" : " Hata"}
        </span>
      </h5>
      <div className="res flex flex-col mt-">
        <div className="mockup-code flex flex-col w-full text-white">{modifiedString}</div>
      </div>
    </div>
  );
};

export default Results;
