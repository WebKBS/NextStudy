'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './element.module.css';

// 타입
interface Photo {
  id: number;
  title: string;
}

function Element() {
  const containerRef = useRef(null);
  const [data, setData] = useState<Photo[]>([]);
  const [page, setPage] = useState(0); // 페이지 state
  const [isLoading, setIsLoading] = useState(false); // isLoading 상태 추가

  // 추가 데이터를 가져오는 함수
  const loadMoreData = () => {
    setIsLoading(true); // 데이터 로딩 시작

    fetch(`https://jsonplaceholder.typicode.com/photos?_start=${page}&_limit=10`)
      .then((response) => response.json()) // 응답을 JSON 형식으로 파싱
      .then((responseData) => {
        setData((prevData) => [...prevData, ...responseData]); // 데이터를 기존 데이터와 합치기
      })
      .catch((error) => {
        console.error('데이터 가져오기 오류:', error);
      })
      .finally(() => {
        setIsLoading(false); // 데이터 로딩 완료
      });
  };

  // Intersection Observer 콜백 함수
  const handleIntersection = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !isLoading) {
        // 요소가 화면에 나타났을 때 추가 데이터를 가져오는 함수 호출

        loadMoreData(); // 데이터 호출

        setPage((prevPage) => prevPage + 10); // 페이지 단위를 10씩 증가시킴 ***필수!!!

        // 무한 스크롤 요소를 다시 감시하기 위해 Intersection Observer를 재설정
        observer.unobserve(entry.target);
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, { threshold: 0.5 }); // 마지막 객체는 옵션

    // 관찰대상 관찰시작
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      // 컴포넌트 언마운트 시 Intersection Observer 정리

      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  });

  return (
    <div className={styles.flex}>
      {/* 추가 데이터를 렌더링하는 부분 */}
      {data.map((d) => (
        <p className={styles.p_element} key={d.id}>
          {d.title}
        </p>
      ))}
      {isLoading && <p>로딩 중...</p>}
      <div ref={containerRef}></div>
    </div>
  );
}

export default Element;
