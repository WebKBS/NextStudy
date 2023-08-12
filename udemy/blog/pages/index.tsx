import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-util";
import { GetStaticProps } from "next";
import Head from "next/head";
import { Fragment } from "react";

function HomePage(props: any) {
  return (
    <Fragment>
      <Head>
        <title>my blog</title>
        <meta name="description" content="my blog description" />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}

export default HomePage;
