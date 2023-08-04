import NewMeetupForm from '../components/Meetups/NewMeetupForm';
import { useNavigate } from 'react-router-dom';

const NewMeetup = () => {
  const history = useNavigate();
  const addMeetupHandler = (meetupData) => {
    fetch('https://test-5ae71-default-rtdb.firebaseio.com/meetups', {
      method: 'POST',
      body: JSON.stringify(meetupData),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => {
      history('/');
    });
  };

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
};

export default NewMeetup;
