import { readFile } from "fs/promises";
import { marked } from "marked";

export async function getPost(slug) {
  try {
    const source = await readFile(`content/posts/${slug}.md`, "utf8");
    const html = marked(source);
    // return JSON.parse(data);

    return {
      body: html,
    };
  } catch (error) {
    console.error(`post파일 로드 실패: ${error}`);
    throw new Error("post 파일 로드 실패");
  }
}
