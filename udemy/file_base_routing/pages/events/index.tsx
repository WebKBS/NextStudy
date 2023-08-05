import React from "react";
import { getAllEvents } from "@/dummy-data";
import EventList from "@/components/events/event-item";

function AllEventsPage() {
  const events: any = getAllEvents();
  const { id, title, date, location } = events;

  return (
    <div>
      <EventList
        id={id}
        title={title}
        date={date}
        location={location}
        description={""}
        image={""}
        isFeatured={false}
      />
    </div>
  );
}

export default AllEventsPage;
