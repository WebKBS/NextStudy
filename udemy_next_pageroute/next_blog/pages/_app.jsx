import NavBar from "../components/NavBar";
function App({ Component, pageProps }) {
  console.log("[app]");
  return (
    <>
      <header>
        <NavBar />
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default App;
