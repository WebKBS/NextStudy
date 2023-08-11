import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
const url = process.env.MONGO_URI;

async function connectToDatabase() {
  const client = await MongoClient.connect(url!);
  return client;
}

async function insertDocument(client: any, document: object) {
  const db = client.db();
  await db.collection("newsletter").insertOne(document);
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    let client;
    try {
      client = await connectToDatabase();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "데이터베이스 연결실패" });
    }

    try {
      await insertDocument(client, { email: userEmail });
      client!.close();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "데이터베이스 추가 실패" });
    }

    res.status(201).json({ message: "Success" });
  }
}

export default handler;
