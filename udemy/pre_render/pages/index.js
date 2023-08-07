function HomePage(props) {
  const { products } = props;

  console.log(products);

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
    </ul>
  );
}

// 항상 객체를 return 해야한다.
export async function getStaticProps() {
  return {
    props: {
      products: [{ id: "p1", title: "product 1" }],
    },
  };
}

export default HomePage;
