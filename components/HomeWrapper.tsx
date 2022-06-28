import axios from "axios";
import { FC, useState } from "react";
import { ApiResponseSchema, IParameters } from "../helpers/types";
import Actions from "./Actions";
import Results from "./Results";

const HomeWrapper: FC = () => {
  const [requestParams, setRequestParams] = useState<null | IParameters>(null);
  const [response, setResponse] = useState<ApiResponseSchema | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  const handleExecutioner = (parameters: IParameters) => {
    setRequestParams(parameters);
    axios
      .post("/api/hello", {
        cmdString: `${parameters.period ? "cd .. && " : ""}ls ${parameters.param1} ${parameters.param2}`,
      })
      .then((res) => setResponse(res.data))
      .catch((err) => setIsError(err.response.statusText));
  };
  return (
    <>
      <Actions handleExecutioner={handleExecutioner} />
      <p className="text-xs text-gray-500">
        Command running:{" "}
        {requestParams
          ? `${requestParams.period ? "cd .. && " : ""}ls ${requestParams.param1} ${requestParams.param2}`
          : ""}
      </p>
      {isError && <p className="mt-4 text-red-500">{isError}</p>}
      {response && <Results response={response} />}
    </>
  );
};

export default HomeWrapper;
