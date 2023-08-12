export interface PostContent {
  title: string;
  image: string;
}

export interface Post extends PostContent {
  excerpt: string;
  date: string;
  slug: string;
}

export interface PostsArray {
  posts: Post[];
}
