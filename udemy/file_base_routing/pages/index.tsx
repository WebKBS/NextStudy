import Head from "next/head";
import { getFeaturedEvents } from "../helpers/api-util";
import EventList from "../components/events/event-list";
import NewsletterPegistration from "../components/input/newsletter-registration";

interface propsType {
  events: [];
}

function HomePage(props: propsType) {
  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name="description" content="Find the latest events" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
      </Head>
      <NewsletterPegistration />
      <EventList items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
    revalidate: 1800,
  };
}

export default HomePage;
