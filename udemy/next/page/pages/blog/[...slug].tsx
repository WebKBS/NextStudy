// 모든 path이름 가져오는 방법
// 파일 이름 [...slug].tsx
// 마치 rest문법 같은
// 콘솔이 배열로 나타난다

import { useRouter } from "next/router";

function BlogPostsPage() {
  const router = useRouter();
  console.log(router.query);

  return (
    <div>
      <h1>Blog Post</h1>
    </div>
  );
}

export default BlogPostsPage;
