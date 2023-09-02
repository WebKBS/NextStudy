// "use client";

// import { useRouter } from "next/navigation";

// import { useEffect } from "react";
import LoadEvent from "@/components/loadEvent";

export default function Page() {
  // const router = useRouter();
  // console.log(router);
  return (
    <>
      <h2>About</h2>
      <LoadEvent />
    </>
  );
}

// export default function Page() {
//   useEffect(() => {
//     console.log(" hi !!");
//   }, []);

//   return (
//     <>
//       <h2>About</h2>
//     </>
//   );
// }
