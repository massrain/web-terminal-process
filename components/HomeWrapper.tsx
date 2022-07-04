import axios from "axios";
import { FC, useState } from "react";
import { ApiResponseSchema, IParameters } from "../helpers/types";
import useInterval from "../helpers/useInterval";
import Actions from "./Actions";
import Results from "./Results";

const executeRequest = (parameters: IParameters) => {
  console.log("executeRequest working with params: ", parameters.param1, parameters.param2);
  return new Promise((resolve, reject) => {
    axios
      .post("/api/hello", {
        //cmdString: `${parameters.period ? "cd .. && " : ""}ls ${parameters.param1} ${parameters.param2}`,
        cmdString: `node ./command/index.js ${parameters.param1} ${parameters.param2}`,
        //cmdString: `ls ${parameters.param1} ${parameters.param2}`,
      })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err.response.statusText));
  });
};

const HomeWrapper: FC = () => {
  const [requestParams, setRequestParams] = useState<null | IParameters>(null);
  const [response, setResponse] = useState<ApiResponseSchema | null>(null);
  const [isError, setIsError] = useState<string | null>(null);
  // Dynamic delay
  const [delay, setDelay] = useState<number>(60000);
  // ON/OFF
  const [isPlaying, setPlaying] = useState<boolean>(false);

  useInterval(
    () => {
      if (requestParams) {
        executeRequest(requestParams)
          .then((res: any) => setResponse(res))
          .catch((err) => setIsError(err));
      }
    },
    isPlaying ? delay : null
  );

  const handleExecutioner = (parameters: IParameters) => {
    setRequestParams(parameters);
    if (parameters.period) {
      executeRequest(parameters)
        .then((res: any) => setResponse(res))
        .catch((err) => setIsError(err));
      setDelay(parameters.minutes * 60 * 1000);
      setPlaying((prev) => !prev);
    } else {
      executeRequest(parameters)
        .then((res: any) => setResponse(res))
        .catch((err) => setIsError(err));
    }
  };

  return (
    <>
      <Actions handleExecutioner={handleExecutioner} isPlaying={isPlaying} />
      <p className="text-xs text-gray-500">
        Command running:{" "}
        <span className="font-mono text-gray-800">
          {requestParams ? `node ./command/index.js ${requestParams.param1} ${requestParams.param2}` : ""}
        </span>
      </p>
      {isError && <p className="mt-4 text-red-500">{isError}</p>}
      {response && <Results response={response} />}
    </>
  );
};

export default HomeWrapper;
