import { createComment } from '@/lib/comments';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export default function CommentForm({ title, slug }) {
  async function action(formData) {
    'use server';
    console.log('[action] user: ', formData.get('user'));
    console.log('[action] message: ', formData.get('message'));

    const message = await createComment({
      slug,
      user: formData.get('user'),
      message: formData.get('message'),
    });

    console.log('created: ', message);
    revalidatePath(`/reviews/${slug}`); // 캐시 삭제
    redirect(`/reviews/${slug}`);
  }

  return (
    <form
      action={action}
      className="border bg-yellow-500 flex flex-col gap-2 mt-3 px-3 py-2 rounded"
    >
      <p className="pb-1">
        Already played <strong>{title}</strong>? Have your say!
      </p>
      <div className="flex">
        <label htmlFor="userField" className="shrink-0 w-32">
          Your name
        </label>
        <input
          type="text"
          id="userField"
          className="border px-2 py-1 rounded w-48"
          name="user"
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
        ></textarea>
      </div>
      <button className="bg-orange-800 rounded px-2 self-center text-slate-50 w-32 hover:bg-orange-700">
        Submit
      </button>
    </form>
  );
}
