import Link from "next/link";

export default function ReviewsPage() {
  return (
    <div>
      <h1>Reviews</h1>
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
