import { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

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

    const newMessage = {
      email,
      name,
      message,
    };

    // MySQL 연결 설정
    const dbConnection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    try {
      // 데이터베이스에 데이터 입력
      await dbConnection.query(
        "INSERT INTO messages (email, name, message) VALUES (?, ?, ?)",
        [email, name, message]
      );

      console.log("Data inserted into MySQL");

      res.status(201).json({ message: "Form Success!!", messages: newMessage });
    } catch (error) {
      console.error("Error inserting data:", error);
      res.status(500).json({ message: "Internal Server Error" });
    } finally {
      // 연결 닫기
      dbConnection.end();
    }
  }
}

export default handler;
