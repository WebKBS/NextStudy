import Heading from "@/components/Heading";
import Link from "next/link";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";

// export const dynamic = "force-dynamic";

// 일정 간격 요청
// export const revalidate = 30;

export default async function HomePage() {
  const reviews = await getReviews(3);
  return (
    <>
      <Heading>Indie Game</Heading>
      <p className="pb-3">Welcome</p>
      <ul className="flex flex-col gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="border w-80 bg-white rounded shadow hover:shadow-xl sm:w-full"
          >
            <Link
              href={`/reviews/${review.slug}`}
              className="flex flex-col sm:flex-row"
            >
              <Image
                src={review.image}
                alt=""
                width="320"
                height="180"
                className="rounded-t sm:rounded-l sm:rounded-r-none"
                priority={index === 0}
              />
              <div className="px-2 py-1 text-center sm:text-left">
                <h2 className="font-semibold font-orbitron">{review.title}</h2>
                <p className="hidden pt-2 sm:block">{review.subtitle}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
