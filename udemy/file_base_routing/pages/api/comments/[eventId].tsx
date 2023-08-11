import { NextApiRequest, NextApiResponse } from "next";

function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.id;

  if (req.method === "POST") {
    const { email, name, text } = req.body;

    if (
      !email.includes("@") ||
      !text ||
      text.trim() === "" ||
      !name ||
      name.trim() === ""
    ) {
      res.status(422).json({ message: "Invalid data" });
    }

    const newComment = {
      id: new Date().toISOString(),
      email,
      name,
      text,
    };

    // console.log(newComment);

    res.status(201).json({ message: "Comment 추가 성공" });
  }

  if (req.method === "GET") {
    const dummyList = [
      {
        id: "c1",
        name: "kang",
        text: "hello world",
      },
      {
        id: "c2",
        name: "kang",
        text: "hello world",
      },
    ];

    res.status(200).json({ comments: dummyList });
  }
}

export default handler;
