import Link from "next/link";
import Heading from "@/components/Heading";
import {getReviews} from "@/lib/reviews";

export default async function ReviewsPage() {
    const reviews = await getReviews();

    console.log(reviews)
    return (
        <div>
            <Heading>Reviews</Heading>
            <p>리뷰 페이지</p>
            <ul className="flex flex-col gap-3">
                {reviews.map((file) => (

                    <li className="border w-80 bg-white rounded shadow hover:shadow-xl">
                        <Link href={`/reviews/${file.slug}`}>
                            <img src={`${file.image}`}
                                 alt={`${file.title}`}
                                 width="320"
                                 height="180" className="rounded-t"/>
                            <h2 className="font-semibold py-1 text-center font-orbitron">
                                {file.title}
                            </h2>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
