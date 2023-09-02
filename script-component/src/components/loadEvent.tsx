"use client";

import { useEffect } from "react";

export default function LoadEvent() {
  useEffect(() => {
    console.log(" component hello!!");
  }, []);

  return (
    <>
      <h2>About</h2>
    </>
  );
}
