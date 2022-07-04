import { ChangeEvent, FC, useRef, useState } from "react";
import { IActionsProps } from "../helpers/types";

const pList: any = {
  "Long List": "-l",
  "List Hidden": "-a",
  "List Sizes": "-lh",
  "List Recursively": "-R",
  "Sort by size": "-lS",
  Version: "-version",
  bitfinex: "bitfinex",
  kucoin: "kucoin",
  Help: "-help",
};

const Actions: FC<IActionsProps> = ({ handleExecutioner, isPlaying }) => {
  const [parameterList1, setParameterList1] = useState(pList);
  const [parameterList2, setParameterList2] = useState(pList);

  const sbObject1 = useRef<HTMLSelectElement>(null);
  const sbObject2 = useRef<HTMLSelectElement>(null);
  const cbPeriod = useRef<HTMLInputElement>(null);
  const ibMins = useRef<HTMLInputElement>(null);

  const handleChange1 = (e: ChangeEvent<HTMLSelectElement>) => {
    const newObj: any = { ...pList };
    delete newObj[e.target.value];
    setParameterList2(newObj);
  };

  const handleChange2 = (e: ChangeEvent<HTMLSelectElement>) => {
    const newObj: any = { ...pList };
    delete newObj[e.target.value];
    setParameterList1(newObj);
  };

  const handleStart = () => {
    const postData = {
      param1: pList[sbObject1.current?.value || ""] || "",
      param2: pList[sbObject2.current?.value || ""] || "",
      period: cbPeriod.current?.checked || false,
      minutes: Number(ibMins.current?.value) || 1,
    };
    handleExecutioner(postData);
  };

  return (
    <div className="flex flex-col bg-red-200 rounded p-4 mt-1">
      <div className="flex justify-evenly">
        <div className="flex flex-col items-center justif-center mx-6">
          <label className="text-sm font-medium">Select Object 1</label>
          <select
            className="mt-1 border-gray-200 rounded w-full focus:z-10 text-sm py-2 pl-3 pr-6 focus:ring focus:outline-none"
            ref={sbObject1}
            defaultValue={""}
            onChange={handleChange1}
          >
            <option value={""}>None</option>
            {Object.keys(parameterList1).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col items-center justif-center mx-6">
          <label className="text-sm font-medium">Select Object 2</label>
          <select
            className="mt-1 border-gray-200 rounded w-full focus:z-10 text-sm py-2 pl-3 pr-6 focus:ring focus:outline-none"
            ref={sbObject2}
            defaultValue={""}
            onChange={handleChange2}
          >
            <option value={""}>None</option>
            {Object.keys(parameterList2).map((el) => (
              <option key={el} value={el}>
                {el}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex flex-col items-center mt-8">
        <div className="flex items-center justify-center">
          <input type="checkbox" className="w-4 h-4 border-gray-300 rounded" ref={cbPeriod} />
          <label className="ml-1 text-sm font-medium">
            <div>
              <span>Run every</span>
              <input
                type="number"
                min="5"
                max="60"
                step="5"
                placeholder="1"
                ref={ibMins}
                className="mx-1 w-10 p-1 text-xs text-center border-gray-200 rounded"
              />
              <span>minutes</span>
              <span className="text-xs text-gray-500 font-normal">(cd .. yapar)</span>
            </div>
          </label>
        </div>
        <div className="buttons">
          {isPlaying ? (
            <button
              onClick={handleStart}
              className="inline-flex items-center px-8 py-3 mt-2 text-white bg-red-600 border border-red-600 rounded hover:bg-gray-200 hover:text-red-600 active:text-red-500 focus:outline-none focus:ring"
            >
              <span className="text-sm font-medium">Stop</span>
              <svg
                className="w-5 h-5 ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleStart}
              className="inline-flex items-center px-8 py-3 mt-2 text-white bg-indigo-600 border border-indigo-600 rounded hover:bg-gray-200 hover:text-indigo-600 active:text-indigo-500 focus:outline-none focus:ring"
            >
              <span className="text-sm font-medium">Start</span>
              <svg
                className="w-5 h-5 ml-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Actions;
