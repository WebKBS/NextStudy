import Head from "next/head";
import { getEventById, getFeaturedEvents } from "@/helpers/api-util";
import { useRouter } from "next/router";
import { Fragment } from "react";
import EventSummary from "@/components/event-detail/event-summary";
import EventLogistics from "@/components/event-detail/event-logistics";
import EventContent from "@/components/event-detail/event-content";
import { GetStaticPropsContext } from "next";
import Comments from "@/components/input/comments";

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
  // const eventId = router.query.eventId;
  // const event = getEventById(eventId);
  const event = props.selectEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <Head>
        <title>{event.title}</title>
        <meta name="description" content={event.description} />
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
        title={event.title}
      />
      <EventContent>{event.description}</EventContent>
      <Comments eventId={event.id} />
    </Fragment>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const eventId = context.params?.eventId as string[];

  const event = await getEventById(eventId);

  return {
    props: {
      selectEvent: event,
    },
    revalidate: 30,
  };
}

export async function getStaticPaths() {
  const events = await getFeaturedEvents();
  const path = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths: path,
    fallback: "blocking",
  };
}

export default EventDetailsPage;
