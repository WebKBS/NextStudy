import { verifyPassword } from "@/lib/auth";
import { connetToDatabase } from "@/lib/db";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// https://next-auth.js.org/providers/credentials 참고

export default NextAuth({
  session: {
    jwt: true,
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        const client = await connetToDatabase();
        const usersCollection = client.db().collection("users");

        const user = await usersCollection.findOne({
          email: credentials.email,
        });

        if (!user) {
          throw new Error("등록된 유저가 없습니다.");
        }

        // compare 된 비밀번호 일치 확인
        const isValid = await verifyPassword(
          credentials.password,
          user.password
        );

        if (!isValid) {
          throw new Error("비밀번호가 일치하지 않습니다.");
          client.close();
        }

        client.close();
        console.log(req.body);
        // 비밀번호는 절대 내보내지 않는다.
        return { email: user.email };
      },
    }),
  ],
});
