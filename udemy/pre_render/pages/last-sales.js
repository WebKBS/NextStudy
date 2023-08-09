import { useEffect, useState } from "react";
import useSWR from "swr";

const url = "https://test-5ae71-default-rtdb.firebaseio.com/sales.json";

function LastSalesPage(props) {
  console.log(props);
  const [sales, setSales] = useState(props.sales);
  const [isLoading, setIsLoading] = useState(false);

  const { data, error } = useSWR(url, fetcher);
  console.log(data);
  async function fetcher(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  // useEffect(() => {
  //   if (data) {
  //     const transformedData = [];
  //     for (const key in data) {
  //       transformedData.push({
  //         id: key,
  //         username: data[key].username,
  //         volume: data[key].volume,
  //       });
  //     }
  //     setSales(transformedData);
  //   }
  // }, [data]);

  // useEffect(() => {
  //   setIsLoading(true);
  //   fetch(url)
  //     .then((res) => {
  //       if (res.ok) {
  //         return res.json();
  //       }
  //     })
  //     .then((data) => {
  //       const transformedData = [];
  //       for (const key in data) {
  //         transformedData.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setData(transformedData);
  //       setIsLoading(false);
  //     });
  // }, []);

  if (!data && !sales) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Failed to load</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - {sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps(context) {
  const response = await fetch(url);
  const data = await response.json();

  const transformedData = [];
  for (const key in data) {
    transformedData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformedData }, revalidate: 10 };
}

export default LastSalesPage;
