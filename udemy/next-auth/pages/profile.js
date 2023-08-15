import UserProfile from "../components/profile/user-profile";
import { getSession } from "next-auth/react";

function ProfilePage() {
  return <UserProfile />;
}

export async function getServerSideProps(context) {
  const session = await getSession({ req: context.req });

  console.log("aaa", session);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
        // notfound: false,
      },
    };
  }

  return {
    props: { session },
  };
}

export default ProfilePage;
