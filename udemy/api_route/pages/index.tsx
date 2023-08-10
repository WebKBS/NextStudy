import React, { useRef, useState } from "react";

function HomePage() {
  const [feedbackItem, setFeedbackItem] = useState([]);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailInputRef.current && feedbackInputRef.current) {
      const enteredEmail = emailInputRef.current.value;
      const enteredFeedback = feedbackInputRef.current.value;

      const reqBody = { email: enteredEmail, text: enteredFeedback };

      fetch("/api/feedback", {
        method: "POST",
        body: JSON.stringify(reqBody),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    }
  }

  function loadFeedbackHandler() {
    fetch("/api/feedback")
      .then((response) => response.json())
      .then((data) => {
        setFeedbackItem(data.feedback);
      });
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form action="" onSubmit={submitFormHandler}>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" ref={emailInputRef} />
        </div>
        <div>
          <label htmlFor="feedback">당신의 피드백</label>
          <textarea
            name=""
            id="feedback"
            rows={10}
            ref={feedbackInputRef}
          ></textarea>
        </div>
        <button>Send Feedback</button>
      </form>
      <hr />
      <button onClick={loadFeedbackHandler}>Load Feedback</button>
      <ul>
        {feedbackItem.map((item: any) => (
          <li key={item.id}>
            {item.email} - {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
