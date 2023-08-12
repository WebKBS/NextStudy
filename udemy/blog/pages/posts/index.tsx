import AllPosts from "@/components/posts/all-posts";

const DUMMY_POSTS = [
  {
    slug: "getting-started-with-nextjs",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework",
    date: "2023-02-22",
  },
  {
    slug: "getting-started-with-nextjs1",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework",
    date: "2023-02-22",
  },
  {
    slug: "getting-started-with-nextjs2",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework",
    date: "2023-02-22",
  },
  {
    slug: "getting-started-with-nextjs3",
    title: "Getting Started with NextJS",
    image: "getting-started-nextjs.png",
    excerpt: "NextJS is a React framework",
    date: "2023-02-22",
  },
];

function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
