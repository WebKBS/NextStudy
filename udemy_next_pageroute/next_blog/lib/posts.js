import { readFile, readdir } from "fs/promises";
import { marked } from "marked";
import matter from "gray-matter";

export async function getPost(slug) {
  try {
    const source = await readFile(`content/posts/${slug}.md`, "utf8");
    const {
      data: { date, title },
      content,
    } = matter(source);

    const body = marked(content);

    return {
      date,
      title,
      body,
    };
  } catch (error) {
    console.error(`post파일 로드 실패: ${error}`);
    throw new Error("post 파일 로드 실패");
  }
}

export async function getPosts() {
  const slugs = await getSlugs();
  const posts = [];

  for (const slug of slugs) {
    const post = await getPost(slug);
    posts.push({ slug, ...post });
  }
  return posts;
}

export async function getSlugs() {
  const suffix = ".md";
  const files = await readdir("content/posts");
  console.log("파일", files);

  return files
    .filter((file) => file.endsWith(suffix))
    .map((file) => file.slice(0, -suffix.length));
}
