export interface PostContentType {
  title: string;
  image: string;
}

export interface Post extends PostContentType {
  excerpt: string;
  date: string;
  slug: string;
}

export interface PostsArray {
  posts: Post[];
}
