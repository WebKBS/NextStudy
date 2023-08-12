import fs from "fs";
import path from "path";

import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

function getPostData(filename: string) {
  const filePath = path.join(postsDirectory, filename);
  const fileContent = fs.readFileSync(filePath, "utf8");

  const { data, content } = matter(fileContent);

  const postSlug = filename.replace(/\.md$/, "");

  const postData = {
    slug: postSlug,
    ...data,
    content,
  };

  return postData;
}

function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA: any, postB: any) =>
    postA.date > postB.date ? -1 : 1
  );
  return sortedPosts;
}

function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post: any) => post.isFeatured);

  return featuredPosts;
}

export { getPostData, getAllPosts, getFeaturedPosts };
