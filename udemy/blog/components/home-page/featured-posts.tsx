import { PostsArray } from "@/types/post";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

function FeaturedPosts({ posts }: PostsArray) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={posts} />
    </section>
  );
}

export default FeaturedPosts;
