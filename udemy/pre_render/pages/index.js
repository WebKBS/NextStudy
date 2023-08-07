import fs from "fs";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  console.log(products);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

// 항상 객체를 return 해야한다.
export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.promises.readFile(filePath); // await를 사용하여 비동기적으로 호출
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10, // 시간을 부여해서 시간에 따라 변경사항을 추가한다
    notFound: false, // true를 설정하면 not_found가 나타난다.
    // redirect: {
    //   destination: "/no-data",
    // },
  };
}

export default HomePage;
