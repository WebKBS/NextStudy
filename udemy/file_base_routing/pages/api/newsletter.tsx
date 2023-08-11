import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
const url = process.env.MONGO_URI;

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const userEmail = req.body.email;

    if (!userEmail || !userEmail.includes("@")) {
      res.status(400).json({ message: "Invalid email" });
      return;
    }

    const client = await MongoClient.connect(url!);
    const db = client.db();

    await db.collection("emails").insertOne({ email: userEmail });

    client.close();

    res.status(201).json({ message: "Success" });
  }
}

export default handler;
