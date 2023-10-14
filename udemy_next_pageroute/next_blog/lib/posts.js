import { readFile } from "fs/promises";
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
