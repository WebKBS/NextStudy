import { useEffect, useState } from 'react';
import MeetupList from '../components/Meetups/MeetupList';
// const DUMMY_DATA = [
//   {
//     id: 'm1',
//     title: 'This is a first meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Meetupstreet 5, 12345 Meetup City',
//     description: 'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//   },
//   {
//     id: 'm2',
//     title: 'This is a second meetup',
//     image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/2560px-Stadtbild_M%C3%BCnchen.jpg',
//     address: 'Meetupstreet 5, 12345 Meetup City',
//     description: 'This is a first, amazing meetup which you definitely should not miss. It will be a lot of fun!',
//   },
// ];

const AllMeetups = () => {
  const [list, setList] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  // console.log(list);
  // console.log(Object.keys(list));

  useEffect(() => {
    console.log('fetch!!');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const meetups = [];
      const response = await fetch('https://test-5ae71-default-rtdb.firebaseio.com/meetups');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      console.log('data=', data);
      for (const key in data) {
        const meetup = {
          id: key,
          ...data[key],
        };

        meetups.push(meetup);
      }

      setList(meetups);
      setLoading(false);
    } catch (error) {
      console.log('에러 내용', error);
      setError(error); // 에러 상태를 업데이트합니다.
      setLoading(false);
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
