// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";
import path from "path";

interface Data {
  message: string;
  feedback?: Feedback;
}
interface Feedback {
  id: string;
  email: string;
  text: string;
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    console.log(req.body);
    const email = req.body.email;
    const feedbackText = req.body.text;

    const newFeedback: Feedback = {
      id: new Date().toISOString(),
      email: email,
      text: feedbackText,
    };

    const filePath = path.join(process.cwd(), "data", "feedback.json");
    const fileData = fs.readFileSync(filePath, "utf-8");

    let data = [];

    try {
      data = JSON.parse(fileData);
    } catch (error) {
      console.error("Error parsing JSON:", error);
    }

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(201).json({ message: "Success!", feedback: newFeedback });
  } else {
    res.status(200).json({ message: "Hello!!" });
  }
}
