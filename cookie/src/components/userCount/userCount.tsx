'use client';

import { useState, useEffect } from 'react';

export default function UserCount() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // 로컬 스토리지에서 저장된 방문자 수 가져오기
    const storedCount = parseInt(localStorage.getItem('visitorCount') || '0', 10);

    // 초기 방문자 수 설정
    setVisitorCount(storedCount);

    // 로컬 스토리지 값이 변경될 때마다 화면에 반영
    const updateVisitorCount = (event: StorageEvent) => {
      // key를 통해 카운트 매치
      if (event.key === 'visitorCount') {
        const updatedCount = parseInt(event.newValue || '0', 10);
        setVisitorCount(updatedCount);
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('storage', updateVisitorCount);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      window.removeEventListener('storage', updateVisitorCount);
    };
  }, []);

  useEffect(() => {
    // 페이지가 로드될 때마다 방문자 수 증가 및 로컬 스토리지에 저장
    const increaseVisitorCount = () => {
      setVisitorCount((prevCount) => {
        const newCount = prevCount + 1;
        localStorage.setItem('visitorCount', newCount.toString());
        return newCount;
      });
    };

    increaseVisitorCount();

    // 컴포넌트가 마운트되었을 때 한 번만 실행되도록 빈 배열 전달
  }, []);

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>오늘의 방문자: {visitorCount}</p>
    </div>
  );
}
