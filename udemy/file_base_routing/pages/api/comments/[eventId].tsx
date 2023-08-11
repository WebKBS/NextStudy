import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
const url = process.env.MONGO_URI_EVENTS;

interface Comment {
  email: string;
  name: string;
  text: string;
  eventId: string | string[] | undefined; // eventId의 타입 변경
  id?: ObjectId;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const eventId = req.query.id;

  const client = await MongoClient.connect(url!);

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

    const newComment: Comment = {
      email,
      name,
      text,
      eventId,
    };

    const db = client.db();

    const result = await db.collection("comments").insertOne(newComment);

    newComment.id = result.insertedId;

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

  client.close();
}

export default handler;
