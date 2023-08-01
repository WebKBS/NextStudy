import { useRouter } from "next/router";

function SelectedClientProjectPage() {
  const router = useRouter();
  console.log(router.query);
  return (
    <div>
      <h1>여기는 선택한 클라이언트 프로젝트 페이지</h1>
    </div>
  );
}

export default SelectedClientProjectPage;
