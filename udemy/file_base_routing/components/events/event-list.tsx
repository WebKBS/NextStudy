import EventItem from './event-item';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image: string;
  isFeatured: boolean;
}

interface EventListProps {
  items: Event[];
}

function EventList(props: EventListProps) {
  const { items } = props;
  return (
    <ul>
      {items.map((event) => (
        <EventItem key={event.id} id={event.id} title={event.title} description={event.description} location={event.location} date={event.date} image={event.image} isFeatured={event.isFeatured} />
      ))}
    </ul>
  );
}

export default EventList;
