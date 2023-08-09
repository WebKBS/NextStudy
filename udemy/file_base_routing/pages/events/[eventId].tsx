import { getEventById, getAllEvents } from "@/dummy-data";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import ErrorAlert from "@/components/events/error-alert";
import { GetStaticPropsContext } from "next";

interface EventType {
  id: string; // 이벤트 고유 ID
  title: string;
  date: string;
  location: string;
  image: string;
  description: string;
}

interface PropsType {
  selectEvent: EventType; // 단일 이벤트 객체
}

function EventDetailsPage(props: PropsType) {
  const router = useRouter();
  const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.selectEvent;

  console.log(event);

  if (!event) {
    return (
      <ErrorAlert>
        <p>No event found</p>
      </ErrorAlert>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
        title={event.title}
      />
      <EventContent>{event.description}</EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context.params?.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectEvent: event,
    },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const path = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: [],
    fallback: "blocking",
  };
}

export default EventDetailsPage;
