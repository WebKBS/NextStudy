import { useState } from "react";
import DarkTheme from "./DarkTheme";

function loadDarkMode() {
  if (typeof localStorage === "undefined") {
    return false;
  }
  const value = localStorage.getItem("darkMode");

  return value === null ? false : JSON.stringify(value);
}

function ThemeSwitch() {
  const [darkMode, setDarkMode] = useState(loadDarkMode);

  const handleClick = () => {
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    setDarkMode(!darkMode);
  };

  const text = darkMode ? "Light Mode" : "Dark Mode";

  return (
    <>
      {/* 페이지 라우터는 로컬과 서버를 동시에 사용하기때문에 localstorage같은 것은 에러가 날수 있다. */}
      {/* suppressHydrationWarning 코드를 넣어줘서 경고를 명시적으로 제외하자 */}
      <button onClick={handleClick} suppressHydrationWarning>
        {text}
      </button>
      <style jsx>
        {`
          button {
            background: none;
            border: none;
            color: inherit;
            cursor: pointer;
          }
        `}
      </style>
      {darkMode && <DarkTheme />}
    </>
  );
}

export default ThemeSwitch;
