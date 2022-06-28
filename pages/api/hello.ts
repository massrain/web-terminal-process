// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { exec } from "child_process";

type Data = { success: boolean; data: unknown };

const prcsExecutioner = (cmdString: string) => {
  return new Promise((resolve, reject) => {
    exec(cmdString, (error, stdout, stderr) => {
      if (error) return reject(`error: ${error.message}`);
      if (stderr) return reject(`stderr: ${stderr}`);
      return resolve(stdout);
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { method, body } = req;
  const { cmdString } = body;

  switch (method) {
    case "POST":
      try {
        const resp = await prcsExecutioner(cmdString);
        res.status(200).json({ success: true, data: resp });
      } catch (error) {
        res.status(200).json({ success: false, data: error });
      }
      break;
    default:
      res.setHeader("Allow", ["GET"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default handler;
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};
