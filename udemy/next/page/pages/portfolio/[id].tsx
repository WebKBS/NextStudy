// 다이나믹 페이지

import { useRouter } from "next/router";

function PortfolioProjectPage() {
  const router = useRouter();

  console.log(router.pathname);
  console.log(router.query.id);

  return (
    <div>
      <h1>PortfolioProject Page</h1>
    </div>
  );
}

export default PortfolioProjectPage;
