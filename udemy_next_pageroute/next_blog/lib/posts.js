import { readFile } from "fs/promises";

export async function getPost(slug) {
  try {
    const data = await readFile(`content/posts/${slug}.json`, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error(`post파일 로드 실패: ${error}`);
    throw new Error("post 파일 로드 실패");
  }
}
