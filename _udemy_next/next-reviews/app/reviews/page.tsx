import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reviews",
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  // console.log(reviews)
  return (
    <div>
      <Heading>Reviews</Heading>
      <p>리뷰 페이지</p>
      <ul className="flex flex-row gap-3 flex-wrap">
        {reviews.map((file, index: number) => (
          <li
            key={file.slug}
            className="border w-80 bg-white rounded shadow hover:shadow-xl"
          >
            <Link href={`/reviews/${file.slug}`}>
              <Image
                src={`${file.image}`}
                alt={`${file.title}`}
                width="320"
                priority={index === 0}
                height="180"
                className="rounded-t"
              />
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
