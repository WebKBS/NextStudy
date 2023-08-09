const { Fragment } = require("react");
import fs from "fs";
import path from "path";

function ProductDetailPage(props) {
  const { loadedProduct } = props;

  // if (!loadedProduct) {
  //   return <p>Loading...</p>;
  // }

  return (
    <Fragment>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </Fragment>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = fs.readFileSync(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const ids = data.products.map((product) => product.id);

  const params = ids.map((id) => ({ params: { pid: id } }));

  return {
    paths: params,
    fallback: "blocking",
    // fallback: true,
    // true로 설정하면 params에 모든 데이터를 추가하지 않아도 된다. 사전 랜더링하지 않고 해당 페이지 접속시 랜더링이 된다.
    // 하지만 페이지를 직접 url로 들어가면 에러가 나며,
    // 이를 해결하려면 컴포넌트에서 fallback 상태를 반환해줘야한다.
    // true로 설정시 loading 조건문을 추가해야하며,
    // true 또는 false를 사용하지 않는다면 'blocking' 문자열을 전달해도 된다.
  };
}

export default ProductDetailPage;
