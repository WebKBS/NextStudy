'use client';

import { createCommentAction } from '@/app/api/comments/[slug]/actions';
import { useState } from 'react';

export default function CommentForm({ title, slug }) {
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const form = event.currentTarget;
    const formData = new FormData(form);
    const result = await createCommentAction(formData);

    // console.log('formData: ', [...formData.entries()]);
    console.log('result: ', result);
    if (result?.isError) {
      setError(result);
    } else {
      form.reset();
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="border bg-yellow-500 flex flex-col gap-2 mt-3 px-3 py-2 rounded"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <input type="hidden" name="slug" value={slug} />
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          type="text"
          id="userField"
          className="border px-2 py-1 rounded w-48"
          name="user"
          maxLength={50}
        />
      </div>
      <div className="flex">
        <label htmlFor="messageField" className="shrink-0 w-32">
          Your comment
        </label>
        <textarea
          id="messageField"
          className="border px-2 py-1 rounded w-full"
          name="message"
          maxLength={500}
        ></textarea>
      </div>
      {Boolean(error) && <p className="text-red-700">{error.message}</p>}
      <button className="bg-orange-800 rounded px-2 self-center text-slate-50 w-32 hover:bg-orange-700">
        Submit
      </button>
    </form>
  );
}
