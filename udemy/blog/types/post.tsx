export interface Post {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

export interface PostsArray {
  posts: Post[];
}
