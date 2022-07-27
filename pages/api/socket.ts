// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import type { NextApiRequest, NextApiResponse } from "next";
import { Server } from "socket.io";
import { ChildProcess, exec } from "child_process";

const prcsExecutioner = (cmdString: string): Promise<ChildProcess> => {
  console.log("Process Command Executed: ", new Date(Date.now()).toLocaleString("tr-TR", { timeZone: "UTC" }));

  return new Promise((resolve, reject) => {
    const proc = exec(cmdString, (error, stdout, stderr) => {
      if (error) return reject(`error name: ${error.name} - msg: ${error.message}, [STACK] ${error.stack}`);
      if (stderr) return reject(`stderr: ${stderr}`);
    });
    return resolve(proc);
  });
};

const ioHandler = (req: NextApiRequest, res: NextApiResponse) => {
  if (!res.socket.server.io) {
    const io = new Server(res.socket.server);

    io.on("connection", (socket) => {
      socket.broadcast.emit("a user connected");
      socket.on("execute-request", async (cmdString: string) => {
        try {
          const respn = await prcsExecutioner(cmdString);

          respn.stdout.on("data", (data) => {
            console.log(`stdout2: ${data}`);
            socket.emit("stdout", data);
          });
          respn.on("close", (code) => {
            console.log(`Exited with code: ${code}`);
            socket.emit("finished", code);
          });
          respn.on("error", (err) => {
            console.log("Error in Response", err);
            socket.emit("error", err);
          });
          respn.stdout.on("error", (err) => {
            console.log("Error in Response2", err);
            socket.emit("error", err);
          });
          respn.stderr.on("data", (err) => {
            console.log("Error in Response3:", err);
            socket.emit("error", err);
          });
        } catch (error) {
          console.log("catch", error);
        }
      });
    });

    res.socket.server.io = io;
  } else {
    console.log("socket.io already running");
  }
  res.end();
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default ioHandler;
