'use client';

import { useEffect, useRef, useState } from 'react';

interface Photo {
  id: number;
  title: string;
  url: string;
}

interface ElementProps {
  // 데이터 배열을 props로 전달 받음
  data: Photo[];
  // 다음 페이지를 가져오는 함수를 props로 전달 받음
}

function Element({ data }: ElementProps) {
  const containerRef = useRef(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    };

    const observer = new IntersectionObserver(handleIntersection, options);
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const handleIntersection = (entries: IntersectionObserverEntry[]) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !loading) {
        setLoading(true);
        // 다음 페이지를 가져오는 함수 호출
      }
    });
  };

  return (
    <div>
      <ul>
        {data.map((d) => (
          <li key={d.id}>
            <p>{d.title}</p>
            <img src={d.url} width={200} height={200} alt={d.title} />
          </li>
        ))}
      </ul>
      {loading && <div>Loading...</div>}
      <div ref={containerRef}></div>
    </div>
  );
}

export default Element;
