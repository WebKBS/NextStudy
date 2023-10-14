import Head from "next/head";
import Link from "next/link";
import { getSlugs } from "../lib/posts";

export async function getStaticProps() {
  try {
    const slugs = await getSlugs();

    return {
      props: {
        slugs,
      },
    };
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

function HomePage({ slugs }) {
  console.log("[index]", { slugs });

  // console.log(slugs);

  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <main>
        <h1>My Blog</h1>
        <ul>
          {slugs.map((slug) => (
            <li>
              <Link href={`/posts/${slug}`}>{slug}</Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}

export default HomePage;
