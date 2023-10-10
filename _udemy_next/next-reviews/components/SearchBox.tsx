"use client";
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";
import {useState} from "react";
import {useRouter} from "next/navigation";

const reviews = [
  { slug: "hades-2018", title: "Hades" },
  { slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
  { slug: "black-mesa", title: "Black Mesa" },
  { slug: "disco-elysium", title: "Disco Elysium" },
  { slug: "dead-cells", title: "Dead Cells" },
  { slug: "a-way-out-2018", title: "A Way Out" },
];

export default function SearchBox() {
  const router= useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState("");

  // console.log("searchbox isClient", isClient);
  // console.log("query: ", query)

  const handleChange = (review: {slug: string}) => {
    console.log(review);
    router.push(`/reviews/${review.slug}`);
  }

  if (!isClient) {
    return null;
  }

  const filtered = reviews.filter(review => review.title.toLowerCase().includes(query.toLowerCase()))

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          type="text"
          placeholder="search.."
          value={query} onChange={(event) => setQuery(event.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {filtered.map((review) => (
            <Combobox.Option value={review} key={review.slug}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? "bg-orange-100" : ""
                  }`}
                >
                  {review.title}
                </span>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}
