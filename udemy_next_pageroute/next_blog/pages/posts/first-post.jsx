import Head from "next/head";

// 정적 페이지 생성 getStaticProps
export async function getStaticProps() {
  return {
    props: {
      post: {
        title: "First Post",
        body: "첫번째 포스트 내용",
      },
    },
  };
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
