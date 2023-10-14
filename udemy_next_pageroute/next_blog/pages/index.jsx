import Head from "next/head";

function HomePage() {
  console.log("[index]");
  return (
    <>
      <Head>
        <title>My Blog</title>
      </Head>
      <main>
        <h1>My Blog</h1>
      </main>
    </>
  );
}

export default HomePage;
