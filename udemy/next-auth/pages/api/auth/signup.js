import { hashPassword } from "@/lib/auth";
import { connetToDatabase } from "@/lib/db";

async function handler(req, res) {
  const data = req.body;

  const { email, password } = data;

  if (
    !email ||
    !email.includes("@") ||
    !password ||
    password.trim().length < 7
  ) {
    return res
      .status(422)
      .json({ message: "이메일 또는 비밀번호 유효성에 실패했습니다." });
  }

  const client = await connetToDatabase();

  const db = client.db();

  const hashedPassword = hashPassword(password);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "회원가입 완료" });
}

export default handler;
