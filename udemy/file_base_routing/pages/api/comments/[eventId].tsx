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
    const db = client.db();
    const documents = await db
      .collection("comments")
      .find()
      .sort({ _id: -1 }) // -1 또는 +1로 내림차순 올림차순 순서를 변경할 수 있다.
      .toArray();

    res.status(200).json({ comments: documents });
  }

  client.close();
}

export default handler;
