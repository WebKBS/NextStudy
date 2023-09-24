import {writeFileSync} from "node:fs";
import qs from "qs"

const url = "http://localhost:1337/api/reviews" + "?" + qs.stringify({
    filters: {slug: {$eq: "hades-2018"}},
    fields: ["slug", "title", "subtitle", "publishedAt", "body"], // 가져올 데이터의 목록
    // populate: "*", // *을 하면 전체를 가져온다.
    populate: { // 선택적으로 가져올수 있다.
        image: {fields: ["url"]}
    },
    // sort: ["publishedAt:desc"],  // 날짜기준으로 정렬할 수 있다.
    pagination: { // 한페이지에 가져올 데이터의 개수를 정한다.
        pageSize: 1,
        withCount: false // 총 개수를 비활성화 한다.
    }

}, {encodeValuesOnly: true});
// encodeValuesOnly는 매개변수 이름을 인코딩하지 않는다는 뜻이다.

console.log("url: ", url)

const response = await fetch(url);
const body = await response.json();
const formatted = JSON.stringify(body, null, 2);
const file = "scripts/strapi-response.json";
writeFileSync(file, formatted, "utf-8")
