import { verifyPassword } from "@/lib/auth";
import { connectToDatabase } from "@/lib/db";
import { getSession } from "next-auth/react";
// import { getToken } from "next-auth/jwt";

async function handler(req, res) {
  if (req.method !== "PATCH") {
    console.log("method 다름");
    return;
  }

  const session = await getSession({ req });
  console.log("세션 :", session);

  if (!session) {
    res.status(401).json({ message: "인증 실패" });
    return;
  }

  const userEmail = session.user.email;
  const oldPassword = req.body.oldPassword;
  const newPassword = req.body.newPassword;

  const client = await connectToDatabase();
  const usersCollection = client.db().collection("users");
  const user = await usersCollection.findOne({ email: userEmail });

  if (!user) {
    res.status(404).json({ message: "User not found" });
    client.close();
    return;
  }

  const currentPassword = user.password;

  const passwordsAreEquel = await verifyPassword(oldPassword, currentPassword);
  if (!passwordsAreEquel) {
    res.status(403).json({ message: "비밀번호가 일치하지 않습니다." });
    client.close();
    return;
  }

  const hasedPassword = await hasedPassword(newPassword);

  const result = await usersCollection.updateOne(
    { email: userEmail },
    { $set: { password: hasedPassword } }
  );

  client.close();
  res.status(200).json({ message: "비밀번호 변경 완료!" });
}

export default handler;
