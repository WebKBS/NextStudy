import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    // console.log(userEmail);
    res.status(201).json({ message: "Success" });
  }
}

export default handler;
