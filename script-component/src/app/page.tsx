import LoadEvent from "@/components/loadEvent";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Hello</h1>
      <Link href="/about">About</Link>
      {/* <LoadEvent /> */}
    </div>
  );
}
