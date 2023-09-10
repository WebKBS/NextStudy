import Link from "next/link";
import Heading from "@/components/Heading";

export default function ReviewsPage() {
    return (
        <div>
            <Heading>Reviews</Heading>
            <p>리뷰 페이지</p>
            <ul className="flex flex-col gap-3">
                <li className="border w-80 bg-white rounded shadow hover:shadow-xl">
                    <Link href='/reviews/hollow-knight'>
                        <img src="/images/hollow-knight.jpg" alt="" width="320" height="180" className="rounded-t"/>
                        <h2 className="py-1 text-center font-orbitron">
                            Hollow Knight
                        </h2>
                    </Link>
                </li>
                <li className="border w-80 bg-white rounded shadow hover:shadow-xl">
                    <Link href='/reviews/start'>
                        <img src="/images/stardew-valley.jpg" alt="" width="320" height="180" className="rounded-t"/>
                        <h2 className="py-1 text-center font-orbitron">
                            Start
                        </h2>
                    </Link>
                </li>
            </ul>
        </div>
    );
}
