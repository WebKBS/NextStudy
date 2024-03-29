'use client';
import { Combobox } from '@headlessui/react';
import { useIsClient } from '@/lib/hooks';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { searchReviews } from '@/lib/reviews';
import { useDebounce } from 'use-debounce';

export default function SearchBox() {
  const router = useRouter();
  const isClient = useIsClient();
  const [query, setQuery] = useState('');
  const [deboundcedQuery] = useDebounce(query, 300);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (deboundcedQuery.length > 1) {
      const controller = new AbortController();

      (async () => {
        // next서버에서 가져오기
        const url = '/api/search?query=' + encodeURIComponent(deboundcedQuery);
        const response = await fetch(url, { signal: controller.signal });
        // const reviews = await searchReviews(query);
        const reviews = await response.json();
        setReviews(reviews);
      })();

      return () => controller.abort();
    } else {
      setReviews([]);
    }
    console.log(deboundcedQuery);
  }, [deboundcedQuery]);

  // console.log("searchbox isClient", isClient);
  // console.log("query: ", query)

  const handleChange = (review: { slug: string }) => {
    console.log(review);
    router.push(`/reviews/${review.slug}`);
  };

  if (!isClient) {
    return null;
  }

  // const filtered = reviews
  //   .filter((review) =>
  //     review.title.toLowerCase().includes(query.toLowerCase())
  //   )
  //   .slice(0, 5);

  return (
    <div className="relative w-48">
      <Combobox onChange={handleChange}>
        <Combobox.Input
          type="text"
          placeholder="search.."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="border rounded px-2 py-1 w-full"
        />
        <Combobox.Options className="absolute bg-white py-1 w-full">
          {reviews.map((review) => (
            <Combobox.Option value={review} key={review.slug}>
              {({ active }) => (
                <span
                  className={`block px-2 truncate w-full ${
                    active ? 'bg-orange-100' : ''
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
