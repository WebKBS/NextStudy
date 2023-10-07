import { marked } from "marked";
import qs from "qs";

const CMS_URL = "http://localhost:1337";

// export async function getFeaturedReview() {
//   const reviews = await getReviews();
//   return reviews[0];
// }

export async function getReview(slug: string) {
  // const text = await readFile(`./content/reviews/${slug}.md`, "utf-8")
  //
  // const {content, data: {title, date, image}} = matter(text);
  // const body = marked(content, {headerIds: false, mangle: false});
  //
  // return {
  //     // slug도 반드시 전달한다. url 링크에 사용
  //     slug, title, date, image, body
  // }

  const { data } = await fetchReviews({
    filters: { slug: { $eq: slug } },
    fields: ["slug", "title", "subtitle", "publishedAt", "body"], // 가져올 데이터의 목록
    // populate: "*", // *을 하면 전체를 가져온다.
    populate: {
      // 선택적으로 가져올수 있다.
      image: { fields: ["url"] },
    },
    // sort: ["publishedAt:desc"],  // 날짜기준으로 정렬할 수 있다.
    pagination: {
      // 한페이지에 가져올 데이터의 개수를 정한다.
      pageSize: 1,
      withCount: false, // 총 개수를 비활성화 한다.
    },
  });

  // 만약에 데이터가 없으면 null 반환
  if (data.length === 0) {
    return null;
  }

  const item = data[0];
  return {
    ...toReview(item),
    body: marked(item.attributes.body),
  };
}

export async function getReviews(pageSize) {
  const { data } = await fetchReviews({
    fields: ["slug", "title", "subtitle", "publishedAt"], // 가져올 데이터의 목록
    // populate: "*", // *을 하면 전체를 가져온다.
    populate: {
      // 선택적으로 가져올수 있다.
      image: { fields: ["url"] },
    },
    sort: ["publishedAt:desc"], // 날짜기준으로 정렬할 수 있다.
    pagination: {
      // 한페이지에 가져올 데이터의 개수를 정한다.
      pageSize,
    },
  });

  // console.log("리뷰", data.map(toReview));

  return data.map(toReview);

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
  // // file중에 md파일만 필터링한다. 중요~!!
  // const files = await readdir("./content/reviews");
  //
  // return files.filter((file) => file.endsWith(".md")).map(file =>
  //     file.slice(0, -".md".length));

  const { data } = await fetchReviews({
    fields: ["slug"],
    sort: ["publishedAt:desc"],
    pagination: {
      pageSize: 100,
    },
  });

  return data.map((item) => item.attributes.slug);
}

async function fetchReviews(params: object): Promise<any> {
  const url =
    `${CMS_URL}/api/reviews?` +
    qs.stringify(params, { encodeValuesOnly: true });
  // console.log("Fetch", url)

  const response = await fetch(url, {
    next: {
      revalidate: 30,
    },
  });

  if (!response.ok) {
    throw new Error(`CNS returns ${response.status} 에러 발생 ${url}`);
  }
  return await response.json();
}

function toReview(item) {
  const { attributes } = item;
  return {
    slug: attributes.slug, // slug를 내보내준다.
    title: attributes.title,
    subtitle: attributes.subtitle,
    date: attributes.publishedAt.slice(0, "yyyy-mm-dd".length),
    image: CMS_URL + attributes.image.data.attributes.url,
  };
}
