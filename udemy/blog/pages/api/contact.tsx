import { MongoClient, ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

interface MongoData {
  id?: ObjectId;
  email: string;
  name: string;
  message: string;
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (
      !email ||
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      !message ||
      message.trim() === ""
    ) {
      res.status(422).json({ message: "폼이 유효하지 않습니다." });
      return;
    }

    const newMessage: MongoData = {
      email,
      name,
      message,
    };

    let client;

    try {
      client = await MongoClient.connect(process.env.MONGODB_URL!);
    } catch (error) {
      res.status(500).json({ message: "데이터베이스 연결 실패" });
      return;
    }

    const db = client.db();
    // let result;
    try {
      const result = await db.collection("messages").insertOne(newMessage);
      newMessage.id = result.insertedId;
      console.log("message 전송 성공");
    } catch (err) {
      console.log(err);
      client?.close();
      res.status(500).json({ message: "데이터베이스 메세지 입력 실패" });
      return;
    }

    client?.close();

    res.status(201).json({ message: "Form Success!!", messages: newMessage });
  }
}

export default handler;
