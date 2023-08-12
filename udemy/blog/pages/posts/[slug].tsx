import PostContent from "@/components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "@/lib/posts-util";

import { GetStaticPropsContext } from "next";
import Head from "next/head";
import { Fragment } from "react";

function PostDetailPage(props: { post: any }) {
  return (
    <Fragment>
      <Head>
        <title>{props.post.title}</title>
        <meta name="description" content={props.post.excerpt} />
      </Head>
      <PostContent post={props.post} />
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;
  const { slug } = params as { slug: string };

  const postData = getPostData(slug);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export async function getStaticPaths() {
  const postFilenames = getPostsFiles();

  const slugs = postFilenames.map((filename) => filename.replace(/\.md$/, ""));

  const paths = slugs.map((slug) => ({ params: { slug } }));

  return {
    paths: paths,
    fallback: false,
  };
}

export default PostDetailPage;
