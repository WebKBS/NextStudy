import { NextApiRequest, NextApiResponse } from "next";
import {
  checkDuplicateEmail,
  connectToDatabase,
  insertDocument,
} from "../../helpers/db-util";

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
      await checkDuplicateEmail(client, "newsletter", userEmail); // 가입된 이메일시 에러
      await insertDocument(client, "newsletter", { email: userEmail });
      client!.close();
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "데이터베이스 추가 실패" });
    }

    res.status(201).json({ message: "Success" });
  }
}

export default handler;
