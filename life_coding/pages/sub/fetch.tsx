import Link from "next/link";
import { useEffect } from "react";

export default function Fetch(){
useEffect(()=> {
  fetch('http://localhost:3000/api/hello')
    .then(data => data.json())
    .then(result => {
      console.log(result)
    })

})

  return <>
    <h1>/pages/sub/Fetch.js</h1>
    <Link href="/">/pages/index.js</Link>
  </>
}