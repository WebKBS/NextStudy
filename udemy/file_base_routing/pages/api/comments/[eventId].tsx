import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import {
  connectToDatabase,
  getAllDcouments,
  insertDocument,
} from "@/helpers/db-util";
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

  let client;
  try {
    client = await connectToDatabase();
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "데이터베이스 연결실패" });
    return; // 데이터베이스 연결 실패하면 바로 return한다.
  }

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
      client.close();
      return; // 유효성에 실패하면 클라이언트를 바로 닫고 리턴한다.
    }

    const newComment: Comment = {
      email,
      name,
      text,
      eventId,
    };

    let result;

    try {
      result = await insertDocument(client, "comments", newComment);
      newComment.id = result.insertedId;
      res.status(201).json({ message: "Comment 추가 성공" });
    } catch (err) {
      console.log(err);
      res.status(422).json({ message: "Invalid data" });

      // 가장 아래 클리언트를 닫아야하기에 리턴하지 않는다.
    }
  }

  let documents;

  if (req.method === "GET") {
    try {
      documents = await getAllDcouments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "comments 추가 실패" });
      // 가장 아래 클리언트를 닫아야하기에 리턴하지 않는다.
    }
  }

  client.close();
}

export default handler;
