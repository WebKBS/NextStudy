import styles from './page.module.css';
import Element from '@/components/Element';

// interface Photo {
//   id: number;
//   title: string;
//   url: string;
// }

// async function getData() {
//   const response = await fetch('https://jsonplaceholder.typicode.com/photos');

//   if (!response.ok) {
//     // This will activate the closest `error.js` Error Boundary
//     throw new Error('Failed to fetch data');
//   }

//   return response.json();
// }

export default async function Home() {
  // const data: Photo[] = await getData();

  return (
    <main className={styles.main}>
      {/* <ul>
        {data.map((d) => (
          <li key={d.id}>
            <p>{d.title}</p>
            <Image src={d.url} width={200} height={200} alt={d.title} />
          </li>
        ))}
      </ul> */}
      <Element />
    </main>
  );
}
