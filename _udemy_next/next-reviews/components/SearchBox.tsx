"use client";
import { Combobox } from "@headlessui/react";
import { useIsClient } from "@/lib/hooks";

const reviews = [
  { slug: "hades-2018", title: "Hades" },
  { slug: "fall-guys", title: "Fall Guys: Ultimate Knockout" },
  { slug: "black-mesa", title: "Black Mesa" },
  { slug: "disco-elysium", title: "Disco Elysium" },
  { slug: "dead-cells", title: "Dead Cells" },
  { slug: "a-way-out-2018", title: "A Way Out" },
];

export default function SearchBox() {
  const isClient = useIsClient();

  // console.log("searchbox isClient", isClient);

  if (!isClient) {
    return null;
  }

  return (
    <div className="relative w-48">
      <Combobox>
        <Combobox.Input
          type="text"
          placeholder="search.."
          className="border rounded px-2 py-1 w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
            <Combobox.Option value={review.title} key={review.slug}>
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
