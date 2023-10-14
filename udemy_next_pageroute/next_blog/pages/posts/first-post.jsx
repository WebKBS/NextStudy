import Head from "next/head";
import { getPost } from "../../lib/posts";

// 정적 페이지 생성 getStaticProps
// getStaticProps는 서버에서 실행 되고 빌드시 클라이언트 사이드이다..
export async function getStaticProps() {
  console.log("[첫번째 포스트 페이지] getStaticProps()");

  try {
    const post = await getPost("first-post");

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
  console.log("첫번째 포스트 페이지", { post });
  return (
    <>
      <Head>
        <title>{post.title} - My Blog</title>
      </Head>
      <main>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </main>
    </>
  );
}

export default FirstPostPage;
