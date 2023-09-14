// import getReview from "@/lib/reviews"
import {getReview, getSlugs} from "@/lib/reviews";
import Heading from "@/components/Heading";
import ShareButtons from "@/components/ShareButtons";


// 정적 사이트 SSG 생성
export async function generateStaticParams() {
    const slugs = await getSlugs();

    return slugs.map(slug => ({slug}));
}

// 다이나믹 라우트 메타데이터 설정
export async function generateMetadata({params: {slug}}): Promise<any> {
    const review = await getReview(slug);

    return {
        // return으로 슬러그를 추출해서 타이틀을 내보낸다.
        title: review.title
    }
}

export default async function ReviewPage({params: {slug}}) {
    const review = await getReview(slug)
    // console.log(data.title)

    return (
        <>
            <Heading>{review.title}</Heading>
            <div className="flex gap-3 items-baseline">
                <p className="italic pb-2">{review.date}</p>
                <ShareButtons/>
            </div>
            <img src={review.image} alt="" width="640"
                 height="360"
                 className="mb-2 rounded"/>
            {/* 외부로부터 html 태그를 입력할때는 dangerouslySetInnerHTML 를 사용해야한다. */}
            <article dangerouslySetInnerHTML={{__html: review.body}}
                     className="max-w-screen-sm prose prose-slate"/>
        </>
    );
}
