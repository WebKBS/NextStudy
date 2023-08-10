// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";

interface Data {
  feedback: Feedback[];
}

interface Feedback {
  id: string;
  email: string;
  text: string;
}

function buildFeedbackPath() {
  return path.join(process.cwd(), "data", "feedback.json");
}

function extractFeedback(filePath: string): Feedback[] {
  const fileData = fs.readFileSync(filePath).toString();
  let data: Feedback[] = [];
  try {
    data = JSON.parse(fileData);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  return data;
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

    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);

    data.push(newFeedback);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    res.status(201).json({ feedback: [newFeedback] });
  } else {
    const filePath = buildFeedbackPath();
    const data = extractFeedback(filePath);
    res.status(200).json({ feedback: data });
  }
}
