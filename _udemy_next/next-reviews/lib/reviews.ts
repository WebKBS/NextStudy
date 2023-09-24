import {readdir, readFile} from "node:fs/promises";
import matter from "gray-matter";
import {marked} from "marked";
import qs from "qs";


const CMS_URL = "http://localhost:1337";


export async function getFeaturedReview() {
    const reviews = await getReviews();
    return reviews[0];
}

export async function getReview(slug: string) {
    const text = await readFile(`./content/reviews/${slug}.md`, "utf-8")

    const {content, data: {title, date, image}} = matter(text);
    const body = marked(content);

    return {
        // slug도 반드시 전달한다. url 링크에 사용
        slug, title, date, image, body
    }
}

export async function getReviews() {

    const url = `${CMS_URL}/api/reviews?` + qs.stringify({
        fields: ["slug", "title", "subtitle", "publishedAt"], // 가져올 데이터의 목록
        // populate: "*", // *을 하면 전체를 가져온다.
        populate: { // 선택적으로 가져올수 있다.
            image: {fields: ["url"]}
        },
        sort: ["publishedAt:desc"],  // 날짜기준으로 정렬할 수 있다.
        pagination: { // 한페이지에 가져올 데이터의 개수를 정한다.
            pageSize: 6
        }

    }, {encodeValuesOnly: true});
    // encodeValuesOnly는 매개변수 이름을 인코딩하지 않는다는 뜻이다.

    console.log("url: ", url)

    const response = await fetch(url);
    const {data} = await response.json();
    return data.map(({attributes}) => ({
        slug: attributes.slug, // slug를 내보내준다.
        title: attributes.title,
        date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
        image: CMS_URL + attributes.image.data.attributes.url
    }))

    // const slugs = await  getSlugs();
    //
    // const reviews = [];
    // for (const slug of slugs) {
    //     const review = await getReview(slug);
    //     reviews.push(review);
    // }
    //
    // // date기준으로 sorting 하는 방법
    // reviews.sort((a, b) => {
    //     return  a.date.localeCompare(b.date);
    //     // return  b.date.localeCompare(a.date);
    // })
    // return reviews;
}

export async function getSlugs() {
    // file중에 md파일만 필터링한다. 중요~!!
    const files = await readdir("./content/reviews");

    return files.filter((file) => file.endsWith(".md")).map(file =>
        file.slice(0, -".md".length));
}