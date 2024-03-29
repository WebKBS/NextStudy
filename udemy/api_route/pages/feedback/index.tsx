import { Fragment, useState } from "react";
import { buildFeedbackPath, extractFeedback } from "../api/feedback";

interface Feedback {
  id: string;
  email: string;
  text: string;
  feedbackItems: Feedback[];
}

function FeedbackPage(props: Feedback) {
  const [feedbackData, setFeedbackData] = useState<Feedback>();

  function loadFeedbackHandler(id: string) {
    fetch(`/api/${id}`)
      .then((response) => response.json())
      .then((data) => setFeedbackData(data.feedback));
  }

  return (
    <Fragment>
      {feedbackData && <p>{feedbackData.email}</p>}
      <ul>
        {props.feedbackItems.map((item: Feedback) => (
          <li key={item.id}>
            {item.text}
            <button onClick={loadFeedbackHandler.bind(null, item.id)}>
              Show Details
            </button>
          </li>
        ))}
      </ul>
    </Fragment>
  );
}

// 자체 api를 불러 올땐 fetch를 사용하면 안된다!! props로 데이터를 보내주자
// 왜냐하면 같은 서버를 쓰고있기 때문에 node로 된 서버사이드 방법으로 구현하면 된다.
export async function getStaticProps() {
  const filePath = buildFeedbackPath();
  const data = extractFeedback(filePath);

  return {
    props: {
      feedbackItems: data,
    },
  };
}

export default FeedbackPage;
