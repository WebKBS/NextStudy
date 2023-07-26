import { useEffect, useState } from 'react';
import MeetupList from '../components/Meetups/MeetupList';
const DUMMY_DATA = [
  {
    id: 'm1',
    title: 'This is a first meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description: 'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
  {
    id: 'm2',
    title: 'This is a second meetup',
    image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
    address: 'Meetupstreet 5, 12345 Meetup City',
    description: 'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
  },
];

const AllMeetups = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('fetch!!');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setList(data);
    } catch (error) {
      console.log('에러 내용', error);
      setError(error); // 에러 상태를 업데이트합니다.
    }
  };

  return (
    <section>
      <div>All Page</div>
      {error && <div>에러 발생: {error.message}</div>}
      <MeetupList meetups={list} />
    </section>
  );
};

export default AllMeetups;
