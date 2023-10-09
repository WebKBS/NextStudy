import Link from "next/link";
import Heading from "@/components/Heading";
import { getReviews } from "@/lib/reviews";
import Image from "next/image";
import PaginationBar from "@/components/PaginationBar";
import SearchBox from "@/components/SearchBox";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Reviews",
};

const PAGE_SIZE = 6;

export default async function ReviewsPage({ searchParams }) {
  // searchParams를 통해 현재 페이지를 전달한다.
  const page = parsePageParam(searchParams.page);

  const { reviews, pageCount } = await getReviews(PAGE_SIZE, page);
  console.log(pageCount);
  // console.log(reviews.map(({ slug, title }) => ({ slug, title })));

  return (
    <div>
      <Heading>Reviews</Heading>
      <div className="flex justify-between pb-3">
        <PaginationBar href="/reviews" page={page} pageCount={pageCount} />
        <SearchBox />
      </div>

      {/* <div className="flex gap-2 pb-3">
        <Link href={`/reviews?page=${page - 1}`}>&lt;</Link>
        <span>
          page {page} of {pageCount}
        </span>
        <Link href={`/reviews?page=${page + 1}`}>&gt;</Link>
      </div> */}
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

function parsePageParam(paramValue) {
  if (paramValue) {
    const page = parseInt(paramValue);
    //isFinite 유한수 인지 판별한다. https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/isFinite
    if (isFinite(page) && page > 0) {
      return page;
    }
  }
  return 1;
}
