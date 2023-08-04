import Link from 'next/link';

function EventList(props: any) {
  const { title, image, date, location, id } = props;
  console.log(image);
  const humanReadableDate = new Date(date).toLocaleDateString('ko-kr', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  const formattedAddress = location.replace(', ', '\n');

  return (
    <li key={id}>
      <img src={image} alt={title} />
      <div>
        <h2>{title}</h2>
        <div>
          <time>{humanReadableDate}</time>
        </div>
        <div>
          <address>{formattedAddress}</address>
        </div>
      </div>
      <div>
        <Link href="/">Explore Event</Link>
      </div>
    </li>
  );
}

export default EventList;
