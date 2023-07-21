import Link from "next/link";
import { useEffect, useState } from "react";

interface ItemData {
  [key: string]: string;
}

export default function Fetch(){
  const [items, setItems] = useState<ItemData[]>([]);

  useEffect(() => {
    fetch('http://www.cha.go.kr/cha/SearchKindOpenapiList.do')
      .then(response => response.text())
      .then(xmlString => new DOMParser().parseFromString(xmlString, 'text/xml'))
      .then(xmlDoc => {
        const elements = xmlDoc.getElementsByTagName('item');
        const jsonDataArray: ItemData[] = [];
  
        console.log(elements)

        for (let i = 0; i < elements.length; i++) {
          const item = elements[i];
          const data: ItemData = {};
  
          // 원하는 요소를 추출하여 JSON 객체에 추가하는 로직
          const keys = item.getElementsByTagName('*');
          for (let j = 0; j < keys.length; j++) {
            const key = keys[j].tagName;
            const value = keys[j].textContent || '';
            data[key] = value;
          }
  
          jsonDataArray.push(data);
        }
  
        
        setItems(jsonDataArray)
        
      })
      .catch(error => {
        console.error('XML Fetch 실패!!', error);
      });
  }, []);
  console.log(items)


  return <>
    <h1>/pages/sub/Fetch.js</h1>
    <Link href="/">/pages/index.js</Link>

    <ul>
      {items.map((item, idx) => (
        <li key={idx}>
          {item["ccbaMnm1"]}
        </li>
      ))}
    </ul>
  </>
}