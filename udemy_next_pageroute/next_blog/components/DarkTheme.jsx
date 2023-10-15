function DarkTheme() {
  return (
    <style jsx global>
      {`
        :root {
          --background-color: black;
          --link-color: yellow;
          --text-color: white;
        }
      `}
    </style>
  );
}

export default DarkTheme;
