'use client';

import { createCommentAction } from '@/app/api/comments/[slug]/actions';
import { useFormState, useFormStatus } from 'react-dom';

export default function CommentForm({ title, slug }) {
  const [error, action] = useFormState(createCommentAction, null);

  return (
    <form
      action={action}
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
      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="bg-orange-800 rounded px-2 self-center text-slate-50 w-32 hover:bg-orange-700 disabled:bg-slate-500 disabled:cursor-not-allowed"
    >
      Submit
    </button>
  );
}
