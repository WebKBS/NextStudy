import Link from "next/link";
import Heading from "@/components/Heading";

export default function ReviewsPage() {
  return (
    <div>
        <Heading>Reviews</Heading>
      <p>리뷰 페이지</p>
        <ul>
            <li>
                <Link href='/reviews/hollow-knight'>
                    Hollow Knight
                </Link>
            </li>
            <li>
                <Link href='/reviews/start'>Start</Link>
            </li>
        </ul>
    </div>
  );
}
