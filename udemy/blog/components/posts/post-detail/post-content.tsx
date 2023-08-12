import { ReactMarkdown } from "react-markdown/lib/react-markdown";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";
import { Post } from "@/types/post";

function PostContent({ post }: any) {
  const imagePath = `/images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
