// import getReview from "@/lib/reviews"
import {getReview} from "@/lib/reviews";
import Heading from "@/components/Heading";


export default async function ReviewPage({params: {slug}}) {
    const review = await getReview(slug)
    // console.log(data.title)

    return (
        <>
            <Heading>{review.title}</Heading>
            <p className="italic pb-2">{review.date}</p>
            <img src={review.image} alt="" width="640"
                 height="360"
                 className="mb-2 rounded"/>
            {/* 외부로부터 html 태그를 입력할때는 dangerouslySetInnerHTML 를 사용해야한다. */}
            <article dangerouslySetInnerHTML={{__html: review.body}}
                     className="max-w-screen-sm prose prose-slate"/>
        </>
    );
}
