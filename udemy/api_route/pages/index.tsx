import React, { useRef } from "react";

function HomePage() {
  const emailInputRef = useRef<HTMLInputElement>(null);
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  function submitFormHandler(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (emailInputRef.current && feedbackInputRef.current) {
      const enteredEmail = emailInputRef.current.value;
      const enteredFeedback = feedbackInputRef.current.value;

      console.log(enteredEmail, enteredFeedback);
    }
  }

  return (
    <div>
      <h1>The Home Page</h1>
      <form action="">
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
    </div>
  );
}

export default HomePage;
