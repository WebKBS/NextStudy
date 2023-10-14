import Head from "next/head";
import { getPost } from "../../lib/posts";

export async function getStaticPaths() {
  return {
    paths: [
      { params: { slug: "first-post" } },
      { params: { slug: "second-post" } },
    ],
    fallback: false, // fallback false를 설정하면 404페이지가 표시된다.
  };
}

// 정적 페이지 생성 getStaticProps
// getStaticProps는 서버에서 실행 되고 빌드시 클라이언트 사이드이다..
export async function getStaticProps({ params }) {
  console.log("[포스트 페이지] getStaticProps()");
  console.log("params: ", params);

  try {
    const post = await getPost(params.slug);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("에러 발생:", error);
  }
}

function FirstPostPage({ post }) {
  console.log("포스트 페이지", { post });
  return (
    <>
      <Head>
        <title>{post.title} - My Blog</title>
      </Head>
      <main>
        <p>{post.date}</p>
        <h1>{post.title}</h1>
        {/* text로 들어온 body를 html을 허용해줘야한다. */}
        <article dangerouslySetInnerHTML={{ __html: post.body }}></article>
      </main>
    </>
  );
}

export default FirstPostPage;
