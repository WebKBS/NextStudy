import { hashPassword } from "@/lib/auth";
import { connetToDatabase } from "@/lib/db";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

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

  // 만약 가입한 이메일 일때 에러처리
  const existingUser = await db.collection("users").findOne({ email });
  if (existingUser) {
    res.status("404").json({ message: "이미 가입한 이메일 입니다." });
    client.close();
    return;
  }

  const hashedPassword = await hashPassword(password);

  const result = await db.collection("users").insertOne({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "회원가입 완료" });
  client.close();
}

export default handler;
