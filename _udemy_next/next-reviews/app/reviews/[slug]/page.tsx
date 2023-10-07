// import getReview from "@/lib/reviews"
import { getReview, getSlugs } from "@/lib/reviews";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";
import Image from "next/image";
import { notFound } from "next/navigation";

// 런타임으로 변경 ** generateStaticParams와 함께 쓰지 않는다.
// export const dynamic = "force-dynamic";

// 정적 사이트 SSG 생성
export async function generateStaticParams() {
  const slugs = await getSlugs();

  //   console.log(slugs);

  return slugs.map((slug) => ({ slug }));
}

// 다이나믹 라우트 메타데이터 설정
export async function generateMetadata({ params: { slug } }): Promise<any> {
  const review = await getReview(slug);

  if (!review) {
    notFound();
  }

  return {
    // return으로 슬러그를 추출해서 타이틀을 내보낸다.
    title: review.title,
  };
}

export default async function ReviewPage({ params: { slug } }) {
  const review = await getReview(slug);
  // console.log(review);

  if (!review) {
    notFound();
  }

  return (
    <>
      <Heading>{review.title}</Heading>
      <p className="font-semibold pb-3">{review.subtitle}</p>
      <div className="flex gap-3 items-baseline">
        <p className="italic pb-2">{review.date}</p>
        <ShareButtons />
      </div>
      <Image
        src={review.image}
        alt=""
        width="640"
        height="360"
        className="mb-2 rounded"
        priority
      />
      {/* 외부로부터 html 태그를 입력할때는 dangerouslySetInnerHTML 를 사용해야한다. */}
      <article
        dangerouslySetInnerHTML={{ __html: review.body }}
        className="max-w-screen-sm prose prose-slate"
      />
    </>
  );
}
