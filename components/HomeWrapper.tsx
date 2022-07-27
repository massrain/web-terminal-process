import { FC, useState, useEffect } from "react";
import { IParameters } from "../helpers/types";
import useInterval from "../helpers/useInterval";
import Actions from "./Actions";
import Results from "./Results";
import io, { Socket } from "socket.io-client";

const HomeWrapper: FC = () => {
  const [requestParams, setRequestParams] = useState<null | IParameters>(null);
  const [response, setResponse] = useState<string | null>(null);
  const [isError, setIsError] = useState<string | null>(null);

  const [delay, setDelay] = useState<number>(60000);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [socketState, setSocketState] = useState<Socket | null>(null);

  useInterval(
    () => {
      if (requestParams) {
        //const cmdString = `node ./command/index.js ${requestParams.param1} ${requestParams.param2}`;
        const cmdString = `ping www.google.com -c 5 ${requestParams.param1} ${requestParams.param2}`;
        socketState?.emit("execute-request", cmdString);
      }
    },
    isPlaying ? delay : null
  );

  useEffect(() => {
    fetch("/api/socket").finally(() => {
      const socket = io();
      setSocketState(socket);

      socket.on("connect", () => {
        console.log("connect");
      });

      socket.on("finished", (data) => {
        console.log("finished", data);
        if (Number(data) === 0) {
          setResponse((prev) => {
            if (!prev) return data;
            return prev + "\n" + "Working again" + "\n";
          });
        }
      });

      socket.on("error", (data) => {
        console.log("error", data);
        setIsError(data);
      });

      socket.on("stdout", (data) => {
        console.log("stdout", data);
        setResponse((prev) => {
          if (!prev) return data;
          return prev + data;
        });
      });

      socket.on("disconnect", () => {
        console.log("disconnect");
      });
    });
  }, []);

  const handleExecutioner = (parameters: IParameters) => {
    //const cmdString = `node ./command/index.js ${parameters.param1} ${parameters.param2}`;
    const cmdString = `ping www.google.com -c 5 ${parameters.param1} ${parameters.param2}`;
    setResponse(null);
    setRequestParams(parameters);
    if (parameters.period) {
      socketState?.emit("execute-request", cmdString);
      setDelay(parameters.minutes * 60 * 1000);
      setIsPlaying((prev) => !prev);
    } else {
      socketState?.emit("execute-request", cmdString);
    }
  };

  return (
    <>
      <Actions handleExecutioner={handleExecutioner} isPlaying={isPlaying} />
      <p className="text-xs text-gray-500">
        Command running:{" "}
        <span className="font-mono text-gray-800">
          {/* {requestParams ? `node ./command/index.js ${requestParams.param1} ${requestParams.param2}` : ""} */}
          {requestParams ? `ping www.google.com -c 5 ${requestParams.param1} ${requestParams.param2}` : ""}
        </span>
      </p>
      {isError && <p className="mt-4 text-red-500">{isError}</p>}
      {response && <Results response={response} />}
    </>
  );
};

export default HomeWrapper;
