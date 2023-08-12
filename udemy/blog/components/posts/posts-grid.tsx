import PostItem from "./posts-item";
import classes from "./posts-grid.module.css";

interface Post {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface PostProps {
  posts: Post[];
}

function PostsGrid({ posts }: PostProps) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem
          key={post.slug} // 키
          post={{
            title: post.title,
            image: post.image,
            excerpt: post.excerpt,
            date: post.date,
            slug: post.slug,
          }}
        />
      ))}
    </ul>
  );
}

export default PostsGrid;
