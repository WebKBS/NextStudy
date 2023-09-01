'use client';
import { useState, useEffect } from 'react';

export default function UserCount() {
  const [visitorCount, setVisitorCount] = useState(0);

  useEffect(() => {
    // 페이지가 로드될 때마다 localStorage에서 저장된 카운트를 가져옵니다.
    const storedCount = localStorage.getItem('visitorCount');
    if (storedCount) {
      setVisitorCount(parseInt(storedCount));
    }
  }, []);

  useEffect(() => {
    // visitorCount가 변경될 때마다 localStorage에 새로운 값으로 저장합니다.
    localStorage.setItem('visitorCount', visitorCount.toString());
  }, [visitorCount]);

  const incrementCount = () => {
    setVisitorCount((prevCount) => prevCount + 1);
  };

  return (
    <div>
      <h1>Welcome to My Blog</h1>
      <p>Visitor Count: {visitorCount}</p>
      <button onClick={incrementCount}>Increment Count</button>
    </div>
  );
}
